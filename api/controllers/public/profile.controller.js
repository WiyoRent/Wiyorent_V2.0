import { errorMsg, successMsg } from "../../utils/returnMsg.js"
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
            `SELECT 
                *, 
                TO_CHAR(
                    CASE 
                        WHEN move_in_date <= CURRENT_DATE THEN CURRENT_DATE
                        ELSE move_in_date
                    END, 'YYYY-MM-DD'
                ) AS move_in_date,
                TO_CHAR(date_of_birth, 'YYYY-MM-DD'),
                date_part('year', age(date_of_birth))::int AS age 
            FROM users WHERE id = $1
                `,
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
                TO_CHAR(
                CASE 
                    WHEN available_from <= CURRENT_DATE THEN CURRENT_DATE
                    ELSE available_from
                END, 'YYYY-MM-DD') as available_from,
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
        console.error('Error occurred on getProfile:', error)
        if (error.status && error.status < 500) {
            return errorMsg(res, error.status, error.message)
        }
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { userId } = verifyHeaders(req)

        console.log('[updateProfile] entry — userId:', userId, 'body keys:', Object.keys(req.body))

        const blockedCheck = await pool.query(
            `SELECT is_blocked FROM users WHERE id = $1`,
            [userId]
        )
        if (blockedCheck.rows[0]?.is_blocked) {
            return errorMsg(res, 403, 'Your account has been suspended. You cannot update your profile.')
        }

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

        const isEmpty = (val) => 
          val === null || 
          val === undefined || 
          val === 'null' || 
          val === '' || 
          (typeof val === 'string' && val.trim() === '')

        const fields = {
            full_name, nationality, university_name, date_of_birth,
            gender, program, year_of_study, phone_number, move_in_date,
            min, max, max_housemates, sleep_schedule, cleanliness,
            social_habits, preferred_locations, about_me, lease_duration, urgency
        }

        const missing = Object.entries(fields)
        .filter(([_, v]) => isEmpty(v))
        .map(([k]) => k)


        if (missing.length > 0) {
            return errorMsg(res, 400, `Missing fields: ${missing.join(', ')}`)
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
            return errorMsg(res, 400, 'You must be at least 16 years old to complete onboarding')
        }

        if(!req.body.avatar){
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

        console.log('[updateProfile] writing user row — userId:', userId, 'full_name:', full_name, 'has_house:', has_house)
        const result = await pool.query(query, values)
        console.log('[updateProfile] user row written — rowCount:', result.rowCount)

        if (result.rowCount == 0) {
            return errorMsg(res, 404, "Couldn't find account")
        }

        const user = result.rows[0]

        const existingAvatar = user?.avatar_url

        // ------ Handle document/avatar updates  ------
        const avatar_url = req.body.avatar
        const raw_admission = req.body.admission_letter
        const raw_passport  = req.body.passport_id

        // Onboarded + not rejected → ignore incoming docs
        const docs_locked = user.is_onboarded && user.verification_status !== 'rejected'

        const admission_letter_url = docs_locked
            ? (user.admission_letter ?? null)
            : (raw_admission && raw_admission !== 'null') ? raw_admission : (user.admission_letter ?? null)

        const passport_id_url = docs_locked
            ? (user.passport_id ?? null)
            : (raw_passport && raw_passport !== 'null') ? raw_passport : (user.passport_id ?? null)

        if (!user.is_onboarded) {
            if (!admission_letter_url) {
                return errorMsg(res, 400, 'Admission letter is required to complete onboarding')
            }
            if (!passport_id_url) {
                return errorMsg(res, 400, 'Passport or national ID is required to complete onboarding')
            }
        }

        if (existingAvatar && existingAvatar !== avatar_url) {
            const publicId = extractPublicId(existingAvatar)
            console.log('[updateProfile] deleting old avatar — publicId:', publicId)
            await cloudinary.uploader.destroy(publicId)
            console.log('[updateProfile] old avatar deleted — publicId:', publicId)
        }

        console.log('[updateProfile] writing documents row — userId:', userId, 'avatar_url set:', !!avatar_url, 'admission_letter set:', !!admission_letter_url, 'passport_id set:', !!passport_id_url)
        const uploadResult = await pool.query(`
            UPDATE users
            SET avatar_url = $1, admission_letter = $2, passport_id = $3
            WHERE id = $4
        `, [avatar_url, admission_letter_url, passport_id_url, userId])
        console.log('[updateProfile] documents row written — rowCount:', uploadResult.rowCount)

        if (uploadResult.rowCount == 0) {
            return errorMsg(res, 404, "Couldn't update your documents")
        }

        // ------ Handle listing creation/update ------
        if (has_house === 'true') {
            const listingImages = req.body.listing_images_existing
                ? Array.isArray(req.body.listing_images_existing)
                    ? req.body.listing_images_existing
                    : [req.body.listing_images_existing]
                : []

            console.log('[updateProfile] calling create_user_listing — imageCount:', listingImages.length)
            await create_user_listing(req.body, listingImages, userId)
            console.log('[updateProfile] create_user_listing done')
        }

        // ------ Onboarding flag ------
        if (!user.is_onboarded) {
            console.log('[updateProfile] first onboarding — setting is_onboarded=true for userId:', user.id)
            await pool.query(`
                UPDATE users SET
                    is_onboarded = true,
                    updated_at = NOW(),
                    verification_status = 'pending'
                WHERE id = $1
            `, [user.id])
            console.log('[updateProfile] onboarding flag set')
            try {
                console.log('[updateProfile] sending verification request email — userId:', user.id)
                await sendVerificationRequestEmail(user.full_name, user.id, user.email)
                console.log('[updateProfile] verification request email sent')
            } catch (emailErr) {
                console.error('[updateProfile] sendVerificationRequestEmail failed:', emailErr.message, emailErr.stack)
            }
            return successMsg(res, 200, 'Onboarding details saved. We are currently verifying your account.');
        }

        console.log('[updateProfile] profile update — setting has_performed_an_update=true for userId:', user.id)
        await pool.query(`
            UPDATE users SET has_performed_an_update = true WHERE id = $1
        `, [user.id]);

        try {
            console.log('[updateProfile] sending admin update alert — userId:', user.id)
            await sendAdminUpdateAlert(user.full_name, user.id)
            console.log('[updateProfile] admin update alert sent')
        } catch (emailErr) {
            console.error('[updateProfile] sendAdminUpdateAlert failed:', emailErr.message, emailErr.stack)
        }

        return successMsg(res, 200, 'Your profile has been successfully updated.')

    } catch (error) {
        console.error('[updateProfile] unhandled error:', error.message, error.stack)
        if (error.status && error.status < 500) {
            return errorMsg(res, error.status, error.message)
        }
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
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

    const isEmpty = (val) =>
        val === null ||
        val === undefined ||
        val === 'null' ||
        val === '' ||
        (typeof val === 'string' && val.trim() === '')

    const requiredFields = {
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
    }

    const missingFields = Object.entries(requiredFields)
        .filter(([_, v]) => isEmpty(v))
        .map(([k]) => k)

    if (missingFields.length > 0) {
        throwError(400, `Missing listing fields: ${missingFields.join(', ')}`)
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
        console.log('[updateProfile] create_user_listing — upserting listing for userId:', userId, 'neighborhood:', listing_neighborhood, 'price:', listing_price)
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

        console.log('[updateProfile] create_user_listing — listing upserted, rowCount:', listingResult.rowCount)
        if (listingResult.rowCount == 0) {
            throwError(400, "Couldn't save user listing")
        }

        const userListingId = listingResult.rows[0].id

        const imageUrls = listing_images

        // ------ Sync images ------
        console.log('[updateProfile] create_user_listing — syncing images, userListingId:', userListingId, 'incoming count:', imageUrls.length)
        const existingRes = await pool.query(`
            SELECT image_url FROM user_listing_images WHERE user_listing_id = $1
        `, [userListingId])

        const existingUrls = existingRes.rows.map(row => row.image_url)
        const urlsToRemove = existingUrls.filter(url => !imageUrls.includes(url))
        const urlsToAdd = imageUrls.filter(url => !existingUrls.includes(url))

        console.log('[updateProfile] create_user_listing — toRemove:', urlsToRemove.length, 'toAdd:', urlsToAdd.length)

        if (urlsToRemove.length > 0) {
            console.log('[updateProfile] create_user_listing — deleting image rows from DB, count:', urlsToRemove.length)
            await pool.query(`
                DELETE FROM user_listing_images
                WHERE user_listing_id = $1 AND image_url = ANY($2)
            `, [userListingId, urlsToRemove])
            console.log('[updateProfile] create_user_listing — image rows deleted')

            const publicIds = urlsToRemove.map(url => extractPublicId(url))

            console.log('[updateProfile] create_user_listing — deleting from Cloudinary, publicIds:', publicIds)
            await Promise.all(publicIds.map(id => cloudinary.uploader.destroy(id)))
            console.log('[updateProfile] create_user_listing — Cloudinary deletes done')
        }

        for (const url of urlsToAdd) {
            console.log('[updateProfile] create_user_listing — inserting image row, userListingId:', userListingId)
            await pool.query(`
                INSERT INTO user_listing_images (user_id, user_listing_id, image_url)
                VALUES ($1, $2, $3)
            `, [userId, userListingId, url])
        }

        console.log('[updateProfile] create_user_listing — sync complete, added:', urlsToAdd.length, 'removed:', urlsToRemove.length)

    } catch (error) {
        console.error('[updateProfile] create_user_listing error:', error.message, error.stack)
        throwError(error.status || 500, error.message || 'Error occurred saving listing')
    }
}
