import redisClient from "../config/redis.js"

// Invalidates every cached public listings-browse response (one key per
// unique filter combination) plus the shared filter_meta bounds. Called
// after any admin write that changes which listings show up or their
// cached fields (create/edit/delete/toggle-active/set-images).
export async function invalidateListingsCache(){
    try {
        const keys = []
        for await (const key of redisClient.scanIterator({ MATCH: 'listings_base:*', COUNT: 100 })) {
            keys.push(key)
        }
        keys.push('listings:filter_meta')

        await redisClient.del(keys)
    } catch (error) {
        console.error('Error occurred on invalidateListingsCache:', error)
    }
}

// Invalidates the cached public detail page for one listing. Called after
// any admin write that changes that listing's fields (create/edit/delete/
// toggle-active/set-images) or its reviews (approve/reject/delete review).
export async function invalidateListingDetail(listingId){
    try {
        await redisClient.del(`listing:${listingId}`)
    } catch (error) {
        console.error('Error occurred on invalidateListingDetail:', error)
    }
}
