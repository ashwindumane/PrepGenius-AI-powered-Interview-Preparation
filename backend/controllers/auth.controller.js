import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, profileImgUrl } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400).json({ message: "user already exists" })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name, email, password: hashedPassword, profileImgUrl
        })

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImgUrl: user.profileImgUrl,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(501).json({ message: "server error", error: error.message })
    }
}
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ success: false, message: "no such user found, try registering" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({ success: false, messsage: "invalid password" })
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImgUrl: user.profileImgUrl,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(501).json({ message: "server error", error: error.message })
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }

        return res.json(user)

    } catch (error) {
        res.status(501).json({ message: "server error", error: error.message })
    }
}