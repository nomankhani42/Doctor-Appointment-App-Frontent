import React from 'react';

const SlotDayCard = ({ weekDay, getAppointmnet, setAppointmnet }) => {
   

   // Check if the current weekDay is selected
   const isSelected = weekDay.dayName + ' ' + weekDay.dayDate === getAppointmnet;
  
   return (
      <div 
         onClick={() => setAppointmnet(weekDay.dayName + ' ' + weekDay.dayDate)} 
         className={`py-6 cursor-pointer px-3 font-semibold flex flex-col gap-y-1 border border-gray-300 rounded-full 
            ${isSelected ? 'bg-yellow-500 text-white' : 'text-gray-700'}`}
      >
         <div className='uppercase text-center'>
            {weekDay.dayName}
         </div>
         <div className='text-center text-sm'>
            {weekDay.dayDate}
         </div>
      </div>
   );
}

export default SlotDayCard;
