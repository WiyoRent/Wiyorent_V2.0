import express from "express"
import listingRouter from "./listing.routes.js"
import userAdminRouter from "./user.routes.js"
import reviewsRouter from "./review.route.js"
import packageRouter from "./package.routes.js"

const adminRouter = express.Router()

adminRouter.use('/', listingRouter)
adminRouter.use('/', reviewsRouter)
adminRouter.use('/', userAdminRouter)
adminRouter.use('/', packageRouter)


export default adminRouter