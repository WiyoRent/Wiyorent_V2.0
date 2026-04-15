import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import formatDate from "../../utils/formatDate.js"
import {v2 as cloudinary} from 'cloudinary'
import { sendApprovalEmail, sendRejectionEmail, sendBlockedEmail, sendUnblockedEmail } from "../../utils/mail.js"

export const fetchUsers = async (req, res) => {
    try {
        const { verification_status, is_blocked, gender, university_name, has_house, is_onboarded, sort, urgency, budget_min, budget_max, preferred_location } = req.query

        let query = `
            SELECT
                u.id,
                u.full_name,
                u.email,
                u.avatar_url,
                u.role,
                u.verification_status,
                u.is_blocked,
                u.has_performed_an_update,
                u.created_at,
                u.view_count,
                (select count(*) from saved_housemates sh WHERE u.id = sh.housemate_id ) as number_of_saves
            FROM users u
            WHERE 1=1
        `
        const values = []
        let i = 1

        if (verification_status) {
            query += ` AND u.verification_status = $${i++}`
            values.push(verification_status)
        }
        if (is_blocked !== undefined && is_blocked !== '') {
            query += ` AND u.is_blocked = $${i++}`
            values.push(is_blocked === 'true')
        }
        if (gender) {
            query += ` AND u.gender = $${i++}`
            values.push(gender)
        }
        if (university_name) {
            query += ` AND u.university_name ILIKE $${i++}`
            values.push(`%${university_name}%`)
        }
        if (has_house !== undefined && has_house !== '') {
            query += ` AND u.has_house = $${i++}`
            values.push(has_house === 'true')
        }
        if (is_onboarded !== undefined && is_onboarded !== '') {
            query += ` AND u.is_onboarded = $${i++}`
            values.push(is_onboarded === 'true')
        }
        if (urgency) {
            query += ` AND u.urgency = $${i++}`
            values.push(urgency)
        }
        if (budget_min) {
            query += ` AND u.min >= $${i++}`
            values.push(Number(budget_min))
        }
        if (budget_max) {
            query += ` AND u.max <= $${i++}`
            values.push(Number(budget_max))
        }
        if (preferred_location) {
            query += ` AND $${i++} = ANY(u.preferred_locations)`
            values.push(preferred_location)
        }

        query += sort === 'oldest' ? ` ORDER BY u.created_at ASC` : ` ORDER BY u.created_at DESC`

        const [result, metaResult] = await Promise.all([
            pool.query(query, values),
            pool.query(`
                SELECT
                    MIN(u.min) AS budget_min,
                    MAX(u.max) AS budget_max,
                    ARRAY_AGG(DISTINCT u.university_name ORDER BY u.university_name)
                        FILTER (WHERE u.university_name IS NOT NULL AND u.university_name != '') AS universities,
                    ARRAY_AGG(DISTINCT loc ORDER BY loc)
                        FILTER (WHERE loc IS NOT NULL AND loc != '') AS locations
                FROM users u
                LEFT JOIN LATERAL UNNEST(u.preferred_locations) AS loc ON true
            `)
        ])

        const filter_meta = metaResult.rows[0] ?? null

        const users = result.rows.map(user => ({
            user_id: user.id,
            full_name: user.full_name,
            email: user.email,
            avatar_url: user.avatar_url || null,
            account_status: 'Active',
            verification_status: user.verification_status || 'pending',
            is_blocked: user.is_blocked,
            has_performed_an_update: user.has_performed_an_update,
            registration_date: formatDate(user.created_at),
            view_count: user.view_count || 0,
            number_of_saves : parseInt(user.number_of_saves) || 0
        }))

        console.log(users, '-----users')

        return successMsg(res, 200, '', { users, filter_meta })

    } catch (error) {
        console.error('Error occurred on fetchUsers:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const fetchSingleUser = async (req,res) => {
    try {
        const {id} = req.params

        const result = await pool.query(
            `
                SELECT
                    u.id AS user_real_id,
                    u.*,
                    date_part('year', age(u.date_of_birth))::int AS age,
                    ul.* ,
                    ARRAY_AGG(uli.image_url) as image_urls
                FROM users u
                LEFT JOIN user_listings ul
                    ON u.id = ul.user_id
                LEFT JOIN user_listing_images uli
                    ON ul.id = uli.user_listing_id
                WHERE u.id = $1
                GROUP BY u.id, ul.id
            `, [id]);

        if(result.rowCount == 0){
            successMsg(res, 200, 'No users found', [])
        }

        const user = result.rows[0]

        const user_account_detail = {
          // ── users table ─────────────────────────────────────────────────────────────
            user_id:                 user.user_real_id,
            email:                   user.email,
            full_name:               user.full_name,
            phone_number:            user.phone_number,
            role:                    user.role,
            account_status:          'Pending',
            verification_status:     user.verification_status || 'pending',     // 'pending' | 'approved' | 'rejected'
            is_blocked:              user.is_blocked,
            is_blocked_reason:       user.is_blocked_reason,
            admin_note:              user.admin_note,
            has_performed_an_update: user.has_performed_an_update,
            registration_date:       formatDate(user.created_at),  // maps to users.created_at
            has_house:               user.has_house,

            // ── Profile / personal ──────────────────────────────────────────────────────
            nationality:     user.nationality,
            university_name: user.university_name,
            avatar_url:      user.avatar_url || null,
            gender:          user.gender,
            about_me:        user.about_me,

            basic_profile: {
                gender:          user.gender,
                age:             user.age,
                year_of_study:   user.year_of_study,
                program:         user.program,
                university_name: user.university_name,
            },

            housing_preferences: {
                move_in_date:        formatDate(user.move_in_date),
                budget:              { min: user.min, max: user.max },
                max_housemates:      user.max_housemates,
                preferred_locations: user.preferred_locations,
                is_smoker:           user.is_smoker,
                dont_mind_smoker:    user.dont_mind_smoker,
                has_pet:             user.has_pet,
                dont_mind_pets:      user.dont_mind_pets,
                private_room:        user.is_private_room_required,
                furnished:           user.is_furnished_preferred,
            },

            lifestyle_personality: {
                sleep_schedule: user.sleep_schedule,
                cleanliness:    user.cleanliness,
                social_habits:  user.social_habits,
            },

            // ── Verification documents — both plain image URLs (users.passport_id / users.admission_letter) ──
            admission_letter:      user.admission_letter,
            passport_id:           user.passport_id,

            // ── user_listings + user_listing_images ─────────────────────────────────────
            listing_price:            user.price,
            listing_caution_fee:      user.caution_fee,
            listing_bedrooms:         user.bedrooms,
            listing_bathrooms:        user.bathrooms,
            listing_is_furnished:     user.is_furnished,
            listing_landlord_name:    user.landlord_name,
            listing_landlord_number:  user.landlord_number,
            listing_description:      user.description,
            listing_neighborhood:     user.neighborhood,
            listing_city:             user.city,
            listing_available_from:   user.available_from,
            listing_user_gender:      user.housemate_gender,
            listing_amenities:        user.amenities,
            listing_house_rules:      user.house_rules,
            listing_images: user.image_urls,
        };

        console.log(user_account_detail, 'user account detail mapped')
        
        return successMsg(res, 200, '', user_account_detail)

    } catch (error) {
        console.error('Error occurred on fetchSingleUser:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const updatedUser = async (req, res) => {
    try {
        const { user_id, admin_note, has_performed_an_update, is_blocked, is_blocked_reason, verification_status } = req.body;

        // 1. Fetch current status before update
        const currentData = await pool.query(
            'SELECT verification_status, is_blocked, email, full_name FROM users WHERE id = $1',
            [user_id]
        );

        if (currentData.rowCount === 0) return errorMsg(res, 404, "User Not Found");

        const { verification_status: oldStatus, is_blocked: wasBlocked, email, full_name } = currentData.rows[0];

        // 2. Perform the update
        await pool.query(`
            UPDATE users
            SET 
                admin_note = $1,
                has_performed_an_update = $2,
                is_blocked = $3,
                is_blocked_reason = $4,
                verification_status = $5,
                updated_at = NOW()
            WHERE id = $6
        `, [admin_note, has_performed_an_update || false, is_blocked, is_blocked_reason, verification_status, user_id]);

        // 3. Send appropriate email based on what changed
        const isNewlyApproved  = ['pending', 'rejected', null].includes(oldStatus) && verification_status === 'approved';
        const isNewlyRejected  = oldStatus !== 'rejected' && verification_status === 'rejected';
        const isNewlyBlocked   = !wasBlocked && is_blocked;
        const isNewlyUnblocked = wasBlocked && !is_blocked;

        if      (isNewlyApproved)   await sendApprovalEmail(email, full_name);
        else if (isNewlyRejected)   await sendRejectionEmail(email, full_name, admin_note);
        else if (isNewlyBlocked)    await sendBlockedEmail(email, full_name, is_blocked_reason);
        else if (isNewlyUnblocked)  await sendUnblockedEmail(email, full_name);

        return successMsg(res, 200, 'User successfully updated');
    } catch (error) {
        console.error('Error occurred on updatedUser:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        const folderPath = `wiyorent/users/${userId}`

        try {
            await cloudinary.api.delete_resources_by_prefix(folderPath)
            await cloudinary.api.delete_folder(folderPath)
        } catch (cloudinaryError) {
            console.error('Cloudinary cleanup failed (continuing with DB delete):', cloudinaryError.message)
        }

        const result = await pool.query(
            `
                DELETE FROM users
                WHERE id = $1
                RETURNING *
            `
        , [userId])

        if(result.rowCount === 0){
            return errorMsg(res ,404,"Couldn't find user")
        }

        return successMsg(res, 200, 'User Deleted Successfully')
    } catch (error) {
        console.error('Error occurred on deleteUser:', error)
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}
