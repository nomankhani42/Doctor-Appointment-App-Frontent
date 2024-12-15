import React from 'react';

const TimeSlotCard = ({ time, getTime, setTime }) => {
  // Check if the current time slot is selected
  const isSelected = time === getTime;

  return (
    <div 
      onClick={() => setTime(time)} 
      className={`py-2 cursor-pointer px-4 border border-gray-300 text-center rounded-full 
        ${isSelected ? 'bg-yellow-500 text-white' : 'text-gray-500'}`}
    >
      {time}
    </div>
  );
}

export default TimeSlotCard;
