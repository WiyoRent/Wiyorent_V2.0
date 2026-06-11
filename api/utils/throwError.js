
// Throws an Error with an attached `status` property, so the global error
// handler can respond with the right HTTP status code instead of a generic 500
export const throwError = (status,message) =>{
    const error = new Error(message || 'An internal server error occured');
    error.status = status || 500;
    throw error;
}