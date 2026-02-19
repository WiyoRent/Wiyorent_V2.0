import { editListing, fetchAllListings, createListing, fetchSingleListing } from "../../controllers/admin/listings.controller.js";
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

adminRouter.get(
    '/fetchSingleListing/:id',
    fetchSingleListing
)

adminRouter.patch(
    '/editListing/:id',
    upload.array('images', 20),
    editListing
)

export default adminRouter