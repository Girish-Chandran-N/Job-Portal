import Job from "../models/Job.js"


//get all jobs
export const getJob = async (req, res)=>{
    try {
        const jobs = await Job.find({visible:true })
        .populate({path:'companyId', select:'-password'})

        res.json({success:true, jobs})
    } catch (error) {
        res.json({success:false, message:error.message})
    }

}

//get by id

export const getJobByID = async ()=>{
try {
    const {id} = req.params
    const job =await Job.findById(id)
    .populate({
        path:'companyId',
        select:'password'
    })

    if(!job){
        return res.json({
            success:false,
            message: 'Job not Found'
        })
    }
    res.json({
        success:true,
        job
    })
} catch (error) {
    res.json({sucess:false, message: error.message})
}

}
