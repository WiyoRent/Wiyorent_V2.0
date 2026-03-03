import { editListing, fetchAllListings, createListing, fetchSingleListing, deleteListing } from "../../controllers/admin/listings.controller.js";
import express from 'express'
import upload from "../../middleware/multer.js";

const listingRouter = express.Router()

listingRouter.post(
    '/createListing',
    upload.fields([
        {name: "images", maxCount:20}
    ]),
    createListing
)
listingRouter.get(
    '/fetchAllListings',
    fetchAllListings
)

listingRouter.get(
    '/fetchSingleListing/:id',
    fetchSingleListing
)

listingRouter.patch(
    '/editListing/:id',
    upload.array('images', 20),
    editListing
)

listingRouter.delete(
    '/deleteListing/:id',
    deleteListing
)

export default listingRouter