import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
export const protect=async(req,res,next)=>{
    try {
        let token=req.headers.authorization

        if(token && token.startsWith("Bearer")){
            token=token.split(" ")[1]
            const decoded=jwt.verify(token, process.env.JWT_SECRET)

            req.user=await User.findById(decoded.id).select("-password")
            next()
        }
        else{
            return res.status(401).json({success:false, message:"no auth user found"})
        }
    } catch (error) {
        console.log(error)
        return error
    }
}