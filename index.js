import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import { connectDB } from './config/db.js'
import { clekWebhooks } from './controllers/webhooks.js'


//Initialising the Express
const app = express()

//connect to database
await connectDB()



//Middleware 
app.use(cors())
app.use(express.json())


//Route

app.get('/', (req, res) => {
  res.send('API Working')
})

app.post('/webhooks', clekWebhooks)

//port

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`Server Is running on port ${PORT}`)
})
