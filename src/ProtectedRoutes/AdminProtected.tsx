import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const AdminProtected = ({children}) => {
    const {user,role,isAuthenticated,loading}=useSelector(state=>state.user);
    
    if(!isAuthenticated ){
      return <Navigate to={'/'} />
  }
    if(isAuthenticated && role ==='admin'){
     return <Outlet />;
    }
    if(isAuthenticated && role ==='user'){
    return <Navigate to={'/'} />
    }
    if(isAuthenticated && role ==='doctor'){
     return <Navigate to={'/doctor'} />
    }
     return <Outlet /> ;
    
  }

export default AdminProtected
