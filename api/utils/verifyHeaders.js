export const verifyHeaders = (req) => {
    const clientKey = req.headers['x-internal-api-key'];
    const userId = req.headers['x-user-id'];

    if (clientKey !== process.env.INTERNAL_BACKEND_KEY) {
        const error = new Error('Unauthorized access');
        error.status = 403;
        throw error;
    }

    if (!userId) {
        const error = new Error('Unauthenticated access. Login required');
        error.status = 401;
        throw error;
    }

    return { clientKey, userId };
};