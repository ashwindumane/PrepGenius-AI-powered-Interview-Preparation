import Question from "../models/question.model.js"
import Session from "../models/session.model.js"

export const createSession = async (req, res) => {
    try {
        const { role, experience, topicToFocus, description, questions } = req.body

        const userId = req.user._id

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicToFocus,
            description
        })

        const questionDocs = await Promise.all(questions?.map(async (q) => {
            const createQuestion = await Question.create({
                session: session._id,
                question:q.question,
                answer:q.answer
                
            })

            return createQuestion._id
        }))

        session.questions = questionDocs

        await session.save()

        return res.status(201).json({ success: true, session })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error})
    }
}

export const getMySession = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate("questions")

        return res.status(200).json({ success: true, message: 'sessions are fetched', sessions })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })

    }
}
export const getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate({
            path: "questions",
            options: { sort: { isPinned: -1, createdAt: 1 } }
        })
            .exec()

        if (!session) {
            return res.status(404).json({ success: false, message: "sessions not found" })
        }

        return res.status(200).json({ success: true, session })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })

    }
}
export const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)

        if (!session) {
            return res.status(404).json({ success: true, message: "session not found" })
        }

        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "not authorized to delete this session" })
        }

        await Question.deleteMany({ session: session._id })

        await session.deleteOne();

        return res.status(200).json({ message: "session deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error })

    }
}