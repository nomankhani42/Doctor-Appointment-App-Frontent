import Navbar from '../../Components/Navbar.tsx';
import Layout from '../../Components/Layout.tsx';
import React, { useEffect } from 'react';
import AppointmentCard from '../../Components/AppointmentCard.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientAppointments, confirmPayment } from '../../Store/Slices/User/AppointmentSlice.ts';
import { CircularProgress } from '@mui/material'; // Import Material UI CircularProgress
import { yellow } from '@mui/material/colors'; // Import color for spinner
import { cancelAppointment } from '../../Store/Slices/User/AppointmentSlice.ts'
import { useLocation } from 'react-router';
import toast from 'react-hot-toast';

const MyAppointments = () => {
  const location = useLocation();

  // Parse the query parameters from the URL
  const queryParams = new URLSearchParams(location.search);

  // Convert URLSearchParams to a plain object
  const params = Object.fromEntries(queryParams.entries());


  // Now you can destructure the object
  const { payment, Pid } = params;  // Extract specific query parameters

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { getPatientAppointmentsLoading, PatientAppointments } = useSelector(state => state.appointment);

  const getAppointmentData = async () => {
    if (payment) {
      toast.success('Payment Successfully Recevied');
      const response = await dispatch(confirmPayment({ id: Pid })).unwrap();
      dispatch(getPatientAppointments(user._id));
    }
    else {
      dispatch(getPatientAppointments(user._id));
    }
  }

  useEffect(() => {
    getAppointmentData()
  }, [dispatch, user._id]);

  const handleCancelAppointment = async (id) => {
    const response = await dispatch(cancelAppointment({ id })).unwrap();
    dispatch(getPatientAppointments(user._id));
  }

  return (
    <Layout>
      <Navbar />
      <h2 className="text-xl my-5 sm:pt-16 pt-4 text-gray-800">My Appointments</h2>
      {/* Appointment container */}
      <div className='mt-4 pt-4 border-t border-b-gray lg:flex flex-col grid grid-cols-2 gap-2'>
        {getPatientAppointmentsLoading ? ( // Show loading spinner when loading
          <LoadingSpinner />
        ) : PatientAppointments.length > 0 ? (
          PatientAppointments.slice().reverse().map((item) => (
            <AppointmentCard handleCancelAppointment={handleCancelAppointment} key={item._id} item={item} />
          ))
        ) : (
          <NoAppointmentsMessage /> // Handle the case where no appointments are found
        )}
      </div>
    </Layout>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className=' flex h-[40vh] justify-center items-center w-full h-full'>
    <CircularProgress sx={{ color: yellow[600] }} /> {/* Adjust color as needed */}
  </div>
);

// No Appointments Message Component
const NoAppointmentsMessage = () => (
  <div className=' flex justify-center items-center w-full h-full'>
    <p className='text-center text-lg'>You have no appointments scheduled.</p>
  </div>
);

export default MyAppointments;
