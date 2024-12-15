import React from 'react';
import SpecialityCard from './Subcomponents/SpecialityCard';

const SpecialityList = () => {
    return (
        <div className='mt-14'>
            <div className='lg:w-1/2 m-auto text-center'>
                <h2 className='text-2xl font-semibold mb-2'>Find By Speciality</h2>
                <p className='w-2/3 mx-auto text-gray-500 py-2'>
                    Simply browse through our extensive list of doctors and schedule your appointment hassle-free.
                </p>
            </div>

            <div className="py-10 flex justify-center overflow-x-auto scrollbar-hidden">
                <div className="flex items-center gap-x-4">
                    <SpecialityCard photo={'General_physician'} title={'General Physician'} />
                    <SpecialityCard photo={'Gastroenterologist'} title={'Gastroenterologist'} />
                    <SpecialityCard photo={'Gynecologist'} title={'Gynecologist'} />
                    <SpecialityCard photo={'Neurologist'} title={'Neurologist'} />
                    <SpecialityCard photo={'Pediatricians'} title={'Pediatricians'} />
                    <SpecialityCard photo={'Dermatologist'} title={'Dermatologist'} />
                </div>
            </div>


        </div>
    );
};

export default SpecialityList;
