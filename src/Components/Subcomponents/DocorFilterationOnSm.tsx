import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputAdornment } from '@mui/material';
import { FaUserMd, FaSkullCrossbones, FaHeartbeat, FaChild } from 'react-icons/fa';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

function AgeSelect() {
  const [age, setAge] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='block lg:hidden'>

      <FormControl >
        <Select className='md:w-[300px] w-[200px] me-3'
          id="demo-simple-select-2" // Ensure this ID is unique
          value={age}
        
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              {open ? <FaAngleUp className='cursor-pointer' /> : <FaAngleDown className='cursor-pointer' />}
            </InputAdornment>
          }
          IconComponent={null} // Remove default icon
          displayEmpty
          inputProps={{ 'aria-label': 'Select Age' }} // Accessibility improvement
        >
          <MenuItem value="">
            <em>All Doctors</em> {/* Optional placeholder */}
          </MenuItem>
          <MenuItem value={10}>General Physician</MenuItem>
          <MenuItem value={20}>Dermatologist</MenuItem>
          <MenuItem value={30}>Gynecologist</MenuItem>
          <MenuItem value={20}>Gastroenterologist</MenuItem>
          <MenuItem value={30}>Neurologist</MenuItem>
          <MenuItem value={20}>Pediatricians</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}

export default AgeSelect;
