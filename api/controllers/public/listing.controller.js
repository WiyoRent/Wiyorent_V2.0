import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import redisClient from "../../config/redis.js"

function buildListingsCacheKey(query){
    const { min, max, wiyorent_only, available_only, bedrooms, max_roommates, furnished_status, neighborhood, available_from } = query;

    const normalizedNeighborhood = neighborhood ? neighborhood.split(',').sort().join(',') : '';

    return `${min || ''}:${max || ''}:${wiyorent_only || ''}:${available_only || ''}:${bedrooms || ''}:${max_roommates || ''}:${furnished_status || ''}:${normalizedNeighborhood}:${available_from || ''}`;

}

// ########## Browse listings (public listing, with filters) ##########
export const fetchListings = async (req, res) => {

    const clientKey = req.headers['x-internal-api-key']
    const rawUserId = req.headers['x-user-id']

    const userId = rawUserId && rawUserId !== 'null' ? rawUserId : null;

    if(clientKey !== process.env.INTERNAL_BACKEND_KEY){
        return errorMsg(res, 403, 'Unauthorized')
    }

    const {min, max, wiyorent_only, available_only, bedrooms, max_roommates, furnished_status, neighborhood, available_from} = req.query
    const neighborhoodList = neighborhood ? neighborhood.split(',') : []

    try {

        // cache only holds the shared listings fields, no user-specific data like wailist and saved

        const baseCacheKey = `listings_base:${buildListingsCacheKey(req.query)}`

        let baseListings = JSON.parse((await redisClient.get(baseCacheKey)) || 'null')

        if(!baseListings){
            let query = `
            SELECT
                l.id,
                l.title,
                l.price_per_month,
                l.bedroom_number,
                l.bathroom_number,
                l.max_roommates,
                l.available_status,
                l.neighborhood,
                l.city,
                l.thumbnail_url,
                l.is_a_wiyorent_house,
                (sl.id is not null) as is_saved,
                (w.id is not null) as is_on_waitlist
            FROM
                listings l
            LEFT JOIN saved_listings sl
                ON l.id = sl.listing_id
                AND sl.user_id = $1
            LEFT JOIN waitlists w
                ON l.id = w.listing_id
                AND w.user_id = $1
            WHERE is_active = true
            `
            const values = [userId]
            let paramIndex = 2

            if(min){
                query += ` AND l.price_per_month >= $${paramIndex++}`
                values.push(Number(min))
            }

            if(max){
                query += ` AND l.price_per_month <= $${paramIndex++}`
                values.push(Number(max))
            }

            if (wiyorent_only === 'true') {
                query += ` AND l.is_a_wiyorent_house = true`
            }

            if (available_only === 'true') {
                query += ` AND l.available_status = 'available'`
            }

            if (bedrooms) {
                if (bedrooms === '4+') {
                    query += ` AND l.bedroom_number >= 4`
                } else {
                    query += ` AND l.bedroom_number = $${paramIndex++}`
                    values.push(Number(bedrooms))
                }
            }

            if (max_roommates) {
                if (max_roommates === '4+') {
                    query += ` AND l.max_roommates >= 4`
                } else {
                    query += ` AND l.max_roommates <= $${paramIndex++}`
                    values.push(Number(max_roommates))
                }
            }

            if (furnished_status) {
                furnished_status === 'furnished' ?
                    query += ` AND l.is_furnished = true ` : 
                    query += ` AND l.is_furnished = false`
            }

            if(neighborhoodList.length !== 0){
                query += ` AND l.neighborhood = ANY($${paramIndex++})`
                values.push(neighborhoodList)
            }

            if (available_from) {
                // parenthesized so this OR doesn't escape the WHERE clause's AND chain
                query += ` AND (l.available_from <= $${paramIndex++} OR l.available_from < CURRENT_DATE)`
                values.push(available_from)
            }

            query += `
                GROUP BY l.id, sl.id, w.id
                ORDER BY
                    l.available_status = 'available' DESC,
                    l.created_at DESC
            `

            const result = await pool.query(query,values)

            baseListings = result.rows.map((listing) => (
                {
                    listing_id : listing.id,
                    title : listing.title,
                    is_a_wiyorent_house: listing.is_a_wiyorent_house,
                    financials : {
                        price_per_month : listing.price_per_month
                    },
                    specifications: {
                        bedroom_number: listing.bedroom_number,
                        bathroom_number: listing.bathroom_number,
                        max_roommates: listing.max_roommates,
                    },
                    neighborhood: listing.neighborhood,
                    city: listing.city,
                    available_status: listing.available_status,
                    thumbnail_url: listing.thumbnail_url,
                }
            ))

            await redisClient.set(baseCacheKey, JSON.stringify(baseListings), {EX: 3600})
        }

        // Per-user flags are cheap indexed loopups, these will run fresh every request
        // rather than baked into the shared cache above

        let savedSet = new Set()
        let waitlistSet = new Set()

        if(userId){
            const [savedRes, waitlistRes] = await Promise.all([
                pool.query(`SELECT listing_id FROM saved_listings WHERE user_id = $1`, [userId] ),
                pool.query(`SELECT listing_id FROM waitlists WHERE user_id = $1`, [userId])
            ])

            savedSet = new Set(savedRes.rows.map(r => r.listing_id))
            waitlistSet = new Set(waitlistRes.rows.map(r => r.listing_id )) 
        }

        const allListings = baseListings.map((listing) => (
            {
                ...listing,
                is_saved: savedSet.has(listing.listing_id),
                is_on_waitlist: waitlistSet.has(listing.listing_id),
            }
        ))

        const filterMetaCacheKey = 'listings:filter_meta'

        let filter_meta = JSON.parse((await redisClient.get(filterMetaCacheKey)) || 'null')

        if(!filter_meta){
            const metaResult = await pool.query(`
                SELECT
                    MIN(price_per_month) AS price_min,
                    MAX(price_per_month) AS price_max,
                    ARRAY_AGG(DISTINCT neighborhood ORDER BY neighborhood)
                        FILTER (WHERE neighborhood IS NOT NULL) AS neighborhoods
                FROM listings
                WHERE is_active = true
            `)

            const meta = metaResult.rows[0]

            filter_meta = {
                price_min: Number(meta.price_min) || 0,
                price_max: Number(meta.price_max) || 300000,
                neighborhoods: meta.neighborhoods ?? [],
            }

            await redisClient.set(filterMetaCacheKey, JSON.stringify(filter_meta), {EX: 7200})
        }

        return res.status(200).json({ data: { listings: allListings, filter_meta } })

    } catch (error) {
        console.error(error,)
        return errorMsg(res, 500, 'Failed to fetch listings. Try again later.')
    }
    
}

// ########## Fetch single listing (public detail page) ##########
export const fetchSingleListing = async (req,res) => {

    try {
        const listingId = req.params.id
        const userId = req.query.userId || null

        // Pulls the listing, its gallery images, its waitlist status for this
        // user, and a pre-aggregated `reviews` JSON object (average rating,
        // total count, and the list of approved review entries) in one query


        const listingCacheKey = `listing:${listingId}`

        let listingDetail =  JSON.parse(await (redisClient.get(listingCacheKey)) || 'null')

        if(!listingDetail){
            const result = await pool.query(`
                SELECT
                    l.id,
                    l.title,
                    l.price_per_month,
                    l.commission_fee,
                    l.caution_fee,
                    l.upfront_months,
                    l.is_a_wiyorent_house,
                    l.bedroom_number,
                    l.bathroom_number,
                    l.max_roommates,
                    l.property_type,
                    l.amenities,
                    l.neighborhood,
                    l.city,
                    l.country,
                    l.available_status,
                    TO_CHAR(
                        CASE
                            WHEN l.available_from < CURRENT_DATE THEN CURRENT_DATE
                            ELSE l.available_from
                        END, 'YYYY-MM-DD'
                    ) AS available_from,
                    l.is_furnished,
                    l.is_verified,
                    l.thumbnail_url,
                    l.description,
                    ARRAY_AGG(DISTINCT li.image_url) as image_urls,
                    l.house_rules,
                    COALESCE(
                        json_build_object(
                            'average_rating', ROUND(AVG(lr.rating) FILTER (WHERE lr.is_approved = 'approved')),
                            'total_count' , COUNT(lr.id) FILTER (WHERE lr.is_approved = 'approved'),
                            'entries', COALESCE (
                                json_agg(
                                    DISTINCT json_build_object(
                                        'id', lr.id,
                                        'reviewer_id', u.id,
                                        'name', u.full_name,
                                        'rating', lr.rating,
                                        'comment', lr.comment,
                                        'avatar', u.avatar_url,
                                        'date', lr.created_at,
                                        'is_approved', lr.is_approved,
                                        'review_rejection_note' , lr.review_rejection_note
                                    )::jsonb
                                ) FILTER (WHERE lr.id IS NOT NULL), '[]'
                            )
                        ), '{"average_rating" : 0, "total_count" : 0, "entries": [] }'
                    ) as reviews
                FROM listings l
                LEFT JOIN listing_images li
                    ON l.id = li.listing_id
                LEFT JOIN listing_reviews lr
                    ON lr.listing_id = l.id
                LEFT JOIN users u
                    ON u.id = lr.user_id
                WHERE
                    l.id = $1
                    AND l.is_active = true
                GROUP BY l.id
                `, [listingId])

            if(result.rowCount == 0){
                return errorMsg(res, 404, "Couldn't find listing")
            }

            const listing = result.rows[0]

            console.log(listing, '--listing')

            listingDetail = {
                listing_id: listing.id,
                title: listing.title,
                is_a_wiyorent_house: listing.is_a_wiyorent_house,
                financials: {
                    price_per_month: listing.price_per_month,
                    commission_fee: listing.commission_fee,   
                    caution_fee: listing.caution_fee,     
                    upfront_months: listing.upfront_months,
                },
                specifications: {
                    bedroom_number: listing.bedroom_number,
                    bathroom_number: listing.bathroom_number,
                    max_roommates: listing.max_roommates,
                    property_type: listing.property_type,
                },
                amenities: listing.amenities,
                neighborhood: listing.neighborhood,
                city: listing.city,
                country: listing.country,
                available_status: listing.available_status,
                available_from: listing.available_from,
                is_furnished: listing.is_furnished,
                is_verified: listing.is_verified,
                thumbnail_url: listing.thumbnail_url,
                description: listing.description,
                image_urls: [listing.thumbnail_url,...listing.image_urls],
                house_rules: listing.house_rules,
                reviews: listing.reviews
            }; 

            // save public object to Redis

            await redisClient.set(listingCacheKey, JSON.stringify(listingDetail), {EX: 3600})
        }

        let isOnWaitlist = false;

        if(userId){
            const waitlistCheck = await pool.query(
                `SELECT 1 FROM waitlists WHERE listing_id = $1 AND user_id = $2 LIMIT 1`, [listingId, userId])
            
                isOnWaitlist = waitlistCheck.rowCount > 0;
        }

        return res.status(200).json({
            data: {
                ...listingDetail,
                is_on_waitlist: isOnWaitlist
            }
            
        })

    } catch (error) {
        console.error('Error occurred on fetchSingleListing:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }

}

// ########## Save / unsave a listing ##########
// isLiked acts as a toggle: true inserts a saved_listings row, false removes it
export const saveListing = async (req,res) => {
    const {userId, listingId, isLiked} = req.body;
    const clientKey = req.headers['x-internal-api-key']

    if(clientKey !== process.env.INTERNAL_BACKEND_KEY){
        console.log('Not the same')
        return errorMsg(res,403,"Unauthorized Access")
    }

    try {
        if(isLiked){
            await pool.query(`
                INSERT INTO saved_listings(
                    user_id,
                    listing_id
                )
                VALUES ($1,$2)
                ON CONFLICT DO NOTHING
            `, [userId,listingId])
        }else{
            await pool.query(`
                DELETE FROM saved_listings WHERE user_id = $1 AND listing_id = $2
            `, [userId,listingId])
        }


        return successMsg(res,200)
    } catch (error) {
        console.error('Error occurred on saveListing:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
    
}

// ########## Join / leave a listing's waitlist ##########
// isOnWaitlist acts as a toggle: true inserts a waitlists row, false removes it.
// Users on the waitlist get notified by the cron job in routes/admin/index.js
// when the listing becomes available again.
export const toggleWaitlist = async (req, res) => {
    const { userId, listingId, isOnWaitlist } = req.body
    const clientKey = req.headers['x-internal-api-key']

    if (clientKey !== process.env.INTERNAL_BACKEND_KEY) {
        return errorMsg(res, 403, 'Unauthorized Access')
    }

    try {
        if (isOnWaitlist) {
            await pool.query(`
                INSERT INTO waitlists (user_id, listing_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING
            `, [userId, listingId])
        } else {
            await pool.query(`
                DELETE FROM waitlists WHERE user_id = $1 AND listing_id = $2
            `, [userId, listingId])
        }

        console.log(userId, listingId, isOnWaitlist, '---toggleWaitlist')
        return successMsg(res, 200, 'Waitlist updated', [])
    } catch (error) {
        console.error('Error occurred on toggleWaitlist:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

// ########## Fetch the current user's saved listings ##########
export const fetchSavedListings = async (req,res) => {

    try {
        const rawUserId = req.headers['x-user-id']
        const clientKey = req.headers['x-internal-api-key']

        if(clientKey !== process.env.INTERNAL_BACKEND_KEY){
            return errorMsg(res, 403, "Not authorized")
        }

        const userId = rawUserId && rawUserId !== 'null' ? rawUserId : null

        const result = await pool.query(`
            SELECT
                l.id,
                l.title,
                l.price_per_month,
                l.bedroom_number,
                l.bathroom_number,
                l.max_roommates,
                l.neighborhood,
                l.city,
                l.available_status,
                l.thumbnail_url,
                l.is_verified,
                l.is_a_wiyorent_house,
                (w.id IS NOT NULL) AS is_on_waitlist
            FROM listings l
            JOIN saved_listings sl
                ON l.id = sl.listing_id
                AND sl.user_id = $1
            LEFT JOIN waitlists w
                ON l.id = w.listing_id
                AND w.user_id = $1
        `, [userId])

        const savedListings = result.rows.map((listing) => (
            {
                listing_id : listing.id,
                title : listing.title,
                is_a_wiyorent_house: listing.is_a_wiyorent_house,
                financials : {
                    price_per_month : listing.price_per_month
                },
                specifications: {
                    bedroom_number: listing.bedroom_number,
                    bathroom_number: listing.bathroom_number,
                    max_roommates: listing.max_roommates,
                },
                neighborhood: listing.neighborhood,
                city: listing.city,
                available_status: listing.available_status,
                thumbnail_url: listing.thumbnail_url,
                is_saved: true,
                is_on_waitlist: listing.is_on_waitlist,
            }
        ))

        console.log(savedListings, '---savedListings')

        return successMsg(res,200,'',savedListings)

    } catch (error) {
        console.error('Error occurred on fetchSavedListings:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }

}

// ########## Fetch the current user's waitlisted listings ##########
export const fetchWaitlistedListings = async (req, res) => {
    const rawUserId = req.headers['x-user-id']
    const clientKey = req.headers['x-internal-api-key']

    if (clientKey !== process.env.INTERNAL_BACKEND_KEY) {
        return errorMsg(res, 403, 'Not authorized')
    }

    const userId = rawUserId && rawUserId !== 'null' ? rawUserId : null

    try {
        const result = await pool.query(`
            SELECT
                l.id, l.title, l.price_per_month,
                l.bedroom_number, l.bathroom_number, l.max_roommates,
                l.neighborhood, l.city, l.available_status,
                l.thumbnail_url, l.is_verified,
                l.is_a_wiyorent_house,
                (sl.id IS NOT NULL) AS is_saved
            FROM listings l
            JOIN waitlists w ON l.id = w.listing_id AND w.user_id = $1
            LEFT JOIN saved_listings sl ON l.id = sl.listing_id AND sl.user_id = $1
            ORDER BY w.created_at DESC
        `, [userId])

        const listings = result.rows.map(l => ({
            listing_id: l.id,
            title: l.title,
            is_a_wiyorent_house: l.is_a_wiyorent_house,
            financials: { price_per_month: l.price_per_month },
            specifications: {
                bedroom_number: l.bedroom_number,
                bathroom_number: l.bathroom_number,
                max_roommates: l.max_roommates,
            },
            neighborhood: l.neighborhood,
            city: l.city,
            available_status: l.available_status,
            thumbnail_url: l.thumbnail_url,
            is_saved: l.is_saved,
            is_on_waitlist: true,
        }))

        console.log(listings, '---waitlistedListings')
        return successMsg(res, 200, '', listings)
    } catch (error) {
        console.error('Error occurred on fetchWaitlistedListings:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

