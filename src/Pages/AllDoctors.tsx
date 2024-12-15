import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout.tsx';
import Navbar from '../Components/Navbar.tsx';
import FilterButton from '../Components/Subcomponents/FilterButton.tsx';
import Footer from '../Components/Footer.tsx';
import DoctorCard from '../Components/Subcomponents/DoctorCard.tsx';
import { CircularProgress } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDoctors } from '../Store/Slices/User/DoctorSlice.ts'; // Adjust path as necessary
import SelectDropdown from '../Components/SelectDropdown.tsx';
import { useLocation } from 'react-router';

const AllDoctors = () => {
    const dispatch = useDispatch();
    const {state}=useLocation();
    const { doctors, loading } = useSelector(state => state.doctor);
    const [allDoctors, setAllDoctors] = useState([]); // Store all doctors
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Store filtered doctors
    const [FilterSpeciality, setFilterSpeciality] = useState(state ? state.title : 'All Doctors');
    
   
    // Updated specialties without "All Doctors" for side buttons
    const specialties = ["General Physician", "Dermatologist", "Gynecologist", "Gastroenterologist", "Neurologist", "Pediatricians"];

    // Fetch all doctors on mount
    useEffect(() => {
        dispatch(getAllDoctors());
    }, [dispatch]);

    // Update allDoctors and filteredDoctors when doctors data changes
    useEffect(() => {
        if (!loading && doctors.length > 0) {
            setAllDoctors(doctors);
            setFilteredDoctors(doctors); // Initialize filtered doctors
        }
    }, [doctors, loading]);

    // Filter doctors based on selected specialty
    useEffect(() => {
        if (FilterSpeciality === "All Doctors") {
            setFilteredDoctors(allDoctors); // Show all doctors
        } else {
            const filtered = allDoctors.filter(doctor => doctor.speciality === FilterSpeciality);
            setFilteredDoctors(filtered);
        }
    }, [FilterSpeciality, allDoctors]);

    return (
        <Layout>
            <Navbar />
            <main className='min-h-[80vh] relative'>
                <div className='py-10 flex items-center justify-between'>
                    <h3 className='text-gray-500 md:text-md ms-2'>Browse Through the Doctor Specialists</h3>
                    <div className='relative block lg:hidden w-[300px]'>
                        {/* Mobile filter menu */}
                        <SelectDropdown 
                            label={'All Doctors'}
                            dropdownlist={["All Doctors", ...specialties]} // Include "All Doctors" in dropdown
                            value={FilterSpeciality}
                            onChange={(value) => setFilterSpeciality(value)}
                        />
                    </div>
                </div>

                {/* Doctor grid display */}
                <div className='grid lg:grid-cols-5 gap-x-10'>
                    {/* Filter button column without "All Doctors" */}
                    <div className='col-span-1 lg:flex gap-y-3 flex-col hidden'>
                        {specialties.map((specialty) => (
                            <FilterButton 
                                key={specialty} 
                                value={FilterSpeciality} 
                                setValue={setFilterSpeciality} 
                                btnValue={specialty} 
                            />
                        ))}
                    </div>

                    {/* Doctors display column */}
                    <div className='col-span-4 grid gap-6 xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:pr-5 px-3 sm:px-0'>
                        {loading ? (
                            <LoadingSpinner />
                        ) : filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor, index) => (
                                <DoctorCard key={index} item={doctor} />
                            ))
                        ) : (
                            <NoDoctorsMessage />
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </Layout>
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
    <div className='col-span-5 flex justify-center items-center w-full h-full'>
        <p className='text-center text-lg'>You Have No Doctors Yet</p>
    </div>
);

export default AllDoctors;
