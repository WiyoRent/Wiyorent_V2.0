import express from 'express'
import upload from '../../middleware/multer.js'
import { updateProfile } from '../../controllers/public/profile.controller.js'

const userRouter = express.Router()

userRouter.patch(
    '/updateProfile/:id',
    upload.fields([
        {name: 'admission_letter', maxCount:1},
        {name: 'passport_id', maxCount:1},
        {name: 'avatar', maxCount:1}
    ]),
    updateProfile
)

export default userRouter