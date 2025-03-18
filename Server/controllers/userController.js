import JobApplication from "../models/JobApplication.js"
import { User } from "../models/userModel.js"
import { v2 as cloudinary } from "cloudinary"
import bcrypt from 'bcryptjs';
import generateToken from "../utils/genToken.js";  
export const registerUser = async (req, res) => {
    const { name, email, password, resume, image } = req.body; 
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already registered" });
        }

        
        const newUser = new User({
            name,
            email,
            password, 
            resume,
            image
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log('User found:', user);

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isMatch);  // Debugging

        if (isMatch) {
            // Generate token if passwords match
            const token = generateToken(user._id); // Using your generateToken function

            // Send the response with user data and the generated token
            return res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    resume: user.resume,
                    image: user.image
                },
                token: token 
            });
        } else {
           
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
       
        console.error(error);  
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Get user data


export const getUserData = async (req, res) =>{
    const userId = req.auth.userId

    try {
        const user = await User.findById(userId)
        if(!user) {
            return res.json ({success:false, message: 'User not found'})
        }
        res.json({success:true , user})
    } catch (error) {
        res.json({success:false, message :error.message})
    }

}


// apply for Job
export const applyForJob = async (req, res) => {

    const {jobId} = req.body

    const userId =req.auth.userId
    try {
        const isAlreadyApplied = await JobApplication.find({jobId,userId})

        if (isAlreadyApplied.length > 0){
            return res.json({success:false, message:'Already Applied'})
        }

        const jobData =await Job.findById(jobId)

        if (!jobData) {
            return res.json({success:false, message:'Job Not Found'})
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({success:true, message: 'Applied Successfully'})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

//get user application

export const getUserJobApplication = async (req,res) => {
     try {
        const userId = req.auth.userId
        const applications = await JobApplication.find({userId})
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()
        
        if (!applications) {
            return res.json({success: false, message:'No job applications found'})
        }
        return res.json({success: false, applications})

     } catch (error) {
        res.json({ success: false, message: error.message})
     }
}

//update user profile

export const updateUserResume = async (req,res) => {
 try {
    const userId = req.auth.userId
    const resumeFile = req.resumeFile
    const userData = await User.findById(userId)

    if (resumeFile) {

        const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
        userData.resume = resumeUpload.secure_url
        
    }

    await userData.save()

    return res.json({success:true, message:'Resume Updated'})

 } catch (error) {
    
    res.json({success:false, message: error.message})
 }
}