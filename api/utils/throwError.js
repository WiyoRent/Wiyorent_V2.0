
export const throwError = (status,message) =>{
    const error = new Error(message || 'An internal server error occured');
    error.status = status || 500;
    throw error;
}