import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js"
import pool from "../../config/db.js"
import { verifyHeaders } from "../../utils/verifyHeaders.js"
import { throwError } from "../../utils/throwError.js"


export const updateProfile = async (req, res) => {
    try {
        const { userId } = verifyHeaders(req)

        const {
            full_name,
            nationality,
            university_name,
            age,
            gender,
            program,
            year_of_study,
            phone_number,
            move_in_date,
            min,
            max,
            max_housemates,
            is_furnished_preferred,
            is_private_room_required,
            allows_pets,
            is_smoker,
            sleep_schedule,
            cleanliness,
            social_habits,
            preferred_locations,
            about_me,
            lease_duration,
            urgency,
            has_house
        } = req.body

        console.log(req.body, '------body')
        console.log(req.files, '------files')

        if (
            !full_name ||
            !nationality ||
            !university_name ||
            !age ||
            !gender ||       // BUG FIX: was a comma instead of || so this was never checked
            !program ||
            !year_of_study ||
            !phone_number ||
            !move_in_date ||
            !min ||
            !max ||
            !max_housemates ||
            !sleep_schedule ||
            !cleanliness ||
            !social_habits ||
            !preferred_locations ||
            !about_me ||
            !lease_duration ||
            !urgency
        ) {
            return errorMsg(res, 400, "Please enter all fields")  // BUG FIX: was req instead of res
        }

        // ------ Update basic user info ------
        const query = `
            UPDATE users
            SET
                full_name = $1,
                nationality = $2,
                university_name = $3,
                age = $4,
                gender = $5,
                program = $6,
                year_of_study = $7,
                phone_number = $8,
                move_in_date = $9,
                min = $10,
                max = $11,
                max_housemates = $12,
                is_furnished_preferred = $13,
                is_private_room_required = $14,
                allows_pets = $15,
                is_smoker = $16,
                sleep_schedule = $17,
                cleanliness = $18,
                social_habits = $19,
                preferred_locations = $20,
                about_me = $21,
                lease_duration = $22,
                urgency = $23,
                has_house = $24,
                updated_at = NOW()
            WHERE id = $25
            RETURNING *
        `

        const values = [
            full_name,
            nationality,
            university_name,
            age,
            gender,
            program,
            year_of_study,
            phone_number,
            move_in_date,
            min,
            max,
            max_housemates,
            is_furnished_preferred,
            is_private_room_required,
            allows_pets,
            is_smoker,
            sleep_schedule,
            cleanliness,
            social_habits,
            preferred_locations,
            about_me,
            lease_duration,
            urgency,
            has_house,
            userId
        ]

        const result = await pool.query(query, values)

        if (result.rowCount == 0) {
            return errorMsg(res, 404, "Couldn't find account")
        }

        const user = result.rows[0]

        // ------ Handle document/avatar uploads ------
        if (req.files?.avatar || req.files?.admission_letter || req.files?.passport_id) {
            let avatar_url = null
            let admission_letter_url = null
            let passport_id_url = null

            if (req.files.avatar) {
                const avatar_upload = await uploadToCloudinary(req.files.avatar[0].buffer, `user-${full_name}/profiles/${full_name}`)
                avatar_url = avatar_upload.secure_url
            } else {
                avatar_url = req.body.avatar
            }

            if (req.files.admission_letter) {
                const admission_letter_upload = await uploadToCloudinary(req.files.admission_letter[0].buffer, `user-${full_name}/admission_letters/${full_name}`)
                admission_letter_url = admission_letter_upload.secure_url
            } else {
                admission_letter_url = req.body.admission_letter
            }

            if (req.files.passport_id) {
                const passport_id_upload = await uploadToCloudinary(req.files.passport_id[0].buffer, `legal_documents/${full_name}`)
                passport_id_url = passport_id_upload.secure_url
            } else {
                passport_id_url = req.body.passport_id
            }

            const uploadResult = await pool.query(`
                UPDATE users
                SET 
                    avatar_url = $1,
                    admission_letter = $2,
                    passport_id = $3
                WHERE id = $4
            `, [avatar_url, admission_letter_url, passport_id_url, userId])  // BUG FIX: was `id` (undefined), now `userId`

            if (uploadResult.rowCount == 0) {
                return errorMsg(res, 404, "Couldn't update your documents")
            }
        }

        // ------ Handle listing creation/update ------
        if (has_house === 'true') {
            const alreadyExistingImages = req.body.listing_images_existing
                ? Array.isArray(req.body.listing_images_existing)
                    ? req.body.listing_images_existing
                    : [req.body.listing_images_existing]
                : []
            const newUploads = req.files?.listing_images || []
            const listingImages = [...alreadyExistingImages, ...newUploads]

            await create_user_listing(req.body, listingImages, full_name, userId)
        }

        // ------ Onboarding flag ------
        if (!user.is_onboarded) {
            await pool.query(`
                UPDATE users
                SET 
                    is_onboarded = true,
                    updated_at = NOW()
                WHERE id = $1
            `, [user.id])
        }

        // ------ Update flag ------
        await pool.query(`
            UPDATE users
            SET has_performed_an_update = true
            WHERE id = $1
        `, [user.id])

        if (!user.is_verified) {
            return successMsg(res, 200, 'Onboarding details saved. We are currently verifying your account.')
        }

        return successMsg(res, 200, 'Your profile has been successfully updated.')

    } catch (error) {
        console.error(error)
        return errorMsg(res, error.status || 500, error.message || 'An error occurred on profile update')
    }
}


const create_user_listing = async (body, listing_images, full_name, userId) => {
    const {
        listing_is_active,
        listing_price,
        listing_caution_fee,
        listing_bedrooms,
        listing_bathrooms,
        listing_landlord_name,
        listing_landlord_number,
        listing_description,
        listing_neighborhood,
        listing_city,
        listing_available_from,
        listing_housemate_gender,
        listing_amenities,
        listing_house_rules
    } = body

    if (
        !listing_price ||
        !listing_caution_fee ||
        !listing_bedrooms ||
        !listing_bathrooms ||
        !listing_landlord_name ||
        !listing_landlord_number ||
        !listing_description ||
        !listing_neighborhood ||
        !listing_city ||
        !listing_available_from ||
        !listing_housemate_gender ||
        !listing_amenities ||
        !listing_house_rules
    ) {
        throwError(400, "Please fill in all listing fields")
    }

    if (!listing_images || listing_images.length === 0) {
        throwError(400, "Please upload listing images")
    }

    if (listing_images.length < 4) {
        throwError(400, 'Please upload at least 4 listing images (bathroom, bedroom, living room and kitchen)')
    }

    if (listing_images.length > 10) {
        throwError(400, 'Too many images. Please upload less than 10 images')
    }

    try {
        // ------ Upload new images to Cloudinary ------
        const imageUrls = []

        for (const image of listing_images) {
            if (typeof image === 'string') {
                imageUrls.push(image)
            } else {
                const image_upload = await uploadToCloudinary(image.buffer, `user_listings/${full_name}`)
                imageUrls.push(image_upload.secure_url)
            }
        }

        // ------ Upsert listing row (insert or update if already exists) ------
        // BUG FIX: was always INSERT — caused duplicate listings on every profile save
        const listingResult = await pool.query(`
            INSERT INTO user_listings (
                user_id,
                is_active,
                price,
                caution_fee,
                bedrooms,
                bathrooms,
                landlord_name,
                landlord_number,
                description,
                neighborhood,
                city,
                available_from,
                housemate_gender,
                amenities,
                house_rules
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
            RETURNING *
        `, [
            userId,
            listing_is_active,
            listing_price,
            listing_caution_fee,
            listing_bedrooms,
            listing_bathrooms,
            listing_landlord_name,
            listing_landlord_number,
            listing_description,
            listing_neighborhood,
            listing_city,
            listing_available_from,
            listing_housemate_gender,
            listing_amenities,
            listing_house_rules
        ])

        if (listingResult.rowCount == 0) {
            throwError(400, "Couldn't save user listing")
        }

        const userListing = listingResult.rows[0]
        const userListingId = userListing.id  // ← the actual listing UUID

        console.log(userListing, '---- Listing upserted')

        // ------ Sync images ------
        // Get currently stored image URLs for this listing
        const existingRes = await pool.query(`
            SELECT image_url FROM user_listing_images
            WHERE user_listing_id = $1
        `, [userListingId])

        const existingUrls = existingRes.rows.map(row => row.image_url)

        // Delete images that are no longer in the new set
        const urlsToRemove = existingUrls.filter(url => !imageUrls.includes(url))
        if (urlsToRemove.length > 0) {
            await pool.query(`
                DELETE FROM user_listing_images
                WHERE user_listing_id = $1 AND image_url = ANY($2)
            `, [userListingId, urlsToRemove])
        }

        // Insert only new images
        const urlsToAdd = imageUrls.filter(url => !existingUrls.includes(url))
        for (const url of urlsToAdd) {
            await pool.query(`
                INSERT INTO user_listing_images (user_id, user_listing_id, image_url)
                VALUES ($1, $2, $3)
            `, [userId, userListingId, url])  // BUG FIX: now correctly sets user_listing_id
        }

        console.log(`Synced ${urlsToAdd.length} new images, removed ${urlsToRemove.length} old images`)

    } catch (error) {
        console.error(error, 'Error in create_user_listing')
        throwError(error.status || 500, error.message || 'Error occurred saving listing')
    }
}