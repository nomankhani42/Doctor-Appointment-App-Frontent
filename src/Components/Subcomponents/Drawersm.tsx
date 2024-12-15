import React from 'react';
import Drawer from '@mui/material/Drawer';
import { IoMdClose } from "react-icons/io";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../Store/Slices/User/UserSlice.ts';

const Drawersm = ({ open, setOpen }) => {
  const dispatch=useDispatch();
  const Navigate=useNavigate();
  const {user,isAuthenticated,loading}=useSelector(state=>state.user);
  // Handle closing the drawer
  const handleClose = () => {
    setOpen(false);
  };


  // logout handle from this drawer 
  const logoutHandle=()=>{
         dispatch(logout())
         Navigate('/login')

  }

  return (
    <Drawer className=' lg:hidden' anchor='right' open={open} onClose={handleClose}>
      <div className=' w-[80vw] sm:w-[40vw]'>
          {/* close icon  */}
          <div>
          <IoMdClose color='black' onClick={handleClose} className='block ml-auto mr-5 mt-4 h-5 w-5' />
          </div>
          {/* this div shows pages user can after login and picture name email Id as well(user info till medium devices)  */}
        {
          isAuthenticated &&
          <div>
          {/* this is name and photo div  */}
          <div className=' flex justify-between items-center px-5'>
                {/* this is photo div  */}
                  <div>
                  <img className='w-16 h-16 rounded-full ' src={user.photo ||"/assets/assets_frontend/profile_pic.png"} alt="Logo" />
                  </div>
                  {/* this is name heading 4 and email ID div  */}
                   <div>
                   <h4 className='text-lg uppercase font-semibold'>{user.FullName}</h4>
                   <p>{user.emailID}</p>
                   </div>

          </div>
          {/* this is div link pages for eg when user isAuthenticated then he can also visit their profle and appointment that he books */}
       <div className=' border-y mx-5 my-2'>
              <ul className=' flex flex-col pb-4 mt-10 px-5 gap-y-5'>
               <li>
                 <Link to={'/profile'} className='text-lg uppercase'>My Profile </Link>
               </li>
               <li>
                 <Link to={'/profile/my-appointments'} className='text-lg uppercase'>My Appointments</Link>
               </li>
              </ul>
       </div>
   </div>
        }

        {/* this is menu list  */}
         {/* pages links  */}
      <ul className='flex flex-col text-base gap-y-3  pt-10'>
        <li>
          <NavLink className={'pl-4 uppercase transition-all duration-500 hover:bg-[#e9f7ec] block text-lg py-2 text-black text-md '} to={'/'}>Home
          <span className='w-[50%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px]  hidden' ></span>
          </NavLink>
        </li>
        <li>
          <NavLink className={'pl-4 uppercase text-md transition-all duration-500 hover:bg-[#e9f7ec] block text-lg py-2'} to={'/all-doctors'}>All Doctors
          <span className='w-[50%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px]  hidden' ></span>
          </NavLink>
        </li>
        <li>
          <NavLink className={'pl-4 uppercase text-md transition-all duration-500 hover:bg-[#e9f7ec] block text-lg py-2'} to={'/about'}>About Us
          <span className='w-[50%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px]  hidden' ></span>
          </NavLink>
        </li>
        <li>
          <NavLink className={'pl-4 uppercase text-md transition-all duration-500 hover:bg-[#e9f7ec] block text-lg py-2'} to={'/contact'}>Contact Us
          <span className='w-[50%] border-2 mt-2 bg-yellow-500 border-yellow-500 h-[5px]  hidden' ></span>
          </NavLink>
        </li>
      </ul>
     {
isAuthenticated && 
<div className='  border-t mt-10 border-gray-200 mx-4 '>
<button onClick={logoutHandle} className='py-3 rounded-sm mt-4 w-full uppercase bg-yellow-500 outline-none border-none font-semibold text-white'>Logout</button>
</div>
     }
      </div>
    </Drawer>
  );
};

export default Drawersm;
