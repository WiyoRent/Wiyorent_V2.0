
export const errorMsg = (res,err = 422,msg = 'An error occured') => {

    return res.status(err).json({
        success:false,
        message: msg
    })
}

export const successMsg = (res,status,msg,data=[] || {}) => {
    return res.status(status).json({
        success: true,
        message: msg,
        data
    })
}