import InfomationCard from '../../Components/Admin Components/InfomationCard'
import LatestAppointmentCard from '../../Components/Admin Components/LatestAppointmentCard'
import DoctorLayout from '../../Components/Doctor Components/DoctorLayout'
import LatestAppointmentCardDoctor from '../../Components/Doctor Components/LatestAppointmentCardDoctor'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorAppointments, cancelAppointment, completeAppointment } from '../../Store/Slices/User/AppointmentSlice.ts';

const Doctor = () => {
  const { doctor } = useSelector((state) => state.user); // Get doctor details from the state
  const { doctorAppointments, doctorAppointmentsLoading } = useSelector((state) => state.appointment);
  const PatientCount=(new Set(doctorAppointments.map((item)=>item.patient.id))).size;
  const TotalEarning = doctorAppointments.reduce((total, item) => {
    if (item.status === 'completed') {
      total += item.fee;
    }
    return total;
  }, 0);
  
  const dispatch = useDispatch();

  const completeAppointmentHandle = async(id) => {
    await dispatch(completeAppointment({ id })).unwrap();
    // Re-fetch appointments after cancelling
    dispatch(getDoctorAppointments({ id: doctor._id }));
  }

  const cencelAppointmentHandle=async(id)=>{
    await dispatch(cancelAppointment({ id })).unwrap();
    // Re-fetch appointments after cancelling
    dispatch(getDoctorAppointments({ id: doctor._id }));
  }
  useEffect(() => {
    dispatch(getDoctorAppointments({ id: doctor._id }));
  }, []);

  const latestAppointment = doctorAppointments.slice(-4);
  return (
    <DoctorLayout>
      {/* this is the card from which we will see our 
      information how much doctor patients and appointments  */}
      <div className='   w-[60%]'>
        {/* this is div is for information  */}
        <div className=' grid grid-cols-3 gap-5'>
          <InfomationCard iconImg={'/assets/assets_admin/earning_icon.svg'} count={`RS ${TotalEarning}`} title={'Earnings'} />
          <InfomationCard iconImg={'/assets/assets_admin/appointments_icon.svg'} count={doctorAppointments.length} title={'Appointments'} />
          <InfomationCard iconImg={'/assets/assets_admin/patients_icon.svg'} count={PatientCount} title={'Patients'} />
        </div>
        {/* this div is for latest Appointments  */}
        <div className='py-5 '>
          {/* main view of this part  */}
          <div className='bg-white    border-slate-200 border rounded-sm'>
            {/* heading view of the latest Appointments  */}
            <div className='px-5 border-b border-slate-200 py-8 flex items-center gap-6'>
              {/* image View of latest icon  */}
              <div>
                <img src="/assets/assets_admin/list_icon.svg" alt="" />
              </div>
              {/* heading of the latest appointments  */}
              <div>
                <h2 className=' text-xl font-[600]'>Latest Bookings</h2>
                {/* this is the latest appointment view  */}

              </div>

            </div>
            {/* this the latest appointment view  */}
            <div className=' py-8 px-5 flex flex-col gap-5'>
              {
                latestAppointment.map((item) => {
                  return <LatestAppointmentCardDoctor key={item._id} picked item={item} cencelAppointmentHandle={cencelAppointmentHandle}  completeAppointmentHandle={completeAppointmentHandle} />
                })
              }

            </div>
          </div>

        </div>
      </div>
    </DoctorLayout>
  )
}

export default Doctor