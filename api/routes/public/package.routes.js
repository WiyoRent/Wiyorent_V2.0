import express from 'express'
import { getPackages } from '../../controllers/admin/package.controller.js'

const publicPackageRouter = express.Router()

publicPackageRouter.get('/get/packages', getPackages)

export default publicPackageRouter
