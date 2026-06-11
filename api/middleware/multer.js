import multer, {memoryStorage} from "multer";

// Files are kept in memory (not written to disk) so they can be streamed
// straight to Cloudinary
const upload = multer({
    storage: memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
})

export default upload