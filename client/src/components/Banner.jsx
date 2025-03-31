import React from 'react'
import { assets } from '../assets/assets'
import Button from 'react-bootstrap/Button';
import { AppContext } from '../context/AppContext';
import { useContext, useRef } from 'react';

const Banner = () => {

        const {setSearchFilter, setIsSearched} = useContext(AppContext)

        const titleRef =useRef(null)
        const locationRef =useRef(null)

        const onSearch = () => {
            setSearchFilter ({
                title:titleRef.current.value,
                location: locationRef.current.value
            })
            setIsSearched(true)
            console.log({
                title:titleRef.current.value,
                location: locationRef.current.value
            });
            
        }

    return (
        <div className='container 2xl:px-20 mx-auto mt-1 py-10 md:px-20 text-center'>

            <div className='container rounded-xl 2x1:px-20 mx-auto my-10 bg-blue-100 py-10  md:px-20 text-center'>
                <h2 className='text-3xl md:text-4xl font-semibold text-gray-800'>Get Your First Job</h2>
                <p className='text-gray-600 mt-3 text-lg'>
                    Over 10,000 jobs to apply. Take the first step towards your dream career.
                </p>

                <div className="mt-6 space-y-3 max-w-md mx-auto">
                    {/* Job Search Input */}
                    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden border border-gray-300 px-4">
                        <img src={assets.search_icon} alt="Search Icon" className="w-5 h-5 opacity-70" />
                        <input
                        ref ={titleRef}
                            type="text"
                            placeholder="Search for jobs..."
                            className="p-2 flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-500"
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden border border-gray-300 px-4">
                        <img src={assets.location_icon} alt="Location Icon" className="w-5 h-5 opacity-70" />
                        <input
                         ref ={locationRef}
                            type="text"
                            placeholder="Location"
                            className="p-2 flex-1 outline-none text-gray-700 bg-transparent placeholder-gray-500"
                        />
                    </div>

                    {/* Search Button */}
                    <Button onClick={onSearch} className="">
                        Search
                    </Button>
                </div>

            </div>
            <div className='border border-grey-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                    <p className='font-medium'>Trusted by</p>
                    <img  className='h-6' src={assets.accenture_logo} alt="" />
                    <img  className='h-6' src={assets.walmart_logo} alt="" />
                    <img  className='h-6' src={assets.amazon_logo} alt="" />
                    <img  className='h-6' src={assets.microsoft_logo} alt="" />
                    <img  className='h-6' src={assets.samsung_logo} alt="" />
                    <img  className='h-6' src={assets.adobe_logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner
