import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.routes.js'

const app=express()
// middleware
app.use(express.json())


app.use('/api/auth',authRouter)

export default app