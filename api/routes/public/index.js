import express from 'express'
import profileRouter from './profile.routes.js'
import listingRouter from './listing.routes.js'
import housemateRouter from './housemate.routes.js'
import reviewRouter from './review.routes.js'
import publicPackageRouter from './package.routes.js'

const publicRouter = express.Router()

// ########## Route mounts ##########
// No auth middleware here - these routes are reachable by anonymous visitors.
// Individual routers/controllers handle their own auth checks where needed.
publicRouter.use('/', profileRouter)
publicRouter.use('/', listingRouter)
publicRouter.use('/', housemateRouter)
publicRouter.use('/', reviewRouter)
publicRouter.use('/', publicPackageRouter)

export default publicRouter