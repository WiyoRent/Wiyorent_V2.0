export function getBaseURL(){
    if(process.env.NODE_ENV === 'development'){
        return "http://localhost:4000/"
    }

    return process.env.NEXT_PUBLIC_API_URL
}
