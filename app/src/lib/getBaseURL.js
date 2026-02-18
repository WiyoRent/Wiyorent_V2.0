export function getBaseURL(){
    if(process.env.NODE_ENV === 'development'){
        // deployed URL
        return "http://localhost:4000/"
    }

    return "http://localhost:4000/"

}