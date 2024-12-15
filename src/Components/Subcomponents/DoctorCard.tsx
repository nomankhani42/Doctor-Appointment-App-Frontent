import React from 'react';
import { GoDotFill } from "react-icons/go";
import { useNavigate } from 'react-router';


const DoctorCard = ({item}) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/doctor/${item._id}`)}>
      {/* Card with hover effect */}
      <div className='border rounded-lg overflow-hidden pb-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg'>
        <div>
          <img className='bg-[#e9f7ec] transition-opacity duration-300 ease-in-out' src={item.photo} alt="" />
        </div>
        {/* Content heading, specialty, etc. */}
        <div className='flex items-center gap-x-1 m-2'>
          <GoDotFill color='#3df26d' />
          <span className='text-[#3df26d]'>Available</span>
        </div>
        <div className='m-2'>
          {/* Name of the doctor */}
          <h2 className='sm:text-xl text-md font-semibold'>{item.doctorName}</h2>
          {/* Specialty of the doctor */}
          <h6 className='text-sm text-gray-700'>
            {item.speciality}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard;
