import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const SelectDropdown = ({ label, dropdownlist, onChange, value }) => {
    const dropdownVariants = {
        open: { 
            opacity: 1, 
            height: "auto", 
            scale: 1, 
            transition: { 
                duration: 0.4, 
                ease: "easeInOut" // Smooth easing
            } 
        },
        closed: { 
            opacity: 0, 
            height: '0px', 
            scale: 0.9, // Slightly scale down
            transition: { 
                duration: 0.3, 
                ease: "easeInOut" // Smooth easing
            } 
        },
    };

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = (event) => {
        event.preventDefault(); // Prevent default action
        setIsOpen(prev => !prev);
    };

    const handleSelect = (selectedValue) => {
        onChange(selectedValue); // Call Formik's onChange
        setIsOpen(false); // Close dropdown on selection
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                type="button" // Prevents form submission
                className="flex justify-between py-3 items-center w-full bg-white border border-gray-300 rounded-sm shadow-sm px-4 text-sm font-medium text-gray-700"
            >
                {value ? <span>{value}</span> : <span className='text-slate-300'>{label}</span>}
                {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            {/* Dropdown menu */}
            <motion.div
                key={isOpen} // Force reflow on state change
                initial={false}
                animate={isOpen ? "open" : "closed"}
                transition={{
                    delay:500,
                    duration:500
                }}
                variants={dropdownVariants}
                className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-[1000] overflow-hidden" // Add overflow-hidden
            >
                <div className="py-1">
                    {dropdownlist.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`cursor-pointer px-4 py-2 text-sm 
                                ${value === option ? 'bg-slate-300' : 'hover:bg-gray-100'}`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SelectDropdown;
