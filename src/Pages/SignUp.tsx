import React from 'react';
import Layout from '../Components/Layout.tsx';
import Navbar from '../Components/Navbar.tsx';
import { Link, useNavigate } from 'react-router-dom';
import {signupSchema} from '../Validation/index.ts';
import { useFormik } from 'formik';
import {newUser} from '../Store/Slices/User/UserSlice.ts'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { yellow } from '@mui/material/colors';

const SignUp = () => {
      const {signUpLoading} =useSelector(state=>state.user);
      const navigate=useNavigate();
      
      const dispatch=useDispatch();
      const onSubmit=async(values)=>{
                   // Dispatch the newUser action and wait for the result
    const result = await dispatch(newUser({ ...values })).unwrap();

    // If sign up is successful, navigate to login page
    navigate('/login');
      }                
  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:{
     FullName:'',
     emailID:'',
     password:''
    },
    validationSchema:signupSchema,
    onSubmit
   });

   
  return (
     <Layout>
         <Navbar />

         {/* this is signup form  */}
         <form onSubmit={handleSubmit} action="" className=' p-10  sm:max-w-[450px] w-[90vw] shadow-yellow-200 shadow-sm border border-gray-200 rounded-lg  m-auto my-16'>
                <h2 className=' text-xl font-semibold uppercase text-black'>Create Account</h2>
                <p className='py-4 text-gray-800'>Please Sign Up to Book An Appointment</p>

                <div>
                      <label className='' htmlFor="FullName ">Full Name</label>
                      <input name='FullName' value={values.Full_Name} onChange={handleChange} onBlur={handleBlur} id='FullName' type="text" className='mt-2 block py-2 rounded-md px-4 w-full border border-gray-200 focus:outline-none' />
                      {errors.FullName && touched.FullName && <p className=' text-red-500 text-sm'>{errors.FullName}</p>}
                </div>
                <div className='pt-4'>
                      <label  htmlFor="emailID ">Email</label>
                      <input name='emailID' onBlur={handleBlur} onChange={handleChange} id='emailID' type="email" className='mt-2 block py-2 rounded-md px-4 w-full border border-gray-200 focus:outline-none' />
                      {errors.emailID && touched.emailID && <p className=' text-red-500 text-sm'>{errors.emailID}</p>}
                </div>
                <div className='pt-4'>
                      <label  htmlFor="Full_Name ">Password</label>
                      <input name='password' onChange={handleChange} onBlur={handleBlur} id='password' type="text" className='mt-2 block py-2 rounded-md px-4 w-full border border-gray-200 focus:outline-none' />
                      {errors.password && touched.password && <p className=' text-red-500 text-sm'>{errors.password}</p>}
                </div>
               {!signUpLoading ?  <div className='pt-4'>
                    <button type='submit' className=' py-3 bg-yellow-500 w-full   text-white rounded-md'>Create Account</button>
                </div>   : <div className='pt-4 flex justify-center items-center'>
        <CircularProgress sx={{ color: yellow[600] }} />
    </div>}
                <div className='py-5 pt-10'>
                    Already Have An Account? <Link to={'/login'} className='  text-yellow-600 underline'>Login Here</Link>
                </div>
         </form>
     </Layout>
  )
}

export default SignUp
