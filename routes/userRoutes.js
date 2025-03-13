import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'
import { loginUser,registerUser } from '../controllers/userController.js'



const router = express.Router()

router.post('/register', registerUser);

// User Login Route
router.post('/login', loginUser)

//get user data

router.get('/user', getUserData)

// apply for a job
router.post('/apply', applyForJob)

//get applied job

router.get('/application', getUserJobApplication)

//update user profile

router.post('/update-resume',upload.single('resume'), updateUserResume)

export default router