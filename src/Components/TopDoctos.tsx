import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../Store/Slices/User/DoctorSlice.ts'; // Adjust the import based on your file structure
import { CircularProgress } from '@mui/material';
import { yellow } from '@mui/material/colors';
import DoctorCard from './Subcomponents/DoctorCard';

const TopDoctors = () => {
    const dispatch = useDispatch();
    const { doctors, loading } = useSelector(state => state.doctor); // Ensure you have a 'doctors' state

    // Fetch all doctors on component mount
    useEffect(() => {
        const response= dispatch(getAllDoctors()).unwrap();
    }, [dispatch]);

    // Limit the number of doctors displayed (e.g., top 5)
    const topDoctors = doctors.slice(0, 5); // Adjust the number to control how many doctors you want to display

    return (
        <div className='py-10'>
            <div>
                <h2 className='text-2xl font-semibold text-center'>Top Doctors To Book</h2>
                <p className='py-1 text-center text-gray-500'>Simply Browse Through Our Extensive List Of Doctors</p>
            </div>

            {/* Here are our doctor list */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8 gap-4 px-2 sm:px-0 my-10'>
                {loading ? (
                    <LoadingSpinner />
                ) : topDoctors.length > 0 ? (
                    topDoctors.map((doctor, index) => (
                        <DoctorCard key={index} item={doctor} />
                    ))
                ) : (
                    <NoDoctorsMessage />
                )}
            </div>

            {/* Button to see more doctors or complete doctor list */}
            <button className='m-auto block py-4 text-gray-600 px-14 rounded-full bg-[#e9f7ec]'>
                More
            </button>
        </div>
    );
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className='col-span-5 flex justify-center items-center w-full h-full'>
        <CircularProgress sx={{ color: yellow[600] }} />
    </div>
);

// No Doctors Message Component
const NoDoctorsMessage = () => (
    <div className='flex justify-center items-center w-full h-full'>
        <p className='text-center text-lg'>No Top Doctors Available at the Moment</p>
    </div>
);

export default TopDoctors;
