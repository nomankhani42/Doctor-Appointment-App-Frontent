import React from 'react';
import {logout} from '../../Store/Slices/User/UserSlice.ts'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const AdminNavbar = () => {
  const dispatch=useDispatch();
    const Navigate=useNavigate()

    const logoutfun=()=>{
        dispatch(logout())
        Navigate('/login')

    }
  return (
    <div className='py-3 pb-4 px-10 border-b border-b-slate-400'>
       {/* this is row div of the navbar  */}
         <div className=' flex justify-between'>
              {/* this is logo of admin dashboard of the navbar  */}
              <div className=' flex items-center gap-x-3'>
                     <img className='h-20 ' src="/assets/assets_admin/LOGO.png" alt="admin logo" />
                     {/* this is round like button from which we can see that this is admin or doctor dashboard  */}
                     <div className='py-1 px-5 rounded-full border border-slate-700'>
                              Admin
                     </div>
              </div>
              {/* this is the button from which the user will logout  */}
              <div>
                  <button className=' py-3 px-8 rounded-full bg-yellow-500 text-white' onClick={logoutfun}>Logout</button>
              </div>
         </div>
    </div>
  )
}

export default AdminNavbar
