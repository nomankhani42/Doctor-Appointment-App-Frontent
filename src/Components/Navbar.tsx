import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgMenuLeftAlt } from "react-icons/cg";
import Drawersm from './Subcomponents/Drawersm';
import { useSelector } from 'react-redux';
import UserInfoCard from './Subcomponents/UserInfoCard';

const Navbar = () => {
  
  const [open, setOpen] = useState(false);
  const {user,role,isAuthenticated,loading}=useSelector(state=>state.user);
  const Navigate=useNavigate();

  return (
    <div className='flex border-b border-b-gray-300 justify-between items-center py-2 pb-3'>
      {/* logo  */}
      <div>
        <img className='h-16 sm:w-auto' src="/assets/assets_frontend/logo.png" alt="Logo" />
      </div>

      {/* pages links  */}
      <ul className='hidden gap-x-4 lg:flex'>
        <li>
          <NavLink className={'uppercase text-md '} to={'/'}>Home
          <span className='w-[80%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px] m-auto hidden' ></span>
          </NavLink>
        </li>
        <li>
          <NavLink className={'uppercase text-md'} to={'/all-doctors'}>All Doctors
          <span className='w-[80%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px] m-auto hidden' ></span>
          </NavLink>
         
        </li>
        <li>
          <NavLink className={'uppercase text-md'} to={'/about'}>About Us
          <span className='w-[80%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px] m-auto hidden' ></span>
          </NavLink>
         
        </li>
        <li>
          <NavLink className={'uppercase text-md'} to={'/contact'}>Contact Us
          <span className='w-[80%] mt-2 border-2 bg-yellow-500 border-yellow-500 h-[5px] m-auto hidden' ></span>
          </NavLink>
         
        </li>
      </ul>

      {/* sign up or user image  */}
      <div className='flex items-center gap-x-2'>
        {
          !isAuthenticated &&  <button onClick={()=>Navigate('/signup')} className='md:py-3 py-2 px-3 text-sm md:px-6 bg-yellow-400 text-white font-semibold rounded-full'>Create Account</button>
        }
        {
          isAuthenticated && <UserInfoCard />
        }
        
        {/* drawer icon for small devices  */}
        <div className='lg:hidden' onClick={() => setOpen(true)}>
          <CgMenuLeftAlt className='h-7 w-7' />
        </div>
      </div>

      {/* drawer for small and medium devices  */}
      <Drawersm open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
