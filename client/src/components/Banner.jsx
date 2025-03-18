import React from 'react'
import { assets } from '../assets/assets'
import Button from 'react-bootstrap/Button';

const Banner = () => {
    return (
        <div className='container 2x1:px-20 mx-auto my-10 bg-blue-100 py-10  md:px-20 text-center'>
            <div className='max-w-2xl mx-auto'>
                <h2 className='text-3xl md:text-4xl font-semibold text-gray-800'>Get Your First Job</h2>
                <p className='text-gray-600 mt-3 text-lg'>
                    Over 10,000 jobs to apply. Take the first step towards your dream career.
                </p>

                <div className="mt-6 space-y-3 max-w-md mx-auto">
                    {/* Job Search Input */}
                    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden border border-gray-300 px-4">
                        <img src={assets.search_icon} alt="Search Icon" className="w-5 h-5 opacity-70" />
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            className="p-2 flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-500"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden border border-gray-300 px-4">
                        <img src={assets.location_icon} alt="Location Icon" className="w-5 h-5 opacity-70" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="p-2 flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-500"
                        />
                    </div>

                    {/* Search Button */}
                    <Button className="">
                        Search
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Banner
