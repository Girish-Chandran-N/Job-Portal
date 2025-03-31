import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets, jobsData } from '../assets/assets'; 
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(false); 

  const fetchJob = () => {
    setLoading(true);
    try {
      const job = jobsData.find(job => job._id === id);
      if (job) {
        setJobData(job);
      } else {
        toast.error('Job not found');
        navigate('/jobs'); // Redirect if job not found
      }
    } catch (error) {
      toast.error('Error loading job details');
    } finally {
      setLoading(false);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Please login to apply for jobs');
      }

      if (!userData.resume) {
        navigate('/applications');
        return toast.error('Please upload your resume first');
      }

      const token = await getToken();
      
      toast.success('Application submitted successfully!');
      setIsAlreadyApplied(true);
      
      
      if (fetchUserApplications) {
        fetchUserApplications();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to apply');
    }
  };

  const checkAlreadyApplied = () => {
    if (!jobData || !userApplications?.length) return;
    const hasApplied = userApplications.some(item => item.jobId?._id === jobData._id);
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    checkAlreadyApplied();
  }, [jobData, userApplications]);

  if (loading) return <Loading />;
  if (!jobData) return <div className="text-center py-10">Job not found</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        {/* Job Header Section */}
        <div className="bg-white rounded-lg w-full mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 md:p-8 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                className="h-24 w-24 bg-white rounded-lg p-4 border object-contain" 
                src={jobData.companyId.image} 
                alt={jobData.companyId.name}
                onError={(e) => {
                  e.target.src = assets.company_placeholder;
                  e.target.onerror = null;
                }}
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{jobData.title}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <img src={assets.suitcase_icon} alt="" className="w-4 h-4" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <img src={assets.location_icon} alt="" className="w-4 h-4" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    <img src={assets.person_icon} alt="" className="w-4 h-4" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    <img src={assets.money_icon} alt="" className="w-4 h-4" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <button 
                onClick={applyHandler}
                disabled={isAlreadyApplied}
                className={`px-6 py-2 rounded-md font-medium ${
                  isAlreadyApplied 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className="text-sm text-gray-500">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Job Description</h2>
              <div 
                className="prose max-w-none" 
                dangerouslySetInnerHTML={{ __html: jobData.description }} 
              />
              <div className="mt-8 flex justify-center lg:justify-start">
                <button 
                  onClick={applyHandler}
                  disabled={isAlreadyApplied}
                  className={`px-8 py-3 rounded-md font-medium ${
                    isAlreadyApplied 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isAlreadyApplied ? 'Application Submitted' : 'Apply for This Position'}
                </button>
              </div>
            </div>

            {/* Similar Jobs Section */}
            <div className="w-full lg:w-1/3">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                More jobs at {jobData.companyId.name}
              </h3>
              <div className="space-y-4">
                {jobsData
                  .filter(job => 
                    job._id !== jobData._id && 
                    job.companyId._id === jobData.companyId._id
                  )
                  .slice(0, 4)
                  .map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplyJob;