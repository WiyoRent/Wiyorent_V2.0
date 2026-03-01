import express from 'express'
import { createReview, deleteReview, editReview } from '../../controllers/public/review.controller.js'

const reviewRouter = express.Router()

reviewRouter.post(
    '/create/review',
    createReview
) 

reviewRouter.patch(
    '/edit/review',
    editReview
)

reviewRouter.delete(
    '/delete/review/:id',
    deleteReview
)

export default reviewRouter