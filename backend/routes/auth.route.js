import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/auth.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'


const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUser)
router.post('/upload-image', upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "no file uploaded" })
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

        return res.status(200).json({ imageUrl })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

export default router