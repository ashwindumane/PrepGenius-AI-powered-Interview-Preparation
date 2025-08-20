import mongoose from 'mongoose'

const question=new mongoose.Schema({
    session:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    question:{type:String, required:true},
    answer:{type:String, required:true},
    note:{type:String},
    
   
    isPinned:{type:Boolean, default:false}
},{timestamps:true})

const Question=new mongoose.model("Question", question)

export default Question