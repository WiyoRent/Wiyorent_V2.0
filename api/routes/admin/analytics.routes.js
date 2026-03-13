import express from "express"
import { fetchAnalytics } from "../../controllers/admin/analytics.controller.js"

const analyticsRouter = express.Router()

analyticsRouter.get('/analytics', fetchAnalytics)

export default analyticsRouter
