import express from "express"
import listingRouter from "./listing.routes.js"
import userAdminRouter from "./user.routes.js"

const adminRouter = express.Router()

adminRouter.use('/', listingRouter)
adminRouter.use('/', userAdminRouter)

export default adminRouter