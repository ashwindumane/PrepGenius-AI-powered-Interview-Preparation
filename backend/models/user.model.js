import mongoose from "mongoose"

const user=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profileImgUrl:{type:String, default:null},
}, {timestamps:true})

const User=new mongoose.model("User", user)

export default User