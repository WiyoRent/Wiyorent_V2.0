import express  from 'express'
import 'dotenv/config'
import { connectCloudinary } from './config/cloudinary.js'

import cors from "cors"
import adminRouter from './routes/admin/index.js'
import publicRouter from './routes/public/index.js'
import rateLimit from 'express-rate-limit'

// ########## App config ##########
const app = express()
const port = process.env.PORT || 4000

// General-purpose rate limiter: caps each IP at 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

// Configure Cloudinary SDK using credentials from env vars before any uploads happen
connectCloudinary()

// ########## Middleware ##########
app.use(cors())
app.use(express.json())

// ########## Endpoints ##########
app.get('/', (req,res) => {
    res.send("Welcome to WiyoBackend")
})

// Admin and public APIs are split into separate routers, each mounted under their own prefix
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/public', publicRouter)

// ########## Start server ##########
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})