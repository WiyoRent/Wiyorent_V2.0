
// Standard error response shape used by every controller: { success: false, message }
export const errorMsg = (res,err = 422,msg = 'An error occured') => {

    return res.status(err).json({
        success:false,
        message: msg
    })
}

// Standard success response shape: { success: true, message, data }
export const successMsg = (res,status,msg,data=[] || {}) => {
    return res.status(status).json({
        success: true,
        message: msg,
        data
    })
}