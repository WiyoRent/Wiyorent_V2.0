import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js"
import pool from "../../config/db.js"
import { verifyHeaders } from "../../utils/verifyHeaders.js"
import { throwError } from "../../utils/throwError.js"
import { v2 as cloudinary } from "cloudinary"
import {extractPublicId} from 'cloudinary-build-url'
import { sendAdminUpdateAlert, sendVerificationRequestEmail } from "../../utils/mail.js"




export const getProfile = async (req, res) => {
    try {
        const { userId } = verifyHeaders(req)

        // Fetch user profile
        const userRes = await pool.query(
            `SELECT *, date_part('year', age(date_of_birth))::int AS age FROM users WHERE id = $1`,
            [userId]
        )

        if (userRes.rowCount === 0) {
            return errorMsg(res, 404, 'User not found')
        }

        const user = userRes.rows[0]

        // Fetch listing + images
        const listingRes = await pool.query(`
            SELECT 
                ul.*,
                ARRAY_AGG(uli.image_url) FILTER (WHERE uli.image_url IS NOT NULL) AS listing_images
            FROM user_listings ul
            LEFT JOIN user_listing_images uli 
                ON uli.user_listing_id = ul.id
            WHERE ul.user_id = $1
            GROUP BY ul.id
        `, [userId])

        const listing = listingRes.rows.length > 0 ? listingRes.rows[0] : null

        return res.status(200).json({
            success: true,
            user,
            listing
        })

    } catch (error) {
        console.error(error)
        return errorMsg(res, error.status || 500, error.message || 'An error occurred fetching profile')
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { userId } = verifyHeaders(req)

        const blockedCheck = await pool.query(
            `SELECT is_blocked FROM users WHERE id = $1`,
            [userId]
        )
        if (blockedCheck.rows[0]?.is_blocked) {
            return errorMsg(res, 403, 'Your account has been suspended. You cannot update your profile.')
        }

        console.log(req.body, '-------req_body')
        console.log(req.files, '-------req_files')

        const {
            full_name,
            nationality,
            university_name,
            date_of_birth,
            gender,
            program,
            year_of_study,
            phone_number,
            move_in_date,
            min,
            max,
            max_housemates,
            is_smoker,
            dont_mind_smoker,
            has_pet,
            dont_mind_pets,
            private_room,
            furnished,
            is_profile_public,
            sleep_schedule,
            cleanliness,
            social_habits,
            preferred_locations,
            about_me,
            lease_duration,
            urgency,
            has_house
        } = req.body

        // Helper: FormData sends null as the string 'null' — convert back to real null
        const parseBoolOrNull = (val) => {
            if (val === 'true') return true
            if (val === 'false') return false
            return null
        }

        if (
            !full_name ||
            !nationality ||
            !university_name ||
            !date_of_birth ||
            !gender ||
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
            return errorMsg(res, 400, "Please enter all fieldssss")
        }

        const dob = new Date(date_of_birth)
        const now = new Date()
        if (isNaN(dob.getTime())) {
            return errorMsg(res, 400, 'Please enter a valid date of birth')
        }
        if (dob > now) {
            return errorMsg(res, 400, 'Date of birth cannot be in the future')
        }
        const age_years = (now - dob) / (1000 * 60 * 60 * 24 * 365.25)
        if (age_years < 16) {
            return errorMsg(res, 400, 'You must be at least 16 years old to use WiyoRent')
        }

        if(!req.body.avatar && !req.files.avatar){
            return errorMsg(res, 400, "Please enter a valid profile picture")
        }

        const preferred_locations_array = preferred_locations.split(',').map(item => item.trim())

        

        // ------ Update basic user info ------
        const query = `
            UPDATE users
            SET
                full_name = $1,
                nationality = $2,
                university_name = $3,
                date_of_birth = $4,
                gender = $5,
                program = $6,
                year_of_study = $7,
                phone_number = $8,
                move_in_date = $9,
                min = $10,
                max = $11,
                max_housemates = $12,
                is_smoker = $13,
                dont_mind_smoker = $14,
                has_pet = $15,
                dont_mind_pets = $16,
                is_private_room_required = $17,
                is_furnished_preferred = $18,
                is_profile_public = $19,
                sleep_schedule = $20,
                cleanliness = $21,
                social_habits = $22,
                preferred_locations = $23,
                about_me = $24,
                lease_duration = $25,
                urgency = $26,
                has_house = $27,
                updated_at = NOW()
            WHERE id = $28
            RETURNING *
        `

        const values = [
            full_name,
            nationality,
            university_name,
            date_of_birth,
            gender,
            program,
            year_of_study,
            phone_number,
            move_in_date,
            min,
            max,
            max_housemates,
            parseBoolOrNull(is_smoker),
            parseBoolOrNull(dont_mind_smoker),
            parseBoolOrNull(has_pet),
            parseBoolOrNull(dont_mind_pets),
            parseBoolOrNull(private_room),
            parseBoolOrNull(furnished),
            parseBoolOrNull(is_profile_public),
            sleep_schedule,
            cleanliness,
            social_habits,
            preferred_locations_array,
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

        const existingAvatar = user?.avatar_url

        // ------ Handle document/avatar uploads ------
        if (req.files?.avatar || req.files?.admission_letter || req.files?.passport_id) {
            let avatar_url = req.body.avatar
            let admission_letter_url = req.body.admission_letter
            let passport_id_url = req.body.passport_id

            if (req.files.avatar) {
                const upload = await uploadToCloudinary(req.files.avatar[0].buffer, `users/${userId}/profile`)
                avatar_url = upload.secure_url
            }

            if (req.files.admission_letter) {
                const upload = await uploadToCloudinary(req.files.admission_letter[0].buffer, `users/${userId}/documents`)
                admission_letter_url = upload.secure_url
            }

            if (req.files.passport_id) {
                const upload = await uploadToCloudinary(req.files.passport_id[0].buffer, `users/${userId}/documents`)
                passport_id_url = upload.secure_url
            }

            if(existingAvatar !== avatar_url){
                const publicId = extractPublicId(existingAvatar)
                await cloudinary.api.delete_resources([publicId])
            }

            const uploadResult = await pool.query(`
                UPDATE users
                SET avatar_url = $1, admission_letter = $2, passport_id = $3
                WHERE id = $4
            `, [avatar_url, admission_letter_url, passport_id_url, userId])

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

            await create_user_listing(req.body, listingImages, userId)
        }

        // ------ Onboarding flag ------
        if (!user.is_onboarded) {
            await pool.query(`
                UPDATE users SET 
                    is_onboarded = true, 
                    updated_at = NOW(),
                    verification_status = 'pending'
                WHERE id = $1
            `, [user.id])
            await sendVerificationRequestEmail(user.full_name, user.id, user.email)
            return successMsg(res, 200, 'Onboarding details saved. We are currently verifying your account.');
        }

        await pool.query(`
            UPDATE users SET has_performed_an_update = true WHERE id = $1
        `, [user.id]);

        await sendAdminUpdateAlert(user.full_name, user.id)

        return successMsg(res, 200, 'Your profile has been successfully updated.')

    } catch (error) {
        console.error(error)
        return errorMsg(res, error.status || 500, error.message || 'An error occurred on profile update')
    }
}


const create_user_listing = async (body, listing_images, userId) => {
    const {
        listing_price,
        listing_caution_fee,
        listing_bedrooms,
        listing_bathrooms,
        listing_is_furnished,
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
        const amenities_array = listing_amenities.split(',').map(item => item.trim())
        const house_rules_array = listing_house_rules.split(',').map(item => item.trim())

        // ------ Upsert listing row ------
        const listingResult = await pool.query(`
            INSERT INTO user_listings (
                user_id, 
                price, 
                caution_fee, 
                bedrooms, 
                bathrooms, 
                is_furnished,
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
            ON CONFLICT (user_id) DO UPDATE SET
            price = EXCLUDED.price,
            caution_fee = EXCLUDED.caution_fee,
            bedrooms = EXCLUDED.bedrooms,
            bathrooms = EXCLUDED.bathrooms,
            is_furnished = EXCLUDED.is_furnished,
            landlord_name = EXCLUDED.landlord_name,
            landlord_number = EXCLUDED.landlord_number,
            description = EXCLUDED.description,
            neighborhood = EXCLUDED.neighborhood,
            city = EXCLUDED.city,
            available_from = EXCLUDED.available_from,
            housemate_gender = EXCLUDED.housemate_gender,
            amenities = EXCLUDED.amenities,
            house_rules = EXCLUDED.house_rules,
            updated_at = NOW()
            RETURNING *
        `, [
            userId,
            listing_price,
            listing_caution_fee,
            listing_bedrooms,
            listing_bathrooms,
            listing_is_furnished === 'true',   // FormData sends booleans as strings
            listing_landlord_name,
            listing_landlord_number,
            listing_description,
            listing_neighborhood,
            listing_city,
            listing_available_from,
            listing_housemate_gender,
            amenities_array,
            house_rules_array
        ])

        if (listingResult.rowCount == 0) {
            throwError(400, "Couldn't save user listing")
        }

        const userListingId = listingResult.rows[0].id

        // ------ Upload new images to Cloudinary ------
        const imageUrls = []
        for (const image of listing_images) {
            if (typeof image === 'string') {
                imageUrls.push(image)
            } else {
                const upload = await uploadToCloudinary(image.buffer, `users/${userId}/user_listings`)
                imageUrls.push(upload.secure_url)
            }
        }

        // ------ Sync images ------
        const existingRes = await pool.query(`
            SELECT image_url FROM user_listing_images WHERE user_listing_id = $1
        `, [userListingId])

        const existingUrls = existingRes.rows.map(row => row.image_url)
        const urlsToRemove = existingUrls.filter(url => !imageUrls.includes(url))
        const urlsToAdd = imageUrls.filter(url => !existingUrls.includes(url))

        if (urlsToRemove.length > 0) {
            await pool.query(`
                DELETE FROM user_listing_images
                WHERE user_listing_id = $1 AND image_url = ANY($2)
            `, [userListingId, urlsToRemove])

            const publicIds = urlsToRemove.map(url => {
                return extractPublicId(url)
            })

            console.log(publicIds, '---publicIds to delete')

            await cloudinary.api.delete_resources(publicIds)
        }

        for (const url of urlsToAdd) {
            await pool.query(`
                INSERT INTO user_listing_images (user_id, user_listing_id, image_url)
                VALUES ($1, $2, $3)
            `, [userId, userListingId, url])
        }

        console.log(`Listing synced — ${urlsToAdd.length} images added, ${urlsToRemove.length} removed`)

    } catch (error) {
        console.error(error, 'Error in create_user_listing')
        throwError(error.status || 500, error.message || 'Error occurred saving listing')
    }
}
