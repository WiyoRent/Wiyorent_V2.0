import express from "express"
import requireAdmin from "../../middleware/requireAdmin.js"
import listingRouter from "./listing.routes.js"
import userAdminRouter from "./user.routes.js"
import reviewsRouter from "./review.route.js"
import packageRouter from "./package.routes.js"
import analyticsRouter from "./analytics.routes.js"

const adminRouter = express.Router()

adminRouter.use(requireAdmin)

adminRouter.use('/', listingRouter)
adminRouter.use('/', reviewsRouter)
adminRouter.use('/', userAdminRouter)
adminRouter.use('/', packageRouter)
adminRouter.use('/', analyticsRouter)


export default adminRouter