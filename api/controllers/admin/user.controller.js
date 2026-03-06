import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import formatDate from "../../utils/formatDate.js"
import {v2 as cloudinary} from 'cloudinary'
import { sendApprovalEmail, sendRejectionEmail, sendBlockedEmail, sendUnblockedEmail } from "../../utils/mail.js"

export const fetchUsers = async  (req,res) => {

    try {

        // {
        //     user_id: 'usr_5503',
        //     full_name: 'Aline Uwera',
        //     email: 'aline.u@student.ac.rw',
        //     avatar_url: null,
        //     role: 'Student',
        //     account_status: 'Active',
        //     verification_status: 'approved',
        //     is_blocked: false,
        //     is_blocked_reason: null,
        //     admin_note: null,
        //     has_performed_an_update: true,   // updated profile after approval
        //     registration_date: '2023-09-15',
        //   },
        
        const result = await pool.query(`
            SELECT 
                u.id,
                u.full_name,
                u.email,
                u.avatar_url,
                u.role,
                u.verification_status,
                u.is_blocked,
                u.has_performed_an_update,
                u.created_at
            FROM users u
            ORDER BY has_performed_an_update DESC, u.updated_at DESC
        `)


        if(result.rowCount === 0){
            return successMsg(res , 200, 'No users found', [])
        }

        const users = result.rows

        

        const allUsers = users.map(user => ({
            user_id: user.id,
            full_name: user.full_name,
            email: user.email,
            avatar_url: user.avatar_url || null,
            account_status: 'Active',
            verification_status: user.verification_status || 'pending',
            is_blocked: user.is_blocked,
            has_performed_an_update: user.has_performed_an_update,   // updated profile after approval
            registration_date: formatDate(user.created_at),
        }))

        console.log(users, '-----users')

        return successMsg(res,200,'',allUsers)

    } catch (error) {
        console.error(error, 'error on fetch users')
        return errorMsg(res,500, 'A server error occured, Could not fetch users')
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
                gender:        user.gender,
                age:           user.age,
                year_of_study: user.year_of_study,
                program : user.program
            },

            housing_preferences: {
                move_in_date:           formatDate(user.move_in_date),
                budget:                 { min: user.min, max: user.max },
                max_housemates:         user.max_housemates,
                preferred_locations:    user.preferred_locations,
                is_furnished_preferred: user.is_furnished_preferred,
                allows_pets:            user.allows_pets,
                is_smoker:              user.is_smoker,
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
        console.error(error, '---An error occured on fetch user')
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
        console.error(error);
        return errorMsg(res, 500, error.message || 'An internal server error occurred');
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        const folderPath = `users/${userId}`

        await cloudinary.api.delete_resources_by_prefix(`${folderPath}`)
        await cloudinary.api.delete_folder(folderPath)

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
        console.error('error on delete user')
        return errorMsg(res, error.status || 500, error.message || "Internal Server Error")
    }
}
