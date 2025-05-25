import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { UnsupportedFileTypeError } from '../errors/index.js'

const uploadDir = 'uploads/'
const maxFileSizeBytes = 5 * 1024 * 1024 // 5MB
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

const getDestination = (req, file, cb) => {
    cb(null, uploadDir)
}

const generateFilename = (req, file, cb) => {
    const uniqueId = uuidv4()
    const extension = path.extname(file.originalname)
    cb(null, `${uniqueId}${extension}`)
}

const storage = multer.diskStorage({
    destination: getDestination,
    filename: generateFilename,
})

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new UnsupportedFileTypeError(), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: maxFileSizeBytes,
    },
})

export const imageUpload = (req, res, next) => {
    const uploadSingle = upload.single('image')

    uploadSingle(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message })
            }
            if (err instanceof UnsupportedFileTypeError) {
                return res
                    .status(415)
                    .json({ message: 'File type not supported' })
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
        next()
    })
}
