import { editListing, fetchAllListings, createListing } from "../../controllers/admin/listings.controller.js";
import express from 'express'
import upload from "../../middleware/multer.js";

const adminRouter = express.Router()

adminRouter.post(
    '/createListing',
    upload.fields([
        {name: "images", maxCount:20}
    ]),
    createListing
)
adminRouter.get(
    '/fetchAllListings',
    fetchAllListings
)

adminRouter.patch(
    '/editListing/:id',
    editListing
)

export default adminRouter