import Company from "../models/Company.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/genToken.js"
import Job from "../models/Job.js";
// Register a new company
export const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ success: false, message: "Missing Details" });
    }

    try {
        const companyExists = await Company.findOne({ email });
        if (companyExists) {
            return res.status(400).json({ success: false, message: "Company Already Registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        let imageUpload;
        try {
            imageUpload = await cloudinary.uploader.upload(imageFile.path);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Image upload failed" });
        }

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url,
        });

        res.status(201).json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Company login
export const loginCompany = async (req, res) => {
    const {email, password} = req.body

    try {
        const company = await Company.findOne({email})

        if (bcrypt.compare(password, company.password)) {
            res.json({
                success:true,
                company:{
                    _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else {
            res.json({success:false, message:'Invalid email or password'})
        }
    } catch (error) {
        res.json({success:false, message : error.message})
    }
};

// Get Data
export const getCompanyData = async (req, res) => {
    
    try {
        const company = req.company
        res.json({success:true, company})
    } catch (error) {
        registerCompany.json({success:false, message: error.message})
    }
};

// Post a Job
export const postJob = async (req, res) => {
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id;

    try {
    
        const newJob = new Job({
            title, 
            description, 
            location, 
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })
        await newJob.save()

        res.json({sucess:true, newJob})
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// Get company job applicants
export const getCompanyJobApplicants = async (req, res) => {
    // TODO: Implement getCompanyJobApplicants functionality
};

// Get company posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id

        const jobs = await Job.find({companyId})

        //todo adding no.of applications
        res.json({success:true, JobsData: jobs})

    } catch (error) {
        res.json({ success:false, message: error.message})
    }
};

// Change Application status
export const changeJobApplicationStatus = async (req, res) => {
    // TODO: Implement changeJobApplicationStatus functionality
};

// Change job visibility
export const changeJobVisibility = async (req, res) => {
    try {
        const {id} = req.body
        const companyId = req.company._id

        const job = await Job.findById(id)

        if (companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible
        }
        await job.save()
        res.json({success:true, job})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
};
