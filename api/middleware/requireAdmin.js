import { errorMsg } from '../utils/returnMsg.js'

// Two-layer guard for every /api/v1/admin route:
//  1. x-internal-api-key proves the request came from our own Next.js server
//     (the browser never calls this API directly)
//  2. x-user-role must be 'admin', forwarded by the Next.js server after it
//     checks the user's session
const requireAdmin = (req, res, next) => {
    const clientKey = req.headers['x-internal-api-key']
    const role = req.headers['x-user-role']

    if (clientKey !== process.env.INTERNAL_BACKEND_KEY) {
        return errorMsg(res, 403, 'Unauthorized access')
    }

    if (role !== 'admin') {
        return errorMsg(res, 403, 'Admin access required')
    }

    next()
}

export default requireAdmin
