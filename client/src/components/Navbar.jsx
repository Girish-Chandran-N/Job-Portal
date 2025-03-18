import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';


const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  return (
    <div className='shadow py-4'>
      <div className='container px-4 2x1:px-20 mx-auto flex justify-between items-center'>
        <img className='logo' src={assets.logo} alt="" />
        {
          user
            ?   <div className='flex items-center gap-4'>
            <Link to={'/applications'} className='text-blue-600 hover:underline'>Applied Jobs</Link>
            <span className='text-gray-400'>|</span>
            <p className=' mb-auto text-gray-700 font-medium flex items-center'>Hi, {user.firstName} {user.lastName}</p>
            <UserButton />
          </div>
            : <div className='flex gap-4 max-sm:text-xs'>
              <Button variant='outline-secondary'>Recruiter Login</Button>
              <Button onClick={e => openSignIn()} className='primary'>Login</Button>

            </div>
        }

      </div>

    </div>
  )
}

export default Navbar
