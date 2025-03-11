import express from 'express'
import { changeJobApplicationStatus, changeJobVisibility, getCompanyJobApplicants, getCompanyData, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

//Register a company

router.post('/register',upload.single('image'), registerCompany)

//company login

router.post('/login', loginCompany)

//get company data

router.get('/company',protectCompany, getCompanyData)

//post job

router.post('/post-job',protectCompany, postJob)

//Get applicants Data
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//Get company job List
router.get('/list-jobs', protectCompany,getCompanyPostedJobs)

//change applications status
router.post('/change-status', protectCompany,changeJobApplicationStatus)

//change visibiliyt

router.post('/change-visibility', protectCompany,changeJobVisibility)

export default router