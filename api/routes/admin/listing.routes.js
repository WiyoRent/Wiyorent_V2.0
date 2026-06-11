import { editListing, fetchAllListings, createListing, fetchSingleListing, deleteListing, toggleListingActive, setListingImages } from "../../controllers/admin/listings.controller.js";
import express from 'express'
import multer from 'multer'

const listingRouter = express.Router()
// multer().none() parses multipart/form-data text fields (no files) into req.body.
// Listing images are uploaded separately via setListingImages/Cloudinary.
const parseForm = multer().none()

listingRouter.post(
    '/createListing',
    parseForm,
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
    parseForm,
    editListing
)

listingRouter.patch(
    '/toggleActive/:id',
    toggleListingActive
)

listingRouter.patch(
    '/setListingImages/:id',
    setListingImages
)

listingRouter.delete(
    '/deleteListing/:id',
    deleteListing
)

export default listingRouter
