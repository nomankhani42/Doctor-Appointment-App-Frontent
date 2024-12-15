import React from 'react';
import { NavLink } from 'react-router-dom';

const SiderBar = () => {
  return (
    <div className='col-span-2 min-h-[89vh] h-auto border-r border-slate-400'>
      {/* Navigating buttons in this sidebar */}
      <ul className='pt-4 flex flex-col gap-y-4'>
        <li>
          <NavLink 
            to={'/admin/dashboard'} 
            className={({ isActive }) => 
              `flex gap-x-2 py-3 px-5 transition-colors ${isActive ? 'border-r-4  border-blue-500 bg-slate-50' : 'text-gray-800'}`
            }
          >
            <img src="/assets/assets_admin/home_icon.svg" alt="Home Icon" />
            <span className='text-lg'>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/admin/all-appointments'} 
            className={({ isActive }) => 
              `flex gap-x-2 py-3 px-5 transition-colors ${isActive ? 'border-r-4  border-blue-500 bg-slate-50' : 'text-gray-800'}`
            }
          >
            <img src="/assets/assets_admin/appointment_icon.svg" alt="Appointments Icon" />
            <span className='text-lg'>Appointments</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/admin/add-doctor'} 
            className={({ isActive }) => 
              `flex gap-x-2 py-3 px-5 transition-colors ${isActive ? 'border-r-4 border-blue-500 bg-slate-50' : 'text-gray-800'}`
            }
          >
            <img src="/assets/assets_admin/add_icon.svg" alt="Add Doctor Icon" />
            <span className='text-lg'>Add Doctor</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to={'/admin/all-doctors'} 
            className={({ isActive }) => 
              `flex gap-x-2 py-3 px-5 transition-colors ${isActive ? 'border-r-4  border-blue-500 bg-slate-50' : 'text-gray-800'}`
            }
          >
            <img src="/assets/assets_admin/people_icon.svg" alt="Doctor List Icon" />
            <span className='text-lg'>Doctor List</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SiderBar;
