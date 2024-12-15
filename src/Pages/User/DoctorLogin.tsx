import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser,loginDoctor } from '../../Store/Slices/User/UserSlice.ts';
import Layout from '../../Components/Layout.tsx';
import Navbar from '../../Components/Navbar.tsx';
import {DoctorLoginSchema} from '../../Validation/index.ts'
import { CircularProgress } from '@mui/material';
import { yellow } from '@mui/material/colors';

const DoctorLogin = () => {
    const {sigInLoading} =useSelector(state=>state.user);
    const dispatch = useDispatch();

    // submit login action 
    const onSubmit = async (values) => {
        dispatch(loginDoctor(values))
        
        // dispatch(logout());
    }
    // this is for server side 
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {

            email: '',
            password: ''
        },
        validationSchema: DoctorLoginSchema,
        onSubmit
    });


    return (
        <Layout>
            <Navbar />

            {/* this is signup form  */}
            <form onSubmit={handleSubmit} className=' p-10  sm:max-w-[450px] w-[90vw] shadow-yellow-200 shadow-sm border border-gray-200 rounded-lg  m-auto my-16'>
                <h2 className=' text-xl font-semibold uppercase text-black'>Doctor Login</h2>
                <p className='py-4 text-gray-800'>Please Login to Check Your Appointments </p>


                <div className='pt-4'>
                    <label htmlFor="email">Email</label>
                    <input name='email' id='emai' onChange={handleChange} onBlur={handleBlur} value={values.email} type="text" className='mt-2 block py-2 rounded-md px-4 w-full border border-gray-200 focus:outline-none' />
                    {errors.email && touched.email && <p className=' text-red-500 text-sm'>{errors.email}</p>}
                </div>
                <div className='pt-4'>
                    <label htmlFor="password">Password</label>
                    <input id='password' value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className='mt-2 block py-2 rounded-md px-4 w-full border border-gray-200 focus:outline-none' />
                    {errors.password && touched.password && <p className=' text-red-500 text-sm'>{errors.password}</p>}
                </div>
                <div className='pt-3 text-sm text-end pb-1 pt-10'>
                    If You Are Patient Then ? <Link to={'/login'} className='  text-yellow-600 underline'>Doctor Login</Link>
                </div>
                {!sigInLoading ?  <div className='pt-4'>
                    <button type='submit' className=' py-3 bg-yellow-500 w-full   text-white rounded-md'>LOGIN</button>
                </div>   : <div className='pt-4 flex justify-center items-center'>
        <CircularProgress sx={{ color: yellow[600] }} />
    </div>}
                <div className='py-5 pt-10'>
                    Not Have An Account? <Link to={'/signup'} className='  text-yellow-600 underline'>Create Account</Link>
                </div>
            </form>
        </Layout>
    )
}

export default DoctorLogin;
