import express from "express"
import { createSession, deleteSession, getMySession, getSessionById } from "../controllers/session.controller.js"
import { protect } from "../middlewares/auth.middleware.js"

const router=express.Router()

router.post('/create',protect, createSession)
router.get('/my-sessions',protect, getMySession)
router.get('/:id',protect, getSessionById)
router.delete('/:id',protect, deleteSession)

export default router