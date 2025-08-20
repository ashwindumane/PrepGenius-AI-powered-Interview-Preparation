import { config } from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url'
import authRouter from './routes/auth.route.js'
import sessionRouter from './routes/session.route.js'
import quesRouter from './routes/question.route.js'
import cors from 'cors'
import { protect } from './middlewares/auth.middleware.js'
import { generateExplanation, generateQuestion } from './controllers/ai.controller.js'
const app=express()

const PORT = process.env.PORT || 4000
// console.log(PORT)

config()
connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
    credentials: true 
}))

app.use('/api/auth', authRouter)
app.use('/api/session', sessionRouter)
app.use('/api/questions', quesRouter)

app.use('/api/ai/generate-question',protect, generateQuestion)
app.use('/api/ai/generate-explanation',protect, generateExplanation)


app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{}));

app.listen(PORT, ()=>{
    console.log(`server is listening ${PORT}`)
})

export default app