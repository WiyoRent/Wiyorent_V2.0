import pool from "../../config/db.js";
import { sendReviewSubmittedAlert, sendReviewEditedAlert, sendReviewAutoPublishedAlert } from "../../utils/mail.js";
import { errorMsg, successMsg } from "../../utils/returnMsg.js";
import { verifyHeaders } from "../../utils/verifyHeaders.js";
import { moderateContent } from "../../utils/cms.js";



export const createReview = async (req,res) => {

    try {
        const {userId} = verifyHeaders(req)

        console.log(req.body, 'received bodyyy backedn')

        const {listing_id,rating,comment, user_full_name, listing_title} = req.body

        if(!listing_id  || !rating || !comment){
            return errorMsg(res, 400, "Incomplete fields")
        }

        const moderation = await moderateContent(comment)
        const { label, confidence } = moderation

        if (label === 'toxic') {
            return errorMsg(res, 400, "Your review contains inappropriate content and cannot be posted.")
        }

        let result
        if (label === 'clean') {
            result = await pool.query(
                `
                    INSERT INTO listing_reviews(
                        user_id,
                        listing_id,
                        rating,
                        comment,
                        is_approved,
                        moderation_label,
                        moderation_confidence
                    )VALUES($1,$2,$3,$4,'approved',$5,$6)
                    RETURNING *
                `, [userId, listing_id, rating, comment, label, confidence])
        } else {
            result = await pool.query(
                `
                    INSERT INTO listing_reviews(
                        user_id,
                        listing_id,
                        rating,
                        comment,
                        moderation_label,
                        moderation_confidence
                    )VALUES($1,$2,$3,$4,$5,$6)
                    RETURNING *
                `, [userId, listing_id, rating, comment, label, confidence])
        }

        console.log(result.rows[0], '---result from create review');

        const review = result.rows[0]

        if (label === 'clean') {
            await sendReviewAutoPublishedAlert(user_full_name, listing_title, listing_id)
        } else {
            await sendReviewSubmittedAlert(user_full_name, listing_title, listing_id)
        }

        return successMsg(res, 200, "Review created", review);


    } catch (error) {
        console.error('Error occurred on createReview:', error)
        if (error.status && error.status < 500) {
            return errorMsg(res, error.status, error.message)
        }
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }


}

export const editReview = async (req,res) => {
    try {
        const {userId} = verifyHeaders(req)

        const {listing_id, rating, comment, user_full_name, listing_title} = req.body

        if(!listing_id  || !rating || !comment){
            return errorMsg(res, 400, "Incomplete fields")
        }

        const moderation = await moderateContent(comment)
        const { label, confidence } = moderation

        if (label === 'toxic') {
            return errorMsg(res, 400, "Your updated review contains inappropriate content and cannot be saved.")
        }

        const newApprovalStatus = label === 'clean' ? 'approved' : 'pending'

        const result = await pool.query(
            `
                UPDATE listing_reviews
                SET
                    rating = $1,
                    comment = $2,
                    edited_at = NOW(),
                    is_approved = $3,
                    moderation_label = $4,
                    moderation_confidence = $5
                WHERE user_id = $6 AND listing_id = $7
                RETURNING *
            `, [rating, comment, newApprovalStatus, label, confidence, userId, listing_id])

        const review = result.rows[0]

        if (!review) {
            return errorMsg(res, 404, "Review not found or unauthorized");
        }

        if (label === 'clean') {
            await sendReviewAutoPublishedAlert(user_full_name, listing_title, listing_id)
        } else {
            await sendReviewEditedAlert(user_full_name, listing_title)
        }

        return successMsg(res,200,"Review Edited", review)


    } catch (error) {
        console.error('Error occurred on editReview:', error)
        if (error.status && error.status < 500) {
            return errorMsg(res, error.status, error.message)
        }
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}

export const deleteReview = async (req,res) => {
    const reviewId = req.params.id

    if(!reviewId){
        errorMsg(res, 400, "No review ID")
    }

    try {
        const {userId} = verifyHeaders(req)

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
        console.error('Error occurred on deleteReview:', error)
        if (error.status && error.status < 500) {
            return errorMsg(res, error.status, error.message)
        }
        return errorMsg(res, 500, 'Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.')
    }
}