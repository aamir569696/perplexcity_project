import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

const app=express()
// middleware
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authRouter)

export default app