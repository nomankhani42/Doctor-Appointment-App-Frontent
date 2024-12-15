import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateDoctorProfile} from '../../Store/Slices/User/DoctorSlice.ts';

const EditDoctorBio = () => {
  // State to hold the doctor details
  const dispatch=useDispatch();
  const { doctor } = useSelector((state) => state.user);
  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: doctor.doctorName,
    education: doctor.education,
    speciality: doctor.speciality,
    experience: doctor.experience,
    about: doctor.about,
    fees: doctor.fees,
    address1: doctor.address1,
    address2: doctor.address2,
    availablity: doctor.availablity,
  });
  const onSubmit=(values)=>{
    dispatch(updateDoctorProfile({id:doctor._id,data:{...values}}))
  }

  // Handle input changes
  const {handleChange,values,handleBlur,handleSubmit}=useFormik({
    initialValues:doctorDetails,
    onSubmit
  })
  

  return (
    <div className='w-[43%] p-5 mt-5 my-4 bg-white rounded-md'>
      {/* Doctor Name (unchanged) */}
      <h2 className='text-2xl py-2 font-semibold'>{doctorDetails.doctorName}</h2>
      {/* Degree and Specialization (unchanged) */}
      <div className='text-base flex gap-x-2 items-center text-slate-600'>
        <span>{values.education} - </span>
        <span>{values.speciality}</span>
        <span className='text-sm'>{values.experience}</span>
      </div>
      <form onSubmit={handleSubmit}>
      {/* About Doctor */}
      <div className='pt-5'>
        <h5 className='pb-2 font-bold'>About:</h5>
        <textarea 
          className='pr-10 text-slate-700 border rounded-md p-2 w-full focus:outline-none focus:ring-0' // Remove outline and ring on focus
          name='about' 
          value={values.about} 
          onChange={handleChange} 
          rows='5'
           // Make it scrollable
        />
      </div>
      {/* Appointment Fee */}
      <div className='pt-5 flex  items-center gap-x-4'>
        <h6 className='font-semibold text-gray-800'>Appointment Fee:</h6>
        <input 
          type="number" 
          className='border rounded-md p-1 w-1/2 focus:outline-none focus:ring-0' // Remove outline and ring on focus
          name='fee' 
          value={values.fees} 
          onChange={handleChange} 
        />
      </div>
      {/* Address of Clinic */}
      <div className='pt-5 flex gap-x-2 items-baseline'>
        <h2 className='font-semibold'>Address:</h2>
        <div className='flex flex-col gap-y-1'>
          <input 
            type="text" 
            className='border rounded-md p-1 focus:outline-none focus:ring-0' // Remove outline and ring on focus
            name='address1' 
            value={values.address1} 
            onChange={handleChange} 
            placeholder='Address Line 1'
          />
          <input 
            type="text" 
            className='border rounded-md p-1 focus:outline-none focus:ring-0' // Remove outline and ring on focus
            name='address2' 
            value={values.address2} 
            onChange={handleChange} 
            placeholder='Address Line 2'
          />
        </div>
      </div>
      {/* Availability Checkbox */}
      <div className='flex gap-x-2 pt-5'>
        <input 
          type="checkbox" 
          name='availablity' 
          checked={values.availablity} 
          onChange={handleChange} 
        />
        <h2 className='font-semibold'>Available</h2>
      </div>
      {/* Save Button */}
     
      <button type='submit'  className='mt-4 px-8  py-2 hover:bg-yellow-500 hover:border-none hover:text-white border rounded-full border-slate-700'>Save</button>
      </form>
    </div>
  );
}

export default EditDoctorBio;
