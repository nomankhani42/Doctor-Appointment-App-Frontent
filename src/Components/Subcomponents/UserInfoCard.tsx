import React from 'react';
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link, useNavigate } from 'react-router-dom';
import {logout} from '../../Store/Slices/User/UserSlice';
import { useDispatch,useSelector } from 'react-redux';

const UserInfoCard = () => {
    const { user } = useSelector(state => state.user);

    const dispatch=useDispatch();
    const Navigate=useNavigate();

      // logout handle from this drawer 
  const logoutHandle=()=>{
    dispatch(logout())
    Navigate('/login')

}
  return (
    <div className=' hidden lg:block'>
    {/* central div  */}
    <div className='group relative transition-all duration-400'>
        {/* this is the div where user image and icon shown  */}
        <div className='flex items-center gap-x-2 cursor-pointer'>
            {/* image div  */}
            <div>
                <img className='w-14 h-14 rounded-full ' src={user.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"} alt="" />
            </div>
            {/* icon div  */}
            <div>
                <LiaAngleDownSolid className='h-4 text-gray-400' />
            </div>
        </div>
        {/* this is the div which will dropdown on group hover  */}
        <div className='absolute z-10 right-0 top-16 h-0 w-[240px] overflow-hidden bg-[#f7f5f0] transition-all duration-300 group-hover:h-auto group-hover:py-6'>
            {/* Dropdown content goes here */}
            <ul className=' flex flex-col gap-y-3 px-5'>
                <li>
                    <Link to={'/profile'}  className=' uppercase text-gray-500 transition-all duration-100 hover:text-black'>My Profile</Link>
                </li>
                <li>
                    <Link to={'/profile/my-appointments'} className=' uppercase text-gray-500 transition-all duration-100 hover:text-black'>My Appointments</Link>
                </li>
                <li>
                     <button onClick={logoutHandle} className=' uppercase text-gray-500 transition-all duration-100 hover:text-black'>Logout</button>
                </li>
            </ul>
        </div>
    </div>
</div>
  );
};

export default UserInfoCard;
