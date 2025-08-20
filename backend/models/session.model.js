import mongoose from 'mongoose'

const session=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    role:{type:String, required:true},
    experience:{type:String, required:true},
    topicToFocus:{type:String,required:true},
    description:{String},
    questions:[{type:mongoose.Schema.Types.ObjectId, ref:"Question"}]
},{timestamps:true})

const Session=new mongoose.model("Session", session)

export default Session