import express from 'express'
import { addQuesToSession, togglePin ,updateNote} from '../controllers/ques.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/add', protect, addQuesToSession)
router.post('/:id/pin', protect, togglePin)
router.post('/:id/note', protect, 
    updateNote
)

export default router