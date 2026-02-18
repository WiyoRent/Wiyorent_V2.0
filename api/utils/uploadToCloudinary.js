import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { connectCloudinary } from "../config/cloudinary.js";

export async function uploadToCloudinary(fileBuffer, folder) {

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
}
