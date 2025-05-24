import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { UnsupportedFileTypeError } from '../errors/index.js'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const fileId = uuidv4()
        const extension = path.extname(file.originalname)
        cb(null, `${fileId}${extension}`)
    },
})

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
    ]

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
        fileSize: 5 * 1024 * 1024, // 5MB
    },
})

export const imageUpload = (req, res, next) => {
    const uploadSingle = upload.single('image')

    uploadSingle(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send({ message: err.message })
        }
        next()
    })
}
