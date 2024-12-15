import AdminLayout from '../../Components/Admin Components/AdminLayout.tsx';
import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointments,cancelAppointment } from '../../Store/Slices/User/AppointmentSlice.ts';
import { yellow } from '@mui/material/colors'; // Import color for spinner

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const { AllAppointmentsLoading, AllAppointments } = useSelector(state => state.appointment);


  const handleCancel = (id) => {
    // Handle the cancellation logic here
   
    dispatch(cancelAppointment({id})).unwrap();
    dispatch(getAllAppointments());
    
  };

  useEffect(() => {
    dispatch(getAllAppointments());
  }, [dispatch,cancelAppointment]);

  return (
    <AdminLayout>
      {/* heading of the page  */}
      <h2 className='text-lg text-gray-800 font-[550]'>All Appointments</h2>
      {/* this is main view of appointments lists  */}
      <div className='mt-8 w-[90%]  bg-white'>
        {/* here are we using material table to show the appointment list  */}
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}> {/* Remove shadow */}
          <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Patient</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Department</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date & Time</TableCell> {/* Combined header */}
                <TableCell style={{ fontWeight: 'bold' }}>Doctor</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Fee</TableCell>
                <TableCell></TableCell> {/* Empty cell for spacing */}
              </TableRow>
            </TableHead>
            <TableBody>
              {AllAppointmentsLoading ? ( // Show loading spinner while appointments are loading
                <LoadingSpinner />
              ) : AllAppointments.length > 0 ? AllAppointments.map((item, index) => (
                <TableRow key={item._id} sx={{ borderBottom: index === AllAppointments.length - 1 ? 'none' : undefined }}> {/* Remove border for last row */}
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-x-2'>
                      {/* patient img */}
                      <span>
                        <img className='h-14 w-14 rounded-full' src={item.patient.photo} alt="" />
                      </span>
                      {/* patient name */}
                      <span>Sir {item.patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.patient.age}</TableCell>
                  <TableCell>{item.dateTime}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-x-2'>
                      {/* doctor img */}
                      <span>
                        <img className='h-14 w-14 rounded-full' src={item.doctor.photo} alt="" />
                      </span>
                      {/* doctor name */}
                      <span>Sir {item.doctor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.fee}</TableCell>
                  <TableCell>
                   
                    {item.status==='cancelled'? 
                      <span className=' text-red-500 font-semibold text-sm'>Cencelled</span>
                    : item.status==='completed' 
                    ? <div className=' text-center text-green-500 font-semibold'>Completed</div> :
                    
                    <button onClick={() => handleCancel(item._id)}>
                      <img src="/assets/assets_admin/cancel_icon.svg" alt="" />
                    </button>}
                  </TableCell>
                </TableRow>
              )) : (
                <NoAppointmentsMessage /> // Handle case where no appointments are found
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <TableRow>
    <TableCell colSpan={8} align="center"> {/* Span across all columns */}
      <CircularProgress sx={{ color: yellow[600] }} /> {/* Adjust color as needed */}
    </TableCell>
  </TableRow>
);

// No Appointments Message Component
const NoAppointmentsMessage = () => (
  <TableRow>
    <TableCell colSpan={8} align="center"> {/* Span across all columns */}
      <p className='text-center text-lg'>No appointments found.</p>
    </TableCell>
  </TableRow>
);

export default AdminAppointments;
