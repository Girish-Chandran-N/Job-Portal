import { useNavigate } from 'react-router-dom'
import React from 'react'
import { assets } from '../assets/assets'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div className='border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
      {/* Company Logo and Name in one line */}
      <div className='flex items-center gap-3 mb-3'>
        <img
          className='h-8 w-8 object-contain'
          src={job.companyId?.image || '/placeholder-company.png'}
          alt={job.companyId?.name || 'Company logo'}
        />
        {job.companyId?.name && (
          <span className='text-sm font-medium text-gray-700'>{job.companyId.name}</span>
        )}
      </div>

      {/* Job Title */}
      <h4 className='font-semibold text-lg text-gray-800 line-clamp-1'>{job.title}</h4>

      {/* Location and Level in one line */}
      <div className='flex items-center gap-2 mt-2'>
        <span className='inline-flex items-center text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full'>
          {job.location}
        </span>
        <span className='inline-flex items-center text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full'>
          {job.level}
        </span>
      </div>

      {/* Description */}
      <div className='text-gray-500 text-sm mt-3 line-clamp-3'>
        {job.description?.replace(/<[^>]*>/g, '').slice(0, 150)}
        {job.description?.length > 150 ? '...' : ''}
      </div>

      {/* Buttons in one line with equal width */}
      <div className='mt-4 flex gap-3'>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className='bg-blue-600 text-white px-2 py-2 rounded'
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className='text-gray-500 border border-gray-500 rounded px-4 py-2'
        >
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard