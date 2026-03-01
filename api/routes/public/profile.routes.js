import express from 'express'
import upload from '../../middleware/multer.js'
import { updateProfile } from '../../controllers/public/profile.controller.js'

const profileRouter = express.Router()

// Matches: /api/v1/public/updateProfile/:id
profileRouter.patch(
    '/update/profile',
    upload.fields([
        {name: 'admission_letter', maxCount:1},
        {name: 'passport_id', maxCount:1},
        {name: 'avatar', maxCount:1},
        {name : 'listing_images', maxCount: 10}
    ]),
    updateProfile
)

export default profileRouter