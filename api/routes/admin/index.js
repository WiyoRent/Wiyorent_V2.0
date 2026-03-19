import express from "express"
import requireAdmin from "../../middleware/requireAdmin.js"
import listingRouter from "./listing.routes.js"
import userAdminRouter from "./user.routes.js"
import reviewsRouter from "./review.route.js"
import packageRouter from "./package.routes.js"
import analyticsRouter from "./analytics.routes.js"
import { errorMsg } from "../../utils/returnMsg.js"
import pool from "../../config/db.js"
import { sendWaitlistAvailabilityEmail } from "../../utils/mail.js"

const adminRouter = express.Router()

// Middleware
adminRouter.use(requireAdmin)

// Routes
adminRouter.use('/', listingRouter)
adminRouter.use('/', reviewsRouter)
adminRouter.use('/', userAdminRouter)
adminRouter.use('/', packageRouter)
adminRouter.use('/', analyticsRouter)

// Cron job

adminRouter.post('/internal/process-available-listings', async (req, res) => {
    if (req.headers['x-cron-secret'] !== process.env.CRON_SECRET) {
        return errorMsg(res, 401, 'Unauthorized')
    }

    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const listingRes = await client.query(`
            UPDATE listings
                SET available_status = 'available'
            WHERE available_status = 'booked'
                AND available_from IS NOT NULL
                AND available_from <= CURRENT_DATE
            RETURNING *
        `)
        const listings = listingRes.rows

        for (const listing of listings) {
            const emailRes = await client.query(`
                SELECT 
                    u.email,
                    u.name,
                    l.title
                FROM users u
                JOIN waitlists w ON u.id = w.user_id
                JOIN listings l ON l.id = w.listing_id
                WHERE w.listing_id = $1
            `, [listing.id])

            for (const emailDetail of emailRes.rows) {
                await sendWaitlistAvailabilityEmail(
                    emailDetail.email,
                    emailDetail.name,
                    emailDetail.title,
                    listing.id
                )
            }
        }

        await client.query('COMMIT')
        res.json({ success: true, processed: listings.length })

    } catch (err) {
        await client.query('ROLLBACK')
        console.error('Cron job failed:', err)
        return errorMsg(res, 500, 'Failed to process listings')
    } finally {
        client.release()
    }
})


export default adminRouter