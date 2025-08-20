import Question from "../models/question.model.js";
import Session from "../models/session.model.js";

export const addQuesToSession = async (req, res) => {
    try {
        const {sessionId, questions}=req.body;
        
        if(!sessionId || !questions || !Array.isArray(questions) ){
            return res.status(400).json({message:"invalid input data"})
        }

        const session=await Session.findById(sessionId)

        if(!session){
            return res.status(404).json({message:"session not found"})
        }

        const createdQuestions=await Question.insertMany(
            questions.map((q)=>({
                session:sessionId,
                question:q.question,
                answer:q.answer
            }))
        )


        session.questions.push(...createdQuestions.map((q)=>q._id))
        await session.save()

        return res.status(200).json({message:"ques added successfully", session})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ sucess: false, error })
    }
}

export const togglePin = async (req, res) => {
    try {
       const question=await Question.findById(req.params.id) 
       if(!question) {
        return res.status(404).json({success:false, message:"question data not found"})
       }

       question.isPinned=!question.isPinned
       await question.save()

       return res.status(200).json({success:true, question})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ sucess: false, error })

    }
}

export const updateNote = async (req, res) => {
    try {
        const {note}=req.body
        const question=await Question.findById(req.params.id)

        if(!question){
            return res.status(404).json({success:false, message:"question not found"})
        }

        question.note=note || ""
        await question.save()

        return res.status(200).json({success:true, question})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error })

    }
}