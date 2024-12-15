import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthentication } from '../Store/Slices/User/UserSlice.ts'; // Named import


const Layout = ({ children }) => {
  const token = useSelector(state => state.user.token);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  // Check authentication function
  const checkAuth = async() => {
    if (token) { // Only check if there is a token
      const response=await dispatch(checkAuthentication(token)).unwrap();
    }
  };

  useEffect(() => {
    checkAuth(); // Run authentication check on mount
  }, [token, dispatch]); // Add token and dispatch to dependency array

  return (
    <div className='layout-container xl:px-28 sm:px-5'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DoctorIo-Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
       {   children}
      
    
    </div>
  );
};

export default Layout;
