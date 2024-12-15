import React from 'react';
import {editProfileAction} from '../Store/Slices/User/UserSlice.ts'
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
  const { user } = useSelector(state => state.user);
  const dispatch=useDispatch();

  // for date to show in profile 
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
  return (
    <div className='px-4 sm:px-0 pt-8'>
      {/* this is central div of the Component  */}
      <div>
        {/* this is user profile image div  */}
        <div className=' flex gap-x-4'>
          <img className='h-[180px] rounded-lg' src={user.photo || "/assets/assets_frontend/profile_pic.png"} alt="" />
         
        </div>
        {/* this is the name of the user div  */}
        <div>
          <h3 className=' text-2xl py-4 font-semibold'>{user.FullName}</h3>
        </div>
        {/* this is the user information container  */}
        <div className=' lg:w-1/3 border-t border-gray-400 pt-8'>
          {/* this is the contact information container  */}
          <h4 className=' text-[#9fa4a6] font-semibold  uppercase'>Contact Information</h4>
          {/* this is email of the user   */}
          <div className=' pt-4 flex gap-x-20'>
            <span className=' font-semibold text-gray-700'>Email Id : </span>
            <span className=' text-cyan-500 font-semibold'>{user.emailID}</span>
          </div>
          {/* this is phone  of the user   */}
          <div className=' pt-4 flex gap-x-20'>
            <span className=' font-semibold text-gray-700'>Phone :   </span>
            <span className=' text-cyan-500 font-semibold'>{user.phone}</span>
          </div>
          {/* this is Address  of the user   */}
          <div className=' pt-4 flex gap-x-16 items-center'>
            <p className=' font-semibold text-gray-700'>Address :</p>
            <div>
              {/* adress line 1 of the user  */}
              <p className=' text-gray-700'>{user.address1} </p>
              {/* adress line 2 of the user  */}
              <p className=' text-gray-700'>{user.address2} </p>
            </div>
            
         

          </div>
{/* this is the basic information of the user  */}
           <div className=' pt-4'>
                <h4 className=' text-[#9fa4a6] pb-5 font-semibold  uppercase'>Basic Information</h4>
                {/* this is gender  of the user   */}
          <div className=' pt-2 flex gap-x-20'>
            <span className=' font-semibold text-gray-700'>Gender : </span>
            <span className=' text-slate-600 '>{user.gender}</span>
          </div>
          {/* this is phone  of the user   */}
          <div className='pt-2 flex gap-x-16'>
            <span className=' font-semibold text-gray-700'>birthday :   </span>
            <span className=' text-slate-600 '>{formatDate(user.birthDay)}</span>
          </div>
           </div>

           {/* this is edit button from which the component change to edit component  */}
              <div className='pt-8'>
              <button onClick={()=>dispatch(editProfileAction(true))} className=' px-10 py-3 rounded-full border border-slate-400'>Edit</button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
