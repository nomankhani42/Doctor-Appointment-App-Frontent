import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

const UserProtected = ({children}) => {
    const {user,role,isAuthenticated,loading}=useSelector(state=>state.user);
    const location=useLocation();
    console.log(location.state)



    if(isAuthenticated && role ==='admin'){
      return <Navigate to={'/admin'} />
    }

    if(isAuthenticated && role ==='doctor'){
      return <Navigate to={'/doctor'} />
    }
    
     if(!isAuthenticated){
        return  <Outlet />;
     }
     if(isAuthenticated && role ==='user'){
      return location.state ? <Navigate to={location.state}  /> : <Outlet />;
 }

      
   
      
        return <Outlet />;
    
 
}

export default UserProtected;
