import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js"
import pool from "../../config/db.js"


export const updateProfile  = async (req,res) => {
    try {
        const {id} = req.params

        if(!id){
            return errorMsg(res, 400, "Couldn't get your user ID")
        }

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
            lease_duration
        } = req.body

        console.log(req.body, '------body')   
        console.log(req.files, '------files')        

        if(
            !full_name || 
            !nationality ||
            !university_name ||     
            !age ||
            !gender,
            !program ||
            !year_of_study ||
            !phone_number ||
            !move_in_date ||
            !min||
            !max||
            !max_housemates||
            !is_furnished_preferred||
            !is_private_room_required||
            !allows_pets||
            !is_smoker||
            !sleep_schedule||
            !cleanliness||
            !social_habits||
            !preferred_locations||     
            !about_me ||
            !lease_duration
        ){
            return errorMsg(req, 400, "Please enter all fields")
        }
    
        // Update basic user information
        const query = `
            UPDATE USERS
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
                lease_duration = $22
            WHERE id = $23
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
            id
        ]

        const result = await pool.query(query,values)

        if(result.rowCount == 0){
            return errorMsg(res, 404, "Couldn't find account")
        }

        const user = result.rows[0]

        // ------ Images ---

        // If files have been uplaoded
        if(req.files.avatar || req.files.admission_letter || req.files.passport_id ){
             // Avatar Image Handler
            let avatar_url = null
            let admission_letter_url = null
            let passport_id_url = null

            if(req.files.avatar){
                const {avatar} = req.files
                const avatar_upload = await uploadToCloudinary(avatar[0].buffer, `user-${full_name}/profiles/${full_name}`)
                avatar_url = avatar_upload.secure_url
            }else{
                avatar_url = req.body.avatar
            }

            if(req.files.admission_letter){
                const {admission_letter} = req.files
                const admission_letter_upload = await uploadToCloudinary(admission_letter[0].buffer, `user-${full_name}/admission_letters/${full_name}`)
                admission_letter_url = admission_letter_upload.secure_url
            }else{
                admission_letter_url = req.body.admission_letter
            }

            if(req.files.passport_id){
                const {passport_id} = req.files
                const passport_id_upload = await uploadToCloudinary(passport_id[0].buffer, `legal_documents/${full_name}`)
                passport_id_url = passport_id_upload.secure_url
            }else{
                passport_id_url = req.body.passport_id
            }

            // ---Upload Images---

            const uploadResult = await pool.query(`
                    UPDATE users
                    SET 
                        avatar_url = $1,
                        admission_letter = $2,
                        passport_id = $3
                    WHERE id = $4
                `, [avatar_url,admission_letter_url,passport_id_url, id])

            if(uploadResult.rowCount == 0){
                return errorMsg(res, 404, "Couldn't update your documents")
            }
        }

        if(!user.is_onboarded){
            await pool.query(`
                UPDATE users
                SET 
                    is_onboarded = true,
                    updated_at = NOW()
                WHERE id = $1
                `, [id]
            )
        }

        console.log('---Done----')

        if (!user.is_verified) {
            return successMsg(res, 200, 'Onboarding details saved. We are currently verifying your account.');
        }

        return successMsg(res, 200, 'Your profile has been successfully updated.');

    } catch (error) {
        console.log(error)
        return errorMsg(res, 500, error.message)
    }
    

}