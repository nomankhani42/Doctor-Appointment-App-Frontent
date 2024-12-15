import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {changeEditState} from '../../Store/Slices/User/DoctorSlice.ts'
const DoctorBIO = () => {
    const { doctor } = useSelector((state) => state.user);
    const dispatch=useDispatch();
    return (
        <div className=' w-[60%] p-5 mt-5 my-4 bg-white rounded-md'>
            {/* this is the doctor name  */}
            <h2 className=' text-2xl py-2 font-semibold'>{doctor.doctorName}</h2>
            {/* this div is for doctor degree specialization and for years of experience  */}
            <div className=' text-base flex gap-x-2 items-center text-slate-600'>
                {/* this is for degree or for education  */}
                <span>{doctor.education} - </span>
                {/* this is for specialization  */}
                <span>{doctor.speciality}</span>
                {/* this is for years of experience  */}
                <span className=' text-sm'>{doctor.experience}</span>

            </div>
            {/* this view is for about of doctor  */}
            <div className=' pt-5'>
                <h5 className=' pb-2 font-bold'>About :</h5>
                <p className=' pr-10 text-slate-700'>{doctor.about}</p>
            </div>
            {/* this view is for appointment fee  */}
            <div>
                <h6 className='pt-5 font-semibold text-gray-800'>Appointment Fee : <span className='text-black font-bold'> RS {doctor.fees}</span></h6>
            </div>
            {/* this view is for address of clinic of the doctor  */}
            <div className='pt-5  flex gap-x-2 items-baseline'>
                   <h2 className=' font-semibold'>Address :</h2>
                   <div className=' flex flex-col gap-y-1'>
                      <p>{doctor.address1 } </p>
                      <p>{doctor.address2}</p>
                   </div>
            </div>
            {/* availability checkbox for the doctor  */}
              <div className=' flex gap-x-2 pt-5'>
                   <h2>Availablity : </h2>
                <h2 className=' font-semibold'>Yes</h2>
              </div>
              {/* eidt button through which the component change in profile page  */}
                <button onClick={()=>dispatch(changeEditState())} className='mt-4 px-8 py-2 hover:bg-yellow-500 hover:text-white transition-all duration-100 hover:border-none py-1 border rounded-full border-slate-700'>Edit </button>

        </div>
    )
}

export default DoctorBIO
