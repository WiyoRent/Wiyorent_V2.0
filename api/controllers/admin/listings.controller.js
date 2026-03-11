import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js"
import pool from "../../config/db.js"
import { v2 as cloudinary } from "cloudinary"
import {extractPublicId} from 'cloudinary-build-url'
import { sendWaitlistAvailabilityEmail } from "../../utils/mail.js"

export const createListing = async (req, res) => {
    try {
        const { title, is_active, is_verified, description, available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, upfront_months, is_a_wiyorent_house, full_name, phone_number, neighborhood, city, country, bedroom_number, bathroom_number, max_roommates, property_type, is_furnished } = req.body

        const images = req.files.images

        if (!title || !description || !available_status || !available_from || !price_per_month || !commission_fee || !caution_fee || !full_name || !phone_number || !neighborhood || !city || !country || !bedroom_number || !bathroom_number || !max_roommates || !property_type) {
            return errorMsg(res, 400, 'Please Enter All Fields')
        }

        if (images.length <= 0) {
            return errorMsg(res, 403, 'Please add listing images')
        }

        const amenities_array = amenities.split(',').map(item => item.trim())
        const house_rules_array = house_rules.split(',').map(item => item.trim())

        //  Create listing first 
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

        // Upload images using the real listing ID
        const imageUrls = []
        for (const image of images) {
            const imageUpload = await uploadToCloudinary(image.buffer, `house_images/${listingId}`)
            imageUrls.push(imageUpload.secure_url)
        }

        //  Update listing with thumbnail 
        await pool.query(
            `UPDATE listings SET thumbnail_url = $1 WHERE id = $2`,
            [imageUrls[0], listingId]
        )

        //  Insert remaining images into gallery
        for (const url of imageUrls.slice(1)) {
            await pool.query(
                `INSERT INTO listing_images (listing_id, image_url) VALUES ($1, $2)`,
                [listingId, url]
            )
        }

        return successMsg(res, 201, 'Listing successfully created')

    } catch (error) {
        console.error(error, '---ERROR')
        return errorMsg(res, 500, 'A server error occurred')
    }
}

export const fetchSingleListing = async (req,res) => {
    const id = req.params.id

    if(!id){
        return errorMsg(res, 404, "Listing Not Found. Couldn't get product ID")
    }

    const result = await pool.query(`
        SELECT 
            l.*,
            ARRAY_AGG(li.image_url) as image_urls
        FROM listings l
        LEFT JOIN listing_images li
            ON l.id = li.listing_id
        WHERE 
            l.id = $1
        GROUP BY 
            l.id
    `, [id])

    console.log(result)

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

    console.log(listing)

    return successMsg(res, 200, 'Product Fetched Successfully', listing)
}

export const editListing = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return errorMsg(res, 404, "Couldn't find listing to edit")
        }

        const { title, is_active, is_verified, description, available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, upfront_months, is_a_wiyorent_house, full_name, phone_number, neighborhood, city, country, bedroom_number, bathroom_number, max_roommates, property_type, is_furnished } = req.body

        if (!title || !description || !available_status || !available_from || !price_per_month || !commission_fee || !caution_fee || !full_name || !phone_number || !neighborhood || !city || !country || !bedroom_number || !bathroom_number || !max_roommates || !property_type) {
            return errorMsg(res, 400, 'Please Enter All Fields')
        }

        const uploadedImages = req.files || []

        // Normalize and strip the first image (thumbnail) — frontend sends all
        // image_urls including the thumbnail, but we only want the gallery ones
        const rawExisting = req.body.images
            ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images])
            : []

        const [thumbnail, ...existingGallery] = rawExisting
        const allImages = [...existingGallery, ...uploadedImages]

        if (allImages.length < 3) {
            return errorMsg(res, 403, 'Please upload at least 4 images for this property')
        }

        const amenities_array = amenities.split(',').map(item => item.trim())
        const house_rules_array = house_rules.split(',').map(item => item.trim())

        // Upload new files, keep existing URLs as-is
        const galleryUrls = []
        for (const image of allImages) {
            if (typeof image === 'string') {
                galleryUrls.push(image)
            } else {
                const upload = await uploadToCloudinary(image.buffer, `house_images/${id}`)
                galleryUrls.push(upload.secure_url)
            }
        }

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
            await cloudinary.uploader.destroy(publicIds)
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
        console.error(error, '---ERROR---')
        return errorMsg(res, 500, error.message || 'Sorry an unexpected server error occurred')
    }
}

export const fetchAllListings = async (req,res) => {

    const data = await pool.query(`
            SELECT 
                id,
                title,
                thumbnail_url,
                is_active,
                is_verified,
                available_status,
                full_name,
                phone_number,
                neighborhood,
                city,
                country
            FROM listings
            
        `)

    let listings =  data.rows

    listings = listings.map(listing => (
        {
            listing_id : listing.id,
            title : listing.title,
            thumbnail_url: listing.thumbnail_url, 
            is_active: listing.is_active,
            is_verified: listing.is_verified,
            available_status: listing.available_status,
            analytics: {
                number_of_saves: listing.number_of_saves || 0,
                number_of_views: listing.number_of_views || 0
            },
            landlord: {
                full_name: listing.full_name,
                phone_number: listing.phone_number
            },
            location: {
                neighborhood: listing.neighborhood,
                city: listing.city,
                country: listing.country
            }
        }
     ))

     console.log(listings)

    return successMsg(res, 200, 'Data Fetched Successfull', listings)

}

export const deleteListing = async (req,res) => {
    const id = req.params.id

    if(!id){
        return errorMsg(res,404, "Couldn't find listing")
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

    return successMsg(res,200,"Item Successfully Deleted")
}