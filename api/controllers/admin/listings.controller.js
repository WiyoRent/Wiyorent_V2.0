import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js"
import pool from "../../config/db.js"

export const createListing = async (req,res) => {

    try {
        const {title, is_active, is_verified, description,available_status, available_from, amenities, house_rules, price_per_month, commission_fee, caution_fee, full_name,phone_number, neighborhood,city,country,bedroom_number,bathroom_number,max_roommates,property_type,is_furnished} = req.body

        console.log(req.body)

        const images = req.files.images

        // Checking if all input text fields

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
                is_furnished
            )VALUES(
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
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
            is_furnished
        ]

        // Creating listing (images excluded)
        const result = await pool.query(query,values)
        const listing = result.rows
        if(listing.length == 0){
            return errorMsg(res, 400, "Couldn't create new listing")
        }
        

        // Adding Images to the database

        for (const url of imageUrls){

            console.log(listing[0].id)

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



export const editListing = async (req,res) => {

}

export const fetchAllListings = async (req,res) => {

}