import express from 'express'
import { approveUserReview, getUserReviews, rejectUserReview, deleteUserReview } from '../../controllers/admin/review.controller.js'

const reviewsRouter = express.Router()

reviewsRouter.get(
    `/get/user/reviews`,
    getUserReviews
)

reviewsRouter.patch(
    `/approve/user/review/:id`,
    approveUserReview
)

reviewsRouter.patch(
    `/reject/user/review/:id`,
    rejectUserReview
)

reviewsRouter.delete(
    '/delete/user/review/:id',
    deleteUserReview
)

export default reviewsRouter