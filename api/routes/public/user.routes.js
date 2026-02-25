import express from 'express'
import upload from '../../middleware/multer.js'
import { updateProfile } from '../../controllers/public/profile.controller.js'
import { fetchListings, fetchSavedListings, fetchSingleListing, saveListing } from '../../controllers/public/listing.controller.js'


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

userRouter.get(
    '/getListings',
    fetchListings
)

userRouter.get(
    '/getSingleListing/:id',
    fetchSingleListing
)

userRouter.post(
    '/saveListing',
    saveListing
)

userRouter.get('/fetchSavedListings', fetchSavedListings)

export default userRouter