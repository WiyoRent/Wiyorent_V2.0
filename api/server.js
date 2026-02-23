import express from 'express'
import 'dotenv/config'
import { connectCloudinary } from './config/cloudinary.js'

import cors from "cors"
import adminRouter from './routes/admin/admin.routes.js'
import userRouter from './routes/public/user.routes.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

// middleware
app.use(cors())
app.use(express.json())

// Endpoints
app.get('/', (req,res) => {
    res.send("Welcome to WiyoBackend")
})

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/public', userRouter)

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
}) 