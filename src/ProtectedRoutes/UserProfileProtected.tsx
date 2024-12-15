import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const UserProfileProtected = () => {
    const {user,role,isAuthenticated,loading}=useSelector(state=>state.user);
    const location=useLocation();
    console.log(location.state)


    if(!isAuthenticated){
       return  <Navigate to={'/'} />;
    }
    if(isAuthenticated && role ==='user'){
      {/*location.state ? <Navigate to={location.state}  /> :*/}
         return  <Outlet />;
    }

     if(isAuthenticated && role ==='admin'){
       return <Navigate to={'/admin'} />
     }
   if(isAuthenticated && role ==='doctor'){
       return <Navigate to={'/doctor'} />
     }
     
       return <Navigate to={'/'} />;
}

export default UserProfileProtected
