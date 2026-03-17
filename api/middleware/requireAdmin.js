import { errorMsg } from '../utils/returnMsg.js'

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
