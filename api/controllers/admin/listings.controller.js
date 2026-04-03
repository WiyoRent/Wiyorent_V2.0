import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import pool from "../../config/db.js"
import { v2 as cloudinary } from "cloudinary"
import { extractPublicId } from 'cloudinary-build-url'
import { sendWaitlistAvailabilityEmail } from "../../utils/mail.js"

export const createListing = async (req, res) => {
    try {
        const { title, is_active, is_verified, description, available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, upfront_months, is_a_wiyorent_house, full_name, phone_number, neighborhood, city, country, bedroom_number, bathroom_number, max_roommates, property_type, is_furnished } = req.body

        const requiredFields = {
            title,
            description,
            available_status,
            available_from,
            price_per_month,
            commission_fee,
            caution_fee,
            full_name,
            phone_number,
            neighborhood,
            city,
            country,
            bedroom_number,
            bathroom_number,
            max_roommates,
            property_type,
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([_, val]) => val === null || val === undefined || String(val).trim() === '')
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return errorMsg(res, 400, `Missing required fields: ${missingFields.join(', ')}`);
        }

        const amenities_array = amenities.split(',').map(item => item.trim())
        const house_rules_array = house_rules.split(',').map(item => item.trim())

        const query = `
            INSERT INTO listings (
                title, is_active, is_verified, description, available_status,
                available_from, amenities, house_rules, price_per_month,
                commission_fee, caution_fee, upfront_months, is_a_wiyorent_house,
                full_name, phone_number, neighborhood, city, country,
                bedroom_number, bathroom_number, max_roommates, property_type,
                is_furnished
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
                $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
            ) RETURNING *
        `

        const values = [
            title, is_active, is_verified, description, available_status,
            available_from, amenities_array, house_rules_array, price_per_month,
            commission_fee, caution_fee, upfront_months, is_a_wiyorent_house,
            full_name, phone_number, neighborhood, city, country,
            bedroom_number, bathroom_number, max_roommates, property_type,
            is_furnished
        ]

        const result = await pool.query(query, values)
        const listing = result.rows
        if (listing.length === 0) {
            return errorMsg(res, 400, "Couldn't create new listing")
        }

        const listingId = listing[0].id

        return successMsg(res, 201, 'Listing successfully created', { listing_id: listingId })

    } catch (error) {
        console.error('Error occurred on createListing:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const setListingImages = async (req, res) => {
    try {
        const { id } = req.params
        const images = req.body.images

        if (!id) {
            return errorMsg(res, 400, 'Listing ID is required')
        }

        if (!Array.isArray(images) || images.length === 0) {
            return errorMsg(res, 400, 'Images array is required')
        }

        await pool.query(
            `UPDATE listings SET thumbnail_url = $1 WHERE id = $2`,
            [images[0], id]
        )

        await pool.query(
            `DELETE FROM listing_images WHERE listing_id = $1`,
            [id]
        )

        for (const url of images.slice(1)) {
            await pool.query(
                `INSERT INTO listing_images (listing_id, image_url) VALUES ($1, $2)`,
                [id, url]
            )
        }

        return successMsg(res, 200, 'Images set successfully')

    } catch (error) {
        console.error('Error occurred on setListingImages:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const fetchSingleListing = async (req,res) => {
    const id = req.params.id

    if(!id){
        return errorMsg(res, 404, "Listing Not Found. Couldn't get product ID")
    }

    try {
    const result = await pool.query(`
        SELECT 
            l.*,
            TO_CHAR(
                CASE
                    WHEN l.available_from < CURRENT_DATE THEN CURRENT_DATE
                    ELSE l.available_from
                END, 'YYYY-MM-DD'
            ) as available_from,
            ARRAY_AGG(li.image_url) as image_urls,
            l.view_count as number_of_views,
            (select count(*) from saved_listings where l.id = listing_id) as number_of_saves
        FROM listings l
        LEFT JOIN listing_images li
            ON l.id = li.listing_id
        WHERE 
            l.id = $1
        GROUP BY 
            l.id
    `, [id])


    if(result.rowCount === 0){
        return errorMsg(res, 404, "Product Not Found")
    }

    let listing = result.rows

    listing = listing.map(listing => ({
        listing_id : id,
        title : listing.title,
        is_a_wiyorent_house : listing.is_a_wiyorent_house,
        description : listing.description,
        available_status : listing.available_status,
        is_active : listing.is_active,
        is_verified : listing.is_verified,
        available_from : listing.available_from,
        analytics : {
            number_of_saves : listing.number_of_saves || 0,
            number_of_views : listing.number_of_views || 0
        },
        landlord : {
            full_name : listing.full_name,
            phone_number : listing.phone_number
        },
        financials: {
            price_per_month : listing.price_per_month,
            commission_fee : listing.commission_fee,
            caution_fee : listing.caution_fee,
            upfront_months : listing.upfront_months
        },
        specifications : {
            bedroom_number : listing.bedroom_number,
            bathroom_number : listing.bathroom_number,
            max_roommates : listing.max_roommates,
            property_type : listing.property_type,
            is_furnished : listing.is_furnished
        },
        amenities : listing.amenities,
        house_rules : listing.house_rules,
        location: {
            neighborhood: listing.neighborhood,
            city: listing.city,
            country: listing.country
        },
        image_urls: [listing.thumbnail_url, ...listing.image_urls]
    }))

    console.log(listing, '----detaill listing fetched')


    return successMsg(res, 200, 'Listing Fetched Successfully', listing)
    } catch (error) {
        console.error('Error occurred on fetchSingleListing:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const editListing = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return errorMsg(res, 404, "Couldn't find listing to edit")
        }

        const { title, is_active, is_verified, description, available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, upfront_months, is_a_wiyorent_house, full_name, phone_number, neighborhood, city, country, bedroom_number, bathroom_number, max_roommates, property_type, is_furnished } = req.body

        const requiredFields = {
            title,
            description,
            available_status,
            available_from,
            price_per_month,
            commission_fee,
            caution_fee,
            full_name,
            phone_number,
            neighborhood,
            city,
            country,
            bedroom_number,
            bathroom_number,
            max_roommates,
            property_type,
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([_, val]) => val === null || val === undefined || String(val).trim() === '')
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return errorMsg(res, 400, `Missing required fields: ${missingFields.join(', ')}`);
        }

        // All images are URL strings — strip the first (thumbnail) for gallery
        const rawImages = req.body.images
            ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images])
            : []

        const [thumbnail, ...galleryUrls] = rawImages

        if (galleryUrls.length < 3) {
            return errorMsg(res, 403, 'Please upload at least 4 images for this property')
        }

        const amenities_array = amenities.split(',').map(item => item.trim())
        const house_rules_array = house_rules.split(',').map(item => item.trim())

        // Fetch current status before update (needed for waitlist notification)
        const current = await pool.query(
            `SELECT available_status FROM listings WHERE id = $1`, [id]
        )
        const previous_status = current.rows[0]?.available_status

        // Update listing
        const result = await pool.query(`
            UPDATE listings
            SET
                title = $1, is_active = $2, is_verified = COALESCE($3, true),
                description = $4, available_status = $5, available_from = $6,
                amenities = $7, house_rules = $8, price_per_month = $9,
                commission_fee = $10, caution_fee = $11, upfront_months = $12,
                is_a_wiyorent_house = $13, full_name = $14, phone_number = $15,
                neighborhood = $16, city = $17, country = $18,
                bedroom_number = $19, bathroom_number = $20, max_roommates = $21,
                property_type = $22, is_furnished = $23, thumbnail_url = $24
            WHERE id = $25
            RETURNING *
        `, [
            title, is_active, is_verified, description, available_status,
            available_from, amenities_array, house_rules_array, price_per_month,
            commission_fee, caution_fee, upfront_months, is_a_wiyorent_house,
            full_name, phone_number, neighborhood, city, country,
            bedroom_number, bathroom_number, max_roommates, property_type,
            is_furnished, thumbnail, id
        ])

        if (result.rowCount === 0) {
            return errorMsg(res, 404, "Couldn't edit listing")
        }

        // Sync gallery
        const existingRes = await pool.query(
            `SELECT image_url FROM listing_images WHERE listing_id = $1`, [id]
        )
        const existingUrls = existingRes.rows.map(row => row.image_url)

        const urlToRemove = existingUrls.filter(url => !galleryUrls.includes(url))
        const urlToAdd    = galleryUrls.filter(url => !existingUrls.includes(url))

        if (urlToRemove.length > 0) {
            await pool.query(
                `DELETE FROM listing_images WHERE listing_id = $1 AND image_url = ANY($2)`,
                [id, urlToRemove]
            )
            const publicIds = urlToRemove.map(url => extractPublicId(url))
            await Promise.all(publicIds.map(id => cloudinary.uploader.destroy(id)))
        }

        for (const url of urlToAdd) {
            await pool.query(
                `INSERT INTO listing_images (listing_id, image_url) VALUES ($1, $2)`,
                [id, url]
            )
        }

        // Notify waitlisted users if listing just became available
        const became_available =
            available_status === 'available' &&
            (previous_status === 'booked' || previous_status === 'maintenance')

        if (became_available) {
            const waitlistRes = await pool.query(`
                SELECT u.email, u.full_name
                FROM waitlists w
                JOIN users u ON w.user_id = u.id
                WHERE w.listing_id = $1
            `, [id])

            await Promise.all(
                waitlistRes.rows.map(u =>
                    sendWaitlistAvailabilityEmail(u.email, u.full_name, title, id)
                )
            )
        }

        return successMsg(res, 200, 'Listing updated successfully')

    } catch (error) {
        console.error('Error occurred on editListing:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const fetchAllListings = async (req, res) => {
    try {
        const { is_active, neighborhood, is_furnished, min_price, max_price, sort, available_status, property_type, bedroom_number, is_a_wiyorent_house, landlord } = req.query

        let query = `
            SELECT
                id,
                title,
                thumbnail_url,
                is_active,
                is_verified,
                is_a_wiyorent_house,
                available_status,
                full_name,
                phone_number,
                neighborhood,
                city,
                country,
                price_per_month,
                is_furnished,
                property_type,
                bedroom_number,
                created_at,
                (SELECT COUNT(*) FROM saved_listings WHERE listing_id = listings.id) AS number_of_saves,
                view_count as number_of_views
            FROM listings
            WHERE 1=1
        `
        const values = []
        let i = 1

        if (is_active !== undefined && is_active !== '') {
            query += ` AND is_active = $${i++}`
            values.push(is_active === 'true')
        }
        if (available_status) {
            query += ` AND available_status = $${i++}`
            values.push(available_status)
        }
        if (neighborhood) {
            query += ` AND neighborhood = $${i++}`
            values.push(neighborhood)
        }
        if (is_furnished !== undefined && is_furnished !== '') {
            query += ` AND is_furnished = $${i++}`
            values.push(is_furnished === 'true')
        }
        if (min_price) {
            query += ` AND price_per_month >= $${i++}`
            values.push(Number(min_price))
        }
        if (max_price) {
            query += ` AND price_per_month <= $${i++}`
            values.push(Number(max_price))
        }
        if (property_type) {
            query += ` AND property_type = $${i++}`
            values.push(property_type)
        }
        if (bedroom_number !== undefined && bedroom_number !== '') {
            if (bedroom_number === '4+') {
                query += ` AND bedroom_number >= 4`
            } else {
                query += ` AND bedroom_number = $${i++}`
                values.push(Number(bedroom_number))
            }
        }
        if (is_a_wiyorent_house !== undefined && is_a_wiyorent_house !== '') {
            query += ` AND is_a_wiyorent_house = $${i++}`
            values.push(is_a_wiyorent_house === 'true')
        }
        if (landlord) {
            query += ` AND full_name = $${i++}`
            values.push(landlord)
        }

        query += sort === 'oldest' ? ` ORDER BY created_at ASC` : ` ORDER BY created_at DESC`

        const [data, metaResult] = await Promise.all([
            pool.query(query, values),
            pool.query(`
                SELECT
                    MIN(price_per_month) AS price_min,
                    MAX(price_per_month) AS price_max,
                    ARRAY_AGG(DISTINCT neighborhood ORDER BY neighborhood)
                        FILTER (WHERE neighborhood IS NOT NULL) AS neighborhoods,
                    ARRAY_AGG(DISTINCT property_type ORDER BY property_type)
                        FILTER (WHERE property_type IS NOT NULL) AS property_types,
                    ARRAY_AGG(DISTINCT full_name ORDER BY full_name)
                        FILTER (WHERE full_name IS NOT NULL) AS landlords
                FROM listings
            `)
        ])

        const filter_meta = metaResult.rows[0] ?? null

        const listings = data.rows.map(listing => ({
            listing_id: listing.id,
            title: listing.title,
            thumbnail_url: listing.thumbnail_url,
            is_active: listing.is_active,
            is_verified: listing.is_verified,
            is_a_wiyorent_house: listing.is_a_wiyorent_house,
            available_status: listing.available_status,
            analytics: {
                number_of_saves: parseInt(listing.number_of_saves) || 0,
                number_of_views: parseInt(listing.number_of_views) || 0,
            },
            landlord: {
                full_name: listing.full_name,
                phone_number: listing.phone_number,
            },
            location: {
                neighborhood: listing.neighborhood,
                city: listing.city,
                country: listing.country,
            },
        }))

        return successMsg(res, 200, '', { listings, filter_meta })

    } catch (error) {
        console.error('Error occurred on fetchAllListings:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const toggleListingActive = async (req, res) => {
    try {
        const { id } = req.params
        const { is_active } = req.body

        if (!id) {
            return errorMsg(res, 400, "Listing ID is required")
        }

        if (is_active === undefined || is_active === null) {
            return errorMsg(res, 400, "is_active field is required")
        }

        const result = await pool.query(
            `UPDATE listings SET is_active = $1 WHERE id = $2 RETURNING id, is_active`,
            [is_active, id]
        )

        if (result.rowCount === 0) {
            return errorMsg(res, 404, "Listing not found")
        }

        return successMsg(res, 200, 'Listing visibility updated successfully', result.rows[0])

    } catch (error) {
        console.error('Error occurred on toggleListingActive:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const deleteListing = async (req,res) => {
    try {
        const id = req.params.id

        if(!id){
            return errorMsg(res,400, "Couldn't find listing")
        }

        const result = await pool.query(`
            DELETE FROM listings
            WHERE
                id = $1
            RETURNING *
        `, [id])

        if(result.rowCount == 0){
            return errorMsg(res, 404, "Couldn't find listing")
        }

        try {
            await cloudinary.api.delete_resources_by_prefix(`wiyorent/listings/${id}`)
            await cloudinary.api.delete_folder(`wiyorent/listings/${id}`)
        } catch (cloudinaryError) {
            console.error('Cloudinary cleanup failed (listing deleted from DB):', cloudinaryError.message)
        }

        return successMsg(res,200,"Item Successfully Deleted")
    } catch (error) {
        console.error('Error occurred on deleteListing:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}