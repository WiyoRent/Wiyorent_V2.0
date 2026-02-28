import pool from "../../config/db.js";
import { errorMsg, successMsg } from "../../utils/returnMsg.js";
import { verifyHeaders } from "../../utils/verifyHeaders.js";


export const createReview = async (req,res) => {

    try {
        const {userId} = verifyHeaders(req)

        console.log(req.body, 'received bodyyy backedn')

        const {listing_id,rating,comment} = req.body

        if(!listing_id  || !rating || !comment){
            return errorMsg(res, 400, "Incomplete fields")
        }

        const result = await pool.query(
            `
                INSERT INTO listing_reviews(
                    user_id,
                    listing_id,
                    rating,
                    comment
                )VALUES($1,$2,$3,$4)
                RETURNING *
            `, [userId,listing_id, rating,comment])

        console.log(result.rows[0], '---result from create review');
        
        const review = result.rows[0]

        return successMsg(res, 200, "Review created", review);


    } catch (error) {
        console.error('error on creat review: ',error)
        return errorMsg(res, error.status || 500, error.message || "An internal server error occured")

    } 


}

export const editReview = async (req,res) => {
    try {
        const {userId} = verifyHeaders(req)

        const {listing_id, rating, comment} = req.body

        if(!listing_id  || !rating || !comment){
            return errorMsg(res, 400, "Incomplete fields")
        }

        const result = await pool.query(
            `
                UPDATE listing_reviews
                SET 
                    rating = $1,
                    comment = $2,
                    edited_at = NOW(),
                    is_approved = 'pending'
                WHERE user_id = $3 AND listing_id = $4
                RETURNING *
            `, [rating, comment, userId, listing_id])

        const review = result.rows[0]

        console.log(review, 'edited reviewwwww')

        if (!review) {
            return errorMsg(res, 404, "Review not found or unauthorized");
        }

        return successMsg(res,200,"Review Edited", review)

    } catch (error) {
        console.error('error on update listing review: ',error)
        return errorMsg(res, error.status || 500, error.message || "An internal server error occured")
    }
}

export const deleteReview = async (req,res) => {
    const {userId} = verifyHeaders(req)
    const reviewId = req.params.id

    if(!reviewId){
        errorMsg(res, 400, "No review ID")
    }

    try {
        const result = await pool.query(`
            DELETE FROM listing_reviews lr
            WHERE lr.id = $1 AND lr.user_id = $2
            RETURNING *
        `, [reviewId, userId])

        if(result.rowCount == 0){
            return errorMsg(res, 404, "Couldn't find review to delete or unauthorized delete attempt")
        }

        // result.rows[0] now contains the data of the deleted review
        return successMsg(res, 200, "Review deleted successfully", result.rows[0]);

    } catch (error) {
        console.error('Error on delete review')
        return errorMsg(res,error.status || 500, error.message || 'Internal server error occured on delete action')
    }
}