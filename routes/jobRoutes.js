import express from 'express'
import { getJob, getJobByID } from '../controllers/jobController.js';

const router =express.Router()

//get all jobs data
router.get('/',getJob)

//get by id
router.get('/:id',getJobByID)

export default router;