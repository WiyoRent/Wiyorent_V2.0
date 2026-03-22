import multer, {memoryStorage} from "multer";

const upload = multer({
    storage: memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
})

export default upload