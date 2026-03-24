import express from 'express'
import multer from 'multer'
import { getProfile, updateProfile } from '../../controllers/public/profile.controller.js'

const profileRouter = express.Router()
const parseForm = multer().none()

// Matches: /api/v1/public/updateProfile/:id
profileRouter.patch(
    '/update/profile',
    parseForm,
    updateProfile
)

profileRouter.get(
    '/profile/:id',
    getProfile
)

export default profileRouter
