import { v2 as cloudinary } from "cloudinary";
import "dotenv/config"

// Configures the global Cloudinary SDK instance with our account
// credentials. Called once on server startup (see server.js) so every
// `cloudinary.uploader`/`cloudinary.api` call elsewhere is already authenticated.
export const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
        console.log('Cloudinary Connected')
    } catch (error) {
        console.error(error)
        throw error
    }
}



