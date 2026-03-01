import express from 'express'
import { fetchHousemates, fetchHousemate, fetchHousemateContactDetail, saveHousemate, fetchSavedHousemates } from '../../controllers/public/housemate.controller.js'

const housemateRouter = express.Router()

// Matches: /api/v1/public/fetchHousemates
housemateRouter.get('/fetchHousemates', fetchHousemates)

// Matches: /api/v1/public/fetchHousemate/:id
housemateRouter.get('/fetchHousemate/:id', fetchHousemate)

// Matches: /api/v1/public/fetchHousemateContactDetail/:id
housemateRouter.get('/fetchHousemateContactDetail/:id', fetchHousemateContactDetail)

// Matches: /api/v1/public/saveHousemate
housemateRouter.post('/saveHousemate', saveHousemate)

// Matches: /api/v1/public/fetchSavedHousemates
housemateRouter.get('/fetchSavedHousemates', fetchSavedHousemates)

export default housemateRouter