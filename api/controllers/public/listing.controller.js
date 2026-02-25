import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"

export const fetchListings = async (req,res) => {
    const clientKey = req.headers['x-internal-api-key']
    const rawUserId = req.headers['x-user-id']

    const userId = rawUserId && rawUserId !== 'null' ? rawUserId : null;

    if(clientKey !== process.env.INTERNAL_BACKEND_KEY){
        return errorMsg(res, 403, 'Unauthorized')
    }

    try {
        const result = await pool.query(`
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
                (sl.id is not null) as is_saved
            FROM 
                listings l
            LEFT JOIN saved_listings sl
                ON l.id = sl.listing_id
                AND sl.user_id = $1
            WHERE is_active = true
            GROUP BY l.id, sl.id
            `, [userId])

        const listings = result.rows 

        const allListings = listings.map((listing,index) => (
            {
                listing_id : listing.id,
                title : listing.title,
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
                 is_saved: listing.is_saved
            }
        ))

        console.log(allListings, '--all_listings')

        return res.status(200).json({data:allListings})
    
    } catch (error) {
        console.error(error, '----errrrrioorr')
        return res.status(200).json({data:[]})
    }
    
}

export const fetchSingleListing = async (req,res) => {

    try {
        const {id} = req.params

        const result = await pool.query(`
            SELECT 
                l.id,
                l.title,
                l.price_per_month,
                l.commission_fee,
                l.caution_fee,
                l.bedroom_number,
                l.bathroom_number,
                l.max_roommates,
                l.property_type,
                l.amenities,
                l.neighborhood,
                l.city,
                l.country,
                l.available_status,
                l.is_furnished,
                l.is_verified,
                l.thumbnail_url,
                l.description,
                ARRAY_AGG(li.image_url) as image_urls,
                l.house_rules
            FROM listings l
            LEFT JOIN listing_images li
                ON l.id = li.listing_id
            WHERE 
                l.id = $1
            GROUP BY l.id
            `, [id])

        if(result.rowCount == 0){
            return errorMsg(res, 404, "Couldn't find listing")
        }

        const listing = result.rows[0]

        const listingDetail = {
            listing_id: listing.id,
            title: listing.title,
            financials: {
                price_per_month: listing.price_per_month,
                commission_fee: listing.commission_fee,   // 10% of one month rent (default)
                caution_fee: listing.caution_fee,     // refundable by default
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
            is_furnished: listing.is_furnished,
            is_verified: listing.is_verified,
            thumbnail_url: listing.thumbnail_url,
            description: listing.description,
            image_urls: [listing.thumbnail_url,...listing.image_urls],
            house_rules: listing.house_rules,
            reviews: {
                average_rating: 4.8,
                total_count: 112,
                entries: [
                    {
                        id: 'rev_01',
                        name: 'John Mutabazi',
                        rating: 5,
                        comment:'Great place for a student! Very close to the university and the landlord is super helpful. The Wi-Fi is also very reliable.',
                        avatar: 'https://i.pravatar.cc/150?u=john',
                        date: '2024-01-15'
                    },
                    {
                        id: 'rev_02',
                        name: 'Alice Uwera',
                        rating: 4,
                        comment:
                        "The apartment is clean and modern. My only complaint is the occasional noise from the street, but it's not a major issue.",
                        avatar: 'https://i.pravatar.cc/150?u=alice',
                        date: '2024-02-01'
                    },
                ],
            },
        };

        console.log(listingDetail, '---listing detail')

        return res.status(200).json({data:listingDetail})

    } catch (error) {
        console.error(error)
    }

}

export const saveListing = async (req,res) => {
    const {userId, listingId, isLiked} = req.body;
    const clientKey = req.headers['x-internal-api-key']

    if(clientKey !== process.env.INTERNAL_BACKEND_KEY){
        console.log('Not the same')
        return errorMsg(res,403,"Unauthorized Access")
    }

    try {
        if(isLiked){
            await pool.query(s`
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
        console.error(error)
        return errorMsg(res,500,"Internal DB Error")
    }
    
}


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
                l.is_verified
            FROM listings l
            JOIN saved_listings sl
                ON l.id = sl.listing_id
                AND sl.user_id = $1
        `, [userId])

        const listings = result.rows

        const savedListing = listings.map((listing,index) => (
            {
                listing_id : listing.id,
                title : listing.title,
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

        console.log(savedListing, '---savedListings')

        return successMsg(res,200,'',savedListing)

        
        
    } catch (error) {
        console.error(error, 'error on favourite listing page listings')
    }

}