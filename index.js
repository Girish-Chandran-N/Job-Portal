import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import { connectDB } from './config/db.js'
import { clekWebhooks } from './controllers/webhooks.js'
import companyRoutes from "./routes/companyRoutes.js"
import connectClodinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'

//Initialising the Express
const app = express()

//connect to database
await connectDB()
await connectClodinary()



//Middleware 
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


//Route

app.get('/', (req, res) => {
  res.send('API Working')
})

app.post('/webhooks', clekWebhooks)
app.use('/api/company', companyRoutes )
app.use('/api/jobs', jobRoutes )
app.use('/api/user', userRoutes)
//port

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`Server Is running on port ${PORT}`)
})
