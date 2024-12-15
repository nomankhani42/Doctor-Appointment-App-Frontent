import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout.tsx';
import Navbar from '../Components/Navbar.tsx';
import { IoIosInformationCircleOutline } from "react-icons/io";
import SlotDayCard from '../Components/Subcomponents/SlotDayCard.tsx';
import TimeSlotCard from '../Components/Subcomponents/TimeSlotCard.tsx';
import DoctorCard from '../Components/Subcomponents/DoctorCard.tsx';
import Footer from '../Components/Footer.tsx';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleDoctorData, getRelatedDoctors } from '../Store/Slices/User/DoctorSlice.ts';
import { CircularProgress } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { BookAppointment } from '../Store/Slices/User/AppointmentSlice.ts';

const setWeekDayAndDate = (index) => {
    const date = new Date();
    let futureDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + index + 1);
    return {
        dayName: futureDate.toDateString().slice(0, 3),
        dayDate: futureDate.toDateString().slice(4, 10),
        fullyear: futureDate.getFullYear()
    };
}

const ageCalculator = (birthDate) => {
    const time = new Date();
    const birth = new Date(birthDate);
    const ageInYears = time.getFullYear() - birth.getFullYear();
    return ageInYears;
}

const DoctorDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { doctorDetail, doctorDetailsLoading, relatedDoctors } = useSelector(state => state.doctor);
    const { isAuthenticated, user } = useSelector(state => state.user);
    
    const { id } = useParams();
    const [AppointmentDayAndDate, setAppointmentDayAndDate] = useState(null);
    const [AppointmentTime, setAppointmentTime] = useState(null);
    const [dateErrorFlag, setDateErrorFlag] = useState(false);
    const [timeErrorFlag, setTimeErrorFlag] = useState(false);

    const bookAnAppointment = async () => {
        // Check authentication status
        if (!isAuthenticated) {
            console.log('User not authenticated. Navigating to login.'); // Log navigation attempt
            navigate('/login', {
                state: location.pathname  // State can be more descriptive
            });
            return; // Exit the function if not authenticated
        }
        

        if (!user.photo || !user.birthDay) {
            console.log('User details are incomplete. Navigating to profile...');
            navigate('/profile', {
                state: location.pathname
            });
            return; // Exit the function if user details are missing
        }

        // Check if a date has been selected
        if (!AppointmentDayAndDate) {
            setDateErrorFlag(true);
            return; // Exit if no date is selected
        } else {
            setDateErrorFlag(false); // Clear error if date is selected
        }

        // Check if a time has been selected
        if (!AppointmentTime) {
            setTimeErrorFlag(true);
            return; // Exit if no time is selected
        } else {
            setTimeErrorFlag(false); // Clear error if time is selected
        }

        const AppointmentData = {
            patient: {
                name: user.FullName,
                id: user._id,
                photo: user.photo,
                age: ageCalculator(user.birthDay),
            },
            department: doctorDetail.speciality,
            doctor: {
                name: doctorDetail.doctorName,
                id: doctorDetail._id,
                photo: doctorDetail.photo,
            },
            dateTime: `${AppointmentDayAndDate}, ${AppointmentTime}`,
            fee: doctorDetail.fees,
        };

        try {
            const response = await dispatch(BookAppointment(AppointmentData)).unwrap();
            console.log('Appointment booked successfully:', response);
            setAppointmentDayAndDate(null);
            setAppointmentTime(null);
        } catch (error) {
            console.error('Failed to book appointment:', error);
            // Handle the error (e.g., show a toast or alert)
        }
    };

    useEffect(() => {
        // Fetching the single doctor's data
        dispatch(getSingleDoctorData(id));
    }, [dispatch, id]);

    // Fetch related doctors when doctorDetail updates
    useEffect(() => {
        if (doctorDetail?.speciality) {
            dispatch(getRelatedDoctors(doctorDetail.speciality));
        }
    }, [dispatch, doctorDetail]);

    return (
        <Layout>
            <Navbar />
            {
                doctorDetailsLoading ? (
                    <div className='min-h-[65vh] grid place-content-center'>
                        <CircularProgress sx={{ color: yellow[600] }} />
                    </div>
                ) : (
                    <div>
                        <div className='lg:grid flex flex-col lg:grid-cols-8 mt-5 gap-5'>
                            <div className='col-span-2 order-last m-auto lg:m-0 lg:order-first h-[300px] lg:h-auto flex items-center justify-center rounded-xl overflow-hidden shadow-md'>
                                <img
                                    className='bg-yellow-400 h-full w-full object-cover rounded-xl transition-transform duration-300 transform hover:scale-105'
                                    src={doctorDetail.photo}
                                    alt="Doctor"
                                />
                            </div>
                            <div className="lg:col-span-6 mx-2 rounded-xl p-4 md:p-6 border border-gray-200">
                                <h2 className='text-lg sm:text-xl md:text-2xl font-semibold'>{doctorDetail.doctorName}</h2>
                                <div className='py-2 text-gray-500 text-sm sm:text-lg md:text-lg'>
                                    {doctorDetail.education} - {doctorDetail.speciality}
                                    <span className='py-2 block w-fit my-2 px-4 border rounded-full border-gray-400'>{doctorDetail.experience}</span>
                                </div>
                                <div>
                                    <h5 className='flex font-semibold items-center gap-x-2 text-lg sm:text-xl md:text-xl'>
                                        About <IoIosInformationCircleOutline className='text-xl' />
                                    </h5>
                                    <p className='md:w-[90%] py-3 text-gray-500 text-sm sm:text-base md:text-lg'>{doctorDetail.about}</p>
                                    <h3 className='text-lg sm:text-xl md:text-xl text-gray-700'>
                                        Appointment Fee:
                                        <span className='font-semibold text-black text-lg sm:text-xl md:text-xl'>{doctorDetail.fees}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className='md:grid grid-cols-8 mt-5 gap-5'>
                            <div className='col-span-2 lg:block hidden'></div>
                            <div className='col-span-6 pl-4'>
                                <h5 className='text-gray-600 text-lg sm:text-xl md:text-xl font-semibold'>Booking Slots</h5>
                                <div className='flex mt-4 gap-4 flex-wrap'>
                                    {Array.from({ length: 7 }).map((_, index) => (
                                        <SlotDayCard
                                            key={index}
                                            getAppointmnet={AppointmentDayAndDate}
                                            setAppointmnet={setAppointmentDayAndDate}
                                            weekDay={setWeekDayAndDate(index)}
                                        />
                                    ))}
                                </div>
                                {dateErrorFlag && <p className='text-sm text-red-600 pt-2 pl-2'>Please Select a Date</p>}
                                <div className='flex gap-4 mt-5 flex-wrap'>
                                    {['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map(time => (
                                        <TimeSlotCard
                                            key={time}
                                            getTime={AppointmentTime}
                                            setTime={setAppointmentTime}
                                            time={time}
                                        />
                                    ))}
                                </div>
                                {timeErrorFlag && <p className='text-sm text-red-600 pt-2 pl-2'>Please Select a Time Slot</p>}
                                <div>
                                    <button onClick={bookAnAppointment} className='py-3 px-8 rounded-full text-white font-semibold mt-4 bg-yellow-500'>Book An Appointment</button>
                                </div>
                            </div>
                        </div>

                        <div className='my-20'>
                            <h2 className='text-2xl font-semibold text-center'>Related Doctors</h2>
                            <p className='text-gray-400 text-center py-4'>Simply browse through an extensive list of qualified doctors</p>
                            <div className='grid gap-6 my-5 xl:grid-cols-5 sm:grid-cols-3 grid-cols-2 sm:pr-5 px-3 sm:px-0'>
                                {relatedDoctors.map(doctor => (
                                    doctorDetail._id !== doctor._id && <DoctorCard key={doctor._id} item={doctor} />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer />
        </Layout>
    );
}

export default DoctorDetail;
