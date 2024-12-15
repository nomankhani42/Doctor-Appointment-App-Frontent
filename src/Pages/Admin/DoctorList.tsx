import AdminLayout from '../../Components/Admin Components/AdminLayout.tsx';
import DoctorCard from '../../Components/Admin Components/DoctorCard.tsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../../Store/Slices/User/DoctorSlice.ts';
import { CircularProgress } from '@mui/material';
import { yellow } from '@mui/material/colors';

const DoctorList = () => {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector(state => state.doctor);

  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className='grid grid-cols-5 gap-5 pr-8 pb-10 min-h-[65vh] w-full'>
        {loading ? (
          <LoadingSpinner />
        ) : (
          doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <DoctorCard key={index} item={doctor} />
            ))
          ) : (
            <NoDoctorsMessage />
          )
        )}
      </div>
    </AdminLayout>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className=' col-span-5 flex justify-center items-center w-full h-full'>
    <CircularProgress sx={{ color: yellow[600] }} />
  </div>
);

// No Doctors Message Component
const NoDoctorsMessage = () => (
  <div className='flex justify-center items-center w-full h-full'>
    <p className='text-center text-lg'>You Have No Doctors Yet</p>
  </div>
);

export default DoctorList;
