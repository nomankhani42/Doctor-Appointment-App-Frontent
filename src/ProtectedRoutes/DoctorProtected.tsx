import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const DoctorProtected = ({children}) => {
    const {user,role,isAuthenticated,loading}=useSelector(state=>state.user);
    
    
    if(!isAuthenticated ){
        return <Navigate to={'/'} />
    }
    if(isAuthenticated && role ==='doctor'){
     return <Outlet />;
    }
    if(isAuthenticated && role ==='user'){
    return <Navigate to={'/'} />
    }
    if(isAuthenticated && role ==='admin'){
     return <Navigate to={'/admin'} />
    }

   
}

export default DoctorProtected
