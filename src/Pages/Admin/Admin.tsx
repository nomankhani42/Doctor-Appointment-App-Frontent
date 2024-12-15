import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '../../Components/Admin Components/AdminLayout.tsx';
import InfomationCard from '../../Components/Admin Components/InfomationCard.tsx';
import LatestAppointmentCard from '../../Components/Admin Components/LatestAppointmentCard.tsx';
import { getAllAppointments,cancelAppointment } from '../../Store/Slices/User/AppointmentSlice.ts';
import { CircularProgress } from '@mui/material'; // Import Material UI CircularProgress
import { yellow } from '@mui/material/colors'; // Import color for spinner

const Admin = () => {
  const { user } = useSelector(state => state.user);
  const { doctors } = useSelector(state => state.doctor);
  const { getPatientAppointmentsLoading, AllAppointments } = useSelector(state => state.appointment);
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    // Handle the cancellation logic here
   
    dispatch(cancelAppointment({id})).unwrap();
    dispatch(getAllAppointments());
    
  };

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch]);

  // Get the last 3 appointments
  const lastThreeAppointments = AllAppointments.slice(-3);

  return (
    <AdminLayout>
      <div className='w-[60%]'>
        {/* Information section */}
        <div className='grid grid-cols-3 gap-5'>
          <InfomationCard iconImg={'/assets/assets_admin/doctor_icon.svg'} count={doctors.length} title={'Doctors'} />
          <InfomationCard iconImg={'/assets/assets_admin/appointments_icon.svg'} count={AllAppointments.length} title={'Appointments'} />
          <InfomationCard iconImg={'/assets/assets_admin/patients_icon.svg'} count={5} title={'Patients'} />
        </div>

        {/* Latest Appointments section */}
        <div className='py-5'>
          <div className='bg-white border-slate-200 border rounded-sm'>
            {/* Heading for Latest Appointments */}
            <div className='px-5 border-b border-slate-200 py-8 flex items-center gap-6'>
              <div>
                <img src="/assets/assets_admin/list_icon.svg" alt="" />
              </div>
              <div>
                <h2 className='text-xl font-[600]'>Latest Appointments</h2>
              </div>
            </div>

            {/* Latest Appointments View */}
            <div className='py-8 px-5 flex flex-col gap-5'>
              {getPatientAppointmentsLoading ? (
                <LoadingSpinner /> // Show loading spinner if appointments are being fetched
              ) : lastThreeAppointments.length > 0 ? (
                lastThreeAppointments.map((item) => (
                  <LatestAppointmentCard key={item._id} handleCancel={handleCancel} item={item} /> // Pass item prop to LatestAppointmentCard
                ))
              ) : (
                <NoAppointmentsMessage /> // Show message if no appointments are available
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className='flex justify-center items-center w-full h-full'>
    <CircularProgress sx={{ color: yellow[600] }} />
  </div>
);

// No Appointments Message Component
const NoAppointmentsMessage = () => (
  <div className='flex justify-center items-center w-full h-full'>
    <p className='text-center text-lg'>No appointments available.</p>
  </div>
);

export default Admin;
