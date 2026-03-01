import express from 'express'
import profileRouter from './profile.routes.js'
import listingRouter from './listing.routes.js'
import housemateRouter from './housemate.routes.js'
import reviewRouter from './review.routes.js'

const publicRouter = express.Router()

// Simply use the routers. Because we kept the full paths 
publicRouter.use('/', profileRouter)
publicRouter.use('/', listingRouter)
publicRouter.use('/', housemateRouter)
publicRouter.use('/', reviewRouter)

export default publicRouter