import React from 'react';
import axios from 'axios';
import {makeAppointmentFee} from '../Store/Slices/User/AppointmentSlice.ts'
import { useDispatch } from 'react-redux';

const AppointmentCard = ({item,handleCancelAppointment}) => {
  const dispatch=useDispatch()

  const handleTestpayment=()=>{
    
        dispatch(makeAppointmentFee({
          payment:item.fee,
           doctorDetail:item.doctor
           ,Pid:item._id,
           appointmentDateTime:item.dateTime
          
          }))
     
    }
  return (
    <div>

      {/* this is main central div of the card which contain two colum and spaced between  */}
      <div className=' px-2 sm:px-0 flex lg:flex-row flex-col lg:justify-between lg:items-center lg:border-b-gray-300 lg:border-b py-8'>
        {/* this is doctor image and apoointemt detail  */}
        <div className=' sm:flex gap-x-4'>
          {/* this is doctor image div  */}
          <div>
            <img className='bg-[#e9f7ec] h-[200px] sm:h-[300px] lg:h-[220px] sm:w-[220px] w-full' src={item.doctor.photo} alt="" />
          </div>
          {/* this is appointment detail div  */}
          <div>
            {/* name of the doctor from which the user booked the appointment  */}
            <h2 className=' sm:text-xl text-base font-semibold'>{item.doctor.name}</h2>
            {/* speciality of the doctor  */}
            <h5 className=' text-gray-700 text-sm sm:text-lg pt-1'>{item.department}</h5>
            {/* address of the doctor clinic  */}
            <div className=' my-3'>
              <h5 className='text-lg text-gray-600 text-sm mb-3 sm:text-base font-semibold'>Address :</h5>
              {/* address line 1  */}
              <p className='py-1 text-gray-500 text-xs sm:text-base'>Building 245 Street 11</p>
               {/* address line 1  */}
               <p className='py-1 text-gray-500 text-xs sm:text-base'>Nazimabad Karachi Pakistan</p>
            </div>
            {/* date and time that the user select from the given indexes  */}
            <div className=' text-gray-500'>
                   {/* date and time*/}
                   <span className='font-semibold text-sm sm:text-base'>Date & Time : {item.dateTime} </span> 
            </div>
          </div>
        </div>
        {/* this action div for eg make payment and cencel appointment div  */}
       {
        item.payment=='online' && item.status=='pending'  ?  <div className='flex flex-col gap-y-4 sm:px-5 lg:px-0 mt-4'>
        <button disabled className=' md:px-14 py-3 text-green-600 border border-green-600  text-gray-700 '>PAID </button>
</div> :item.status=='pending' ? 
        <div  className=' flex flex-col gap-y-4 sm:px-5 lg:px-0 mt-4'>
        <button onClick={handleTestpayment} className=' md:px-14 py-3 rounded-sm bg-yellow-500 text-white '>Pay Online</button>
        <button onClick={()=>handleCancelAppointment(item._id)} className=' md:px-14 py-3 rounded-sm border border-slate-500 text-slate-500 '>Cencel</button>
        
      </div> 
      :item.status=='cancelled' ? 
      <div className='flex flex-col gap-y-4 sm:px-5 lg:px-0 mt-4'>
          <button disabled className=' md:px-14 py-3 rounded-sm border border-red-400 text-red-400 text-gray-700 '>Cencelled </button>
      </div>
        :
        <div className='flex flex-col gap-y-4 sm:px-5 lg:px-0 mt-4'>
                <button disabled className=' md:px-14 py-3 bg-green-500 text-white text-gray-700 '>Completed </button>
        </div>
       }
      </div>

    </div>
  )
}

export default AppointmentCard
