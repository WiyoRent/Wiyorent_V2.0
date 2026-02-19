import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js"
import pool from "../../config/db.js"

export const createListing = async (req,res) => {

    try {
        const {title, is_active, is_verified, description,available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, full_name,phone_number, neighborhood,city,country,bedroom_number,bathroom_number,max_roommates,property_type,is_furnished} = req.body

        console.log(req.body, '----frontend response----')

        const images = req.files.images

        // Checking if all input text fields are valid
        if(!title || !description  || !available_status || !available_from  || !price_per_month || !commission_fee || !caution_fee || !full_name || !phone_number || !neighborhood || !city || !country ||!bedroom_number || !bathroom_number || !max_roommates || !property_type ){
            return errorMsg(res,400, 'Please Enter All Fields')
        }

        // Checking if there are images
        if (images.length <= 0 ){
            return errorMsg(res , 403 , 'Please add listing images')
        }
        
        // Uploading the image to cloudinary
        const imageUrls = []
        for (const image of images){
            const imageUpload = await uploadToCloudinary(image.buffer, `house_images/${title}`)
            const imageUrl = imageUpload.secure_url
            imageUrls.push(imageUrl)
        }

        const query = `
            INSERT INTO listings (
                title,
                is_active,
                is_verified,
                description,
                available_status,
                available_from,
                amenities,
                house_rules,
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
                is_furnished,
                thumbnail_url
            )VALUES(
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
            )
                RETURNING *
        `

        const amenities_array = amenities.split(',').map(item => item.trim())
        const house_rules_array = house_rules.split(',').map(item => item.trim())
        
        const values = [
            title,
            is_active,
            is_verified,
            description,
            available_status,
            available_from,
            amenities_array,
            house_rules_array,
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
            is_furnished,
            imageUrls[0]
        ]

        // Creating listing (images excluded)
        const result = await pool.query(query,values)
        const listing = result.rows
        if(listing.length == 0){
            return errorMsg(res, 400, "Couldn't create new listing")
        }


        // Adding gallery images to the database
        for (const url of imageUrls.slice(1)){

            const result = await pool.query(`
                    INSERT INTO listing_images(
                        listing_id,
                        image_url
                    )VALUES($1,$2)
                    RETURNING *
                `, [listing[0].id, url])

            const images = result.rows;
            console.log(images, '-----image')
        }

        return successMsg(res, 201, 'Listing successfully created')

    } catch (error) {
        console.error(error, '---ERROR')

        return errorMsg(res, 500, 'A server error occured')
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
            caution_fee : listing.caution_fee
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

export const editListing = async (req,res) => {

    try {
        // Get Listing id
        const {id} = req.params

        if(!id){
            return errorMsg(res,404, "Couldn't find listing to edit")
        }

        // Extracting Fields
        const {title, is_active, is_verified, description,available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, full_name,phone_number, neighborhood,city,country,bedroom_number,bathroom_number,max_roommates,property_type,is_furnished, images} = req.body

        console.log(req.body.images, '---images')

        // Extracting Images
        const uploadedImages = req.files

        console.log(uploadedImages, '-----uploaded Images')

        // Grouping all images

        // 1. Normalize existing images (from req.body.images)
        // It could be undefined, a string, or an array.
        const existingImages = req.body.images 
            ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images]) 
            : [];

        // 2. Normalize uploaded images (from req.files or req.files.images)

        const newImages = uploadedImages || [];

        // 3. Combine them
        const allImages = [...existingImages, ...newImages];

        


        // Checking if all input text fields are valid
        if(!title || !description  || !available_status || !available_from  || !price_per_month || !commission_fee || !caution_fee || !full_name || !phone_number || !neighborhood || !city || !country ||!bedroom_number || !bathroom_number || !max_roommates || !property_type ){
            return errorMsg(res,400, 'Please Enter All Fields')
        }

        // Checking if there are atleast 2 images
        if (allImages.length < 2 ){
            return errorMsg(res , 403 , 'Please upload atleast 2 images')
        }

        // Pre-processing amenities and house arrays
        const amenities_array = amenities.split(',')
        const house_rules_array = house_rules.split(',')

        // Image handling
        // Uploading the image to cloudinary
        const imageUrls = []
        for (const image of allImages){
            if(typeof image == 'string'){
                imageUrls.push(image)
            }else{
                const imageUpload = await uploadToCloudinary(image.buffer, `house_images/${title}`)
                const imageUrl = imageUpload.secure_url
                imageUrls.push(imageUrl)
            }
        }

        console.log(imageUrls, '----alllll images url----')
        

        const query = `
            UPDATE listings
            SET
                title =$1,
                is_active = $2,
                is_verified = COALESCE ($3, true),
                description = $4,
                available_status = $5,
                available_from = $6,
                amenities = $7,
                house_rules = $8,
                price_per_month = $9,
                commission_fee = $10,
                caution_fee = $11,
                full_name = $12,
                phone_number = $13,
                neighborhood = $14,
                city = $15,
                country = $16,
                bedroom_number = $17,
                bathroom_number = $18,
                max_roommates = $19,
                property_type = $20,
                is_furnished = $21,
                thumbnail_url = $22
            WHERE id = $23
            RETURNING *
            `

        const values = [
            title,
            is_active,
            is_verified,
            description,
            available_status,
            available_from,
            amenities_array,
            house_rules_array,
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
            is_furnished,
            imageUrls[0],
            id
        ]

        const result = await pool.query(query,values)

        if(result.rowCount === 0){
            return errorMsg(res, 404, "Couldn't edit product")
        }

        // --------Editing Product Images---------

        // We first delete existing images for this listing
        await pool.query(`DELETE FROM listing_images WHERE listing_id =$1`,[id])

        // We upload new images
        for(const img of imageUrls.slice(1)){
            await pool.query(`
                INSERT INTO listing_images(
                    listing_id,
                    image_url
                )VALUES($1, $2)
                RETURNING *
            `,[id,img])
            
        }

        return successMsg(res, 200, 'Listing updated successfully')
    } catch (error) {
        console.error(error, '---ERRROORRR---')
        return errorMsg(res,500,error.message || 'Sorry an enexpected server error occured')
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