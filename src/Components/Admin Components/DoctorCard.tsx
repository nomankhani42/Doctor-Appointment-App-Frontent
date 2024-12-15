import React, { useState } from 'react';
import docImage from '../../assets/assets_frontend/doc1.png';
import { changeDoctorAvailablity } from '../../Store/Slices/User/DoctorSlice.ts';
import { useDispatch } from 'react-redux';

const DoctorCard = ({ item }) => {
  const [checked, setCheck] = useState(item.availablity);
  const dispatch = useDispatch();

  const handleChange = (e, id) => {
    const newChecked = !checked;  // Get the new state of the checkbox
    setCheck(newChecked);  // Update the local state
    dispatch(changeDoctorAvailablity({ id, checked: newChecked }));  // Pass the new state to Redux
  };

  return (
    <div>
      {/* This is the main view of doctor card */}
      <div className="group rounded-md overflow-hidden border border-slate-200 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        {/* Image div */}
        <div className="bg-[#f2f5fa] transition-colors duration-200 group-hover:bg-blue-500">
          <img className="w-full h-200 object-cover" src={item.photo || docImage} alt="Doctor" />
        </div>
        {/* Content view */}
        <div className="py-6 px-5">
          {/* Name of the doctor */}
          <h2 className="text-[20px] font-semibold text-gray-800">
            {item.doctorName}
          </h2>
          {/* Specialty of the doctor */}
          <h6 className="py-1 text-slate-400">{item.speciality}</h6>
          {/* Availability of the doctor checkbox */}
          <div className="flex items-center gap-x-2 py-1">
            <label htmlFor={`checkbox-${item._id}`} className="flex items-center cursor-pointer">
              <span className="mr-2">Available</span>
              {/* Custom checkbox */}
              <input
                type="checkbox"
                id={`checkbox-${item._id}`}
                checked={checked}
                onChange={(e) => handleChange(e, item._id)}
                className="hidden" // Hide the default checkbox
              />
              <span
                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 
                  ${checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-400'} 
                  flex items-center justify-center`}
              >
                {checked && (
                  <span className="w-4 h-4 bg-white rounded-full"></span> // Checkmark circle
                )}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
