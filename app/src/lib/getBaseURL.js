// Returns the Express API's base URL: localhost in development, or the
// deployed API URL (NEXT_PUBLIC_API_URL) in production
export function getBaseURL(){
    if(process.env.NODE_ENV === 'development'){
        return "http://localhost:4000/"
    }

    return process.env.NEXT_PUBLIC_API_URL
}
