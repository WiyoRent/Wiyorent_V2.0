import pool from "../../config/db.js";
import { errorMsg, successMsg } from "../../utils/returnMsg.js";
import { verifyHeaders } from "../../utils/verifyHeaders.js";


export const fetchHousemates = async (req, res) => {
    //  {
    //     profile_id: 'hm_7721',
    //     full_name: 'Keza A.',
    //     nationality: 'Rwandan',
    //     university_name: 'University of Rwanda',
    //     bio_short: 'Loves football and clean spaces. Studying computer science and looking for a focused, chill roommate.',
    //     budget: { min: 100000, max: 150000 },
    //     preferred_locations: ['Kicukiro', 'Remera'],
    //     avatar_url: null,
    //     gender: 'female',
    //     is_verified: true,
    //   }
    const { clientKey, userId } = verifyHeaders(req)
    if (!clientKey || clientKey !== process.env.INTERNAL_BACKEND_KEY) {
        console.error('No client')
        return errorMsg(res, 403, 'Unauthorized access')
    }
    if (!userId) {
        return errorMsg(res, 401, 'Unauthentificated access. Login required')
    }
    const { allow_pets, max, min, cleanliness, gender, has_a_house, smoker, max_housemates, move_in_date, preferred_locations, sleep_schedule, social_habit, university, dont_mind_pets, dont_mind_smoker, has_pet, private_room, urgency } = req.query
    console.log(req.query, '---fetchhousemate query')
    try {
        let query = `
            SELECT
                u.id as profile_id,
                u.full_name,
                u.nationality,
                u.university_name,
                u.about_me as bio_short,
                u.min,
                u.max,
                u.preferred_locations,
                u.avatar_url,
                u.gender,
                u.verification_status,
                u.has_house,
                u.urgency,
                (sh.id is not null) as saved,
                ul.price AS listing_price,
                ul.neighborhood AS listing_neighborhood,
                uli.image_url AS listing_thumbnail
            FROM users u
            LEFT JOIN saved_housemates sh
                ON u.id = sh.housemate_id
                AND sh.user_id = $1
            LEFT JOIN user_listings ul ON u.id = ul.user_id
            LEFT JOIN LATERAL (
                SELECT image_url FROM user_listing_images WHERE user_id = u.id LIMIT 1
            ) uli ON true
            WHERE u.id != $1
                AND u.is_profile_public = true
                AND u.is_onboarded = true
                AND u.is_blocked = false
                AND u.verification_status != 'rejected'
        `
        const values = [userId]
        let paramIndex = 2

        if (allow_pets) {
            allow_pets === 'true' ? query += ` AND has_pet = true` : query += ` AND has_pet = false`
        }
        if (max) {
            query += ` AND max <= $${paramIndex++}`
            values.push(max)
        }
        if (min) {
            query += ` AND min >= $${paramIndex++}`
            values.push(min)
        }
        if (cleanliness) {
            query += ` AND cleanliness = $${paramIndex++}`
            values.push(cleanliness)
        }
        if (gender && gender !== 'any') {
            query += ` AND gender = $${paramIndex++}`
            values.push(gender)
        }
        if (has_a_house) {
            has_a_house === 'true' ? query += ` AND has_house = true` : query += ` AND has_house = false`
        }
        if (smoker) {
            smoker === 'true' ? query += ` AND is_smoker = true` : query += ` AND is_smoker = false`
        }
        if (max_housemates) {
            if (max_housemates === '4+') {
                query += ` AND max_housemates >= 4`
            } else {
                query += ` AND max_housemates = $${paramIndex++}`
                values.push(max_housemates)
            }
        }
        if (move_in_date) {
            query += ` AND move_in_date::date >= $${paramIndex++}`
            values.push(move_in_date)
        }
        if (preferred_locations) {
            const location_list = preferred_locations.split(',')
            query += ` AND preferred_locations && $${paramIndex++}::text[]`
            values.push(location_list)
        }
        if (sleep_schedule) {
            query += ` AND sleep_schedule = $${paramIndex++}`
            values.push(sleep_schedule)
        }
        if (social_habit) {
            query += ` AND social_habits = $${paramIndex++}`
            values.push(social_habit)
        }
        if (university) {
            query += ` AND university_name = $${paramIndex++}`
            values.push(university)
        }
        if (dont_mind_pets) {
            dont_mind_pets === 'true' ? query += ` AND dont_mind_pets = true` : query += ` AND dont_mind_pets = false`
        }
        if (dont_mind_smoker) {
            dont_mind_smoker === 'true' ? query += ` AND dont_mind_smoker = true` : query += ` AND dont_mind_smoker = false`
        }
        if (has_pet) {
            has_pet === 'true' ? query += ` AND has_pet = true` : query += ` AND has_pet = false`
        }
        if (private_room) {
            if (private_room !== 'either') {
                private_room === 'true' ? query += ` AND is_private_room_required = true` : query += ` AND is_private_room_required = false`
            }
        }
        if (urgency) {
            query += ` AND u.urgency = $${paramIndex++}`
            values.push(urgency)
        }

        const [result, metaResult] = await Promise.all([
            pool.query(query, values),
            pool.query(`
                SELECT
                    MIN("min") AS budget_min,
                    MAX("max") AS budget_max,
                    ARRAY_AGG(DISTINCT university_name ORDER BY university_name)
                        FILTER (WHERE university_name IS NOT NULL AND university_name != '') AS universities,
                    ARRAY(
                        SELECT DISTINCT UNNEST(preferred_locations)
                        FROM users
                        WHERE is_profile_public = true
                            AND is_onboarded = true
                            AND is_blocked = false
                            AND verification_status != 'rejected'
                        ORDER BY 1
                    ) AS locations
                FROM users
                WHERE is_profile_public = true
                    AND is_onboarded = true
                    AND is_blocked = false
                    AND verification_status != 'rejected'
            `)
        ])

        const meta = metaResult.rows[0]
        const filter_meta = {
            budget_min: Number(meta.budget_min) || 50000,
            budget_max: Number(meta.budget_max) || 300000,
            universities: meta.universities ?? [],
            locations: meta.locations ?? [],
        }

        const housemates = result.rows.map(user => ({
            profile_id: user.profile_id,
            full_name: user.full_name,
            nationality: user.nationality,
            university_name: user.university_name,
            bio_short: user.bio_short,
            budget: { min: user.min, max: user.max },
            preferred_locations: user.preferred_locations || [],
            avatar_url: user.avatar_url || null,
            gender: user.gender,
            verification_status: user.verification_status,
            has_house: user.has_house ?? false,
            urgency: user.urgency ?? null,
            listing_snapshot: (user.has_house && user.listing_price) ? {
                price: user.listing_price,
                neighborhood: user.listing_neighborhood,
                thumbnail: user.listing_thumbnail,
            } : null,
            saved: user.saved
        }))

        console.log(housemates, '--housemates from fetchHousemates')
        return successMsg(res, 200, housemates.length === 0 ? 'No housemates found' : '', { housemates, filter_meta })
    } catch (error) {
        console.error(error, 'error on fetch housemates')
        return errorMsg(res, 500, 'A server error occured, Could not fetch housemates')
    }
}

export const fetchHousemate = async (req,res) => {

    try { 
        const housemateId = req.params.id
        verifyHeaders(req,res)

        const result = await pool.query(
            `
                SELECT
                u.*,
                date_part('year', age(u.date_of_birth))::int AS age,
                (sh.id is not null) as saved,
                ul.price,
                ul.caution_fee, 
                ul.bedrooms, 
                ul.bathrooms, 
                ul.is_furnished,
                ul.landlord_name, 
                ul.landlord_number, 
                ul.description, 
                ul.neighborhood,
                ul.city, 
                ul.available_from, 
                ul.housemate_gender, 
                ul.amenities, 
                ul.house_rules,
                ARRAY_AGG(uli.image_url) as  image_urls
            FROM users u
            LEFT JOIN saved_housemates sh
                ON u.id = sh.housemate_id
            LEFT JOIN user_listings ul
            ON u.id = ul.user_id
            LEFT JOIN user_listing_images uli
            ON u.id = uli.user_id
            WHERE u.id = $1 and u.is_profile_public = true
            GROUP BY u.id, sh.id, ul.id
            `, [housemateId])
        
        if(result.rowCount == 0){
            return successMsg(res, 404, "No housemate found", [])
        }

        const housemate = result.rows[0]

        console.log(housemate,  '--housemate from fetch single housemate')

        return successMsg(res,200,"Housemate fetched successfully", housemate)
        
    } catch (error) { 
        console.error(error, 'error on fetch housemate')
        return errorMsg(res, error.status || 500, error.message)
    }
}

export const fetchHousemateContactDetail = async (req,res) => {
    try {
        const housemateId = req.params.id

        const {clientKey,userId} = verifyHeaders(req)

        const result = await pool.query(`
            SELECT
                preferred_method,
                phone_number,
                email
            FROM users
            WHERE id = $1
              AND is_profile_public = true
              AND is_onboarded = true
              AND is_blocked = false
              AND verification_status != 'rejected'
        `, [housemateId])

        if(result.rowCount == 0){
            return errorMsg(res, 404, "Couldn't get housemate contact details")
        }

        const contactDetails = result.rows

        console.log(contactDetails, '----contact details')

        return successMsg(res, 200, 'Contact Details fetched successfully', contactDetails)
    } catch (error) {
        console.error(error,'Error on fetch housemate contact details')
        errorMsg(res, error.status || 500, error.message || 'An error occured')
    }
    


}

export const saveHousemate = async (req,res) => {

    console.log(req.body, '---received body from save housemate')

    try {
        const {userId} = verifyHeaders(req)

        const {housemateId, isSaved} = req.body

        console.log(userId, '--userId')

        if(isSaved){
            await pool.query(`
                INSERT INTO saved_housemates(
                    user_id,
                    housemate_id
                )VALUES ($1,$2)
                RETURNING *
            `, [userId,housemateId])
        }else{
            await pool.query(`
                DELETE FROM saved_housemates
                WHERE user_id = $1 AND housemate_id = $2
            `, [userId, housemateId])
        }

        return successMsg(res, 200, 'Listing succesffuly saved', [])
    } catch (error) {
        console.error(error)
        return errorMsg(res, error.status || 500, error.message || 'Internal Server error')
    }
    
}

export const fetchSavedHousemates = async (req,res) => {
    try {
        const rawUserId = req.headers['x-user-id']
        const clientKey = req.headers['x-internal-api-key']

        if(clientKey !== process.env.INTERNAL_BACKEND_KEY){
            return errorMsg(res, 403, "Not authorized")
        }

        const userId = rawUserId && rawUserId !== 'null' ? rawUserId : null

        const result = await pool.query(`
            SELECT 
                u.id as profile_id,
                u.full_name,
                u.nationality,
                u.university_name,
                u.about_me as bio_short,
                u.min,
                u.max,
                u.preferred_locations,
                u.avatar_url,
                u.gender,
                u.verification_status,
                true as saved
            FROM users u
            iNNER JOIN saved_housemates sh
                ON u.id = sh.housemate_id
            WHERE sh.user_id = $1  and u.is_profile_public = true
            ORDER BY sh.saved_at DESC;
        `, [userId])

        const housemates = result.rows

        const saved_housemates = housemates.map((housemate,_) => ({
            profile_id: housemate.profile_id,
            full_name: housemate.full_name,
            nationality: housemate.nationality,
            university_name: housemate.university_name,
            bio_short: housemate.bio_short,
            budget: {
                min: housemate.min,
                max: housemate.max
            },
            preferred_locations: housemate.preferred_locations || [],
            avatar_url: housemate.avatar_url || null,
            gender: housemate.gender,
            verification_status: housemate.verification_status,
            saved : housemate.saved
        }))

        console.log(saved_housemates, '--saved housemates from fetchHousemates')

        return successMsg(res,200,'',saved_housemates)
        
    } catch (error) {
        console.error(error, 'error on favourite listing page listings')
    }
}