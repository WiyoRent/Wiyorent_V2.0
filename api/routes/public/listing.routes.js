import express from 'express'
import { fetchListings, fetchSavedListings, fetchSingleListing, saveListing } from '../../controllers/public/listing.controller.js'

const listingRouter = express.Router()

// Matches: /api/v1/public/getListings
listingRouter.get('/getListings', fetchListings)

// Matches: /api/v1/public/getSingleListing/:id
listingRouter.get('/getSingleListing/:id', fetchSingleListing)

// Matches: /api/v1/public/saveListing
listingRouter.post('/saveListing', saveListing)

// Matches: /api/v1/public/fetchSavedListings
listingRouter.get('/fetchSavedListings', fetchSavedListings)

export default listingRouter