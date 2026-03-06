import pool from "../../config/db.js"
import { errorMsg, successMsg } from "../../utils/returnMsg.js"
import formatDate from "../../utils/formatDate.js"
import { sendReviewApprovedEmail, sendReviewRejectedEmail } from "../../utils/mail.js"

export const getUserReviews = async (req,res) => {
    try {
        const result = await pool.query(`
            SELECT 
                lr.id as review_id,
                u.id as user_id,
                u.email as user_email,
                l.id as property_id,
                u.full_name,
                u.avatar_url,
                l.title,
                lr.rating,
                lr.comment,
                lr.created_at,
                lr.is_approved
            FROM listing_reviews lr
            LEFT JOIN users u
                ON lr.user_id = u.id
            LEFT JOIN listings l
                ON lr.listing_id = l.id
            ORDER BY 
                (lr.is_approved = 'pending') DESC,
                l.created_at DESC 
        `)

        if(result.rowCount == 0){
            return successMsg(res, 200, 'No reviews yet', [])
        }

        const reviews =  result.rows


        const userReviews = reviews.map(review => (
            {
                review_id: review.review_id,
                reviewer: {
                    user_id: review.user_id,
                    name: review.full_name,
                    email : review.user_email,
                    avatar: review.avatar_url,
                },
                property: {
                    property_id: review.property_id,
                    title: review.title,
                },
                rating: review.rating,
                comment: review.comment,
                date: formatDate(review.created_at),
                status: review.is_approved,
            }
        ))

        console.log(userReviews, '---userReviews')

        return successMsg(res, 200, '', userReviews) 

    } catch (error) {
        console.error(error.message)
        return errorMsg(res, error.status, error.message || 'An internal server error occured')
    }
}

export const approveUserReview = async (req,res) => {
    const reviewId = req.params.id
    const {status, email, full_name, property_title } = req.body

    if(!reviewId){
        return errorMsg(res, 400, "Could't get review ID")
    }

    try {
        const result = await pool.query(`
        UPDATE listing_reviews
        SET 
            is_approved = $1
        WHERE id = $2
        `, [status, reviewId])

        if(result.rowCount === 0){
            return errorMsg(res, 404, "Review not found")
        }

        await sendReviewApprovedEmail(email, full_name, property_title)

        return successMsg(res,200,'User review approved', [])
    } catch (error) {
        console.error(error.message )
        return errorMsg(res, 500 || error.status, error.message || "An internal server error occured")
    }
    
}

export const rejectUserReview = async (req,res) => {
    const reviewId = req.params.id
    const {status, email, full_name, property_title, review_rejection_note } = req.body

    console.log(review_rejection_note, '------review rejectionnote')


    if(!reviewId){
        return errorMsg(res, 400, "Could't get review ID")
    }

    try {
        const result = await pool.query(`
        UPDATE listing_reviews
        SET 
            is_approved = $1,
            review_rejection_note = $2
        WHERE id = $3
        `, [status, review_rejection_note, reviewId])

        if(result.rowCount === 0){
            return errorMsg(res, 404, "Review not found")
        }

        await sendReviewRejectedEmail(email, full_name, property_title, review_rejection_note)

        return successMsg(res,200,'User review rejected', [])
    } catch (error) {
        console.error(error.message )
        return errorMsg(res, 500 || error.status, error.message || "An internal server error occured")
    }
    
}

export const deleteUserReview = async (req, res) => {
    const reviewId = req.params.id
    if (!reviewId) return errorMsg(res, 400, "Couldn't get review ID")
    try {
        const result = await pool.query(`
            DELETE FROM listing_reviews WHERE id = $1
        `, [reviewId])
        if (result.rowCount === 0) return errorMsg(res, 404, "Review not found")
        return successMsg(res, 200, 'Review deleted successfully', [])
    } catch (error) {
        console.error(error.message)
        return errorMsg(res, 500, error.message || "An internal server error occurred")
    }
}