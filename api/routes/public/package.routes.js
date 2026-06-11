import express from 'express'
import { getPackages } from '../../controllers/admin/package.controller.js'

const publicPackageRouter = express.Router()

// Reuses the admin controller - package listings are public read-only data,
// so no admin auth is required for this route
publicPackageRouter.get('/get/packages', getPackages)

export default publicPackageRouter
