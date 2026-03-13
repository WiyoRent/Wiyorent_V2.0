import pool from "../../config/db.js";
import { successMsg, errorMsg } from "../../utils/returnMsg.js";


export const trackListingView = async (req, res) => {

    const { id } = req.params

    const {userId, sessionId} = req.body

    try {
        
        if (userId) {
            const existing = await pool.query(
                `SELECT id FROM listing_views 
                WHERE listing_id = $1 
                AND user_id = $2 
                AND viewed_at > NOW() - INTERVAL '1 hour'`,
                [id, userId]
            )
            if (existing.rowCount > 0) {
                return successMsg(res, 200, 'Already tracked', null)
            }
        } else if (sessionId) {
            const existing = await pool.query(
                `SELECT id FROM listing_views 
                WHERE listing_id = $1 
                AND session_id = $2 
                AND viewed_at > NOW() - INTERVAL '1 hour'`,
                [id, sessionId]
            )
            if (existing.rowCount > 0) {
                return successMsg(res, 200, 'Already tracked', null)
            }
        }

        await pool.query(
            `INSERT INTO listing_views (listing_id, user_id, session_id) VALUES ($1, $2, $3)`,
            [id, userId || null, userId ? null : sessionId]
        )

        await pool.query(
            `UPDATE listings SET view_count = view_count + 1 WHERE id = $1`,
            [id]
        )

        return successMsg(res, 200, 'View tracked', null)

    } catch (error) {
        console.error(error, 'error tracking listing view')
        return errorMsg(res, 500, 'Could not track view')
    }
}

export const trackHousemateView = async (req, res) => {

    const { id } = req.params

    const { userId, sessionId } = req.body

    try {

        if (userId) {
            const existing = await pool.query(
                `SELECT id FROM housemate_views
                WHERE housemate_id = $1
                AND user_id = $2
                AND viewed_at > NOW() - INTERVAL '1 hour'`,
                [id, userId]
            )
            if (existing.rowCount > 0) {
                return successMsg(res, 200, 'Already tracked', null)
            }
        } else if (sessionId) {
            const existing = await pool.query(
                `SELECT id FROM housemate_views
                WHERE housemate_id = $1
                AND session_id = $2
                AND viewed_at > NOW() - INTERVAL '1 hour'`,
                [id, sessionId]
            )
            if (existing.rowCount > 0) {
                return successMsg(res, 200, 'Already tracked', null)
            }
        }

        await pool.query(
            `INSERT INTO housemate_views (housemate_id, user_id, session_id) VALUES ($1, $2, $3)`,
            [id, userId || null, userId ? null : sessionId]
        )

        await pool.query(
            `UPDATE users SET view_count = view_count + 1 WHERE id = $1`,
            [id]
        )

        return successMsg(res, 200, 'View tracked', null)

    } catch (error) {
        console.error(error, 'error tracking housemate view')
        return errorMsg(res, 500, 'Could not track view')
    }
}