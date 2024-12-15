import EditProfile from '../../Components/EditProfile.tsx';
import Layout from '../../Components/Layout.tsx';
import Navbar from '../../Components/Navbar.tsx';
import UserProfile from '../../Components/UserProfile.tsx';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const {editUserProfile}=useSelector(state=>state.user);

 
  
  return (
    <Layout>
        <Navbar />
           {/* <UserProfile /> */}
           {/* this is edit Profile component which will be rendered 
           when user clicked on edit button in user profile component 
            */}
            
             {
              editUserProfile ?   <EditProfile /> : <UserProfile />
             }
           
    </Layout>
        
  
  )
}

export default MyProfile;
