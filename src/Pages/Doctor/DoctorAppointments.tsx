import React, { useEffect } from 'react';
import DoctorLayout from '../../Components/Doctor Components/DoctorLayout'; // Updated import statement
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorAppointments, cancelAppointment,completeAppointment } from '../../Store/Slices/User/AppointmentSlice.ts';
import { yellow } from '@mui/material/colors'; // Import color for spinner

const DoctorAppointments = () => {
  const { doctor } = useSelector((state) => state.user); // Get doctor details from the state
  const { doctorAppointments, doctorAppointmentsLoading } = useSelector((state) => state.appointment); // Get appointments and loading state
  const dispatch = useDispatch();

  // Handle appointment completion
  const handleCompleteAppointment = (id) => {
    dispatch(completeAppointment({ id }));
    // Re-fetch appointments after completing
    dispatch(getDoctorAppointments({ id: doctor._id }));
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (id) => {
    dispatch(cancelAppointment({ id }));
    // Re-fetch appointments after cancelling
    dispatch(getDoctorAppointments({ id: doctor._id }));
  };

  // Fetch doctor appointments on component mount
  useEffect(() => {
    if (doctor && doctor._id) {
      dispatch(getDoctorAppointments({ id: doctor._id }));
    }
  }, [dispatch, doctor]);

  return (
    <DoctorLayout>
      <h2 className="text-lg text-gray-800 font-[550]">All Appointments</h2>
      <div className="mt-8 w-[90%] min-h-[60vh] bg-white">
        <TableContainer component={Paper} elevation={0} sx={{ boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Patient</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Payment</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date & Time</TableCell> {/* Combined header */}
                <TableCell style={{ fontWeight: 'bold' }}>Fee</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorAppointmentsLoading ? ( // Show loading spinner while appointments are loading
                <LoadingSpinner />
              ) : doctorAppointments.length > 0 ? (
                doctorAppointments.map((item, index) => (
                  <TableRow key={item._id} sx={{ borderBottom: index === doctorAppointments.length - 1 ? 'none' : undefined }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        <img className="h-14 w-14 rounded-full" src={item.patient.photo || '/assets/assets_frontend/profile_pic.png'} alt="Patient" />
                        <span>Sir {item.patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="py-1 px-3 text-sm border border-slate-400 rounded-full">{item.payment}</span>
                    </TableCell>
                    <TableCell>{item.patient.age}</TableCell>
                    <TableCell>
                      {item.date}, {item.dateTime} {/* Date and time combined */}
                    </TableCell>
                    <TableCell>{item.fee}</TableCell>
                    <TableCell>
                      {item.status === 'cancelled' ? (
                        <span className="text-red-500 block text-center font-semibold text-sm">Cancelled</span>
                      ) : item.status === 'completed' ? (
                        <div className=' text-center text-green-500 font-semibold'>Completed</div>
                      ) : (
                        <div>
                          <button onClick={() => handleCancelAppointment(item._id)}>
                            <img src="/assets/assets_admin/cancel_icon.svg" alt="Cancel" />
                          </button>
                          <button onClick={() => handleCompleteAppointment(item._id)}>
                            <img src="/assets/assets_admin/tick_icon.svg" alt="Complete" />
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <NoAppointmentsMessage /> // Handle case where no appointments are found
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DoctorLayout>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <TableRow>
    <TableCell sx={{ border: 'none', paddingBlock: '40px' }} colSpan={7} align="center"> {/* Span across all columns */}
      <CircularProgress sx={{ color: yellow[600] }} size={50} />
    </TableCell>
  </TableRow>
);

// No Appointments Message Component
const NoAppointmentsMessage = () => (
  <TableRow>
    <TableCell colSpan={7} align="center"> {/* Span across all columns */}
      <p className="text-center text-lg">No appointments available</p>
    </TableCell>
  </TableRow>
);

export default DoctorAppointments;
