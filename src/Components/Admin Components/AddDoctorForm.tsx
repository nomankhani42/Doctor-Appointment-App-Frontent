import React from 'react';
import { useFormik } from 'formik';
import SelectDropdown from '../SelectDropdown';
import { addDoctorSchema } from '../../Validation/index.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctorToServer } from '../../Store/Slices/User/DoctorSlice.ts';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';

const AddDoctorForm = () => {
    const dispatch = useDispatch();

    const doctorState = useSelector((state) => state.doctor);  // Access the whole doctor state directly
    const { addDoctorLoading } = doctorState;  // Destructure addDoctorLoading from the state
    const navigate = useNavigate();
    
    const specialties = ["General Physician", "Dermatologist", "Gynecologist", "Gastroenterologist", "Neurologist", "Pediatricians"];
    const experiences = ['1 Year', '2 Year', '3 Year', '4 Year', '5 Year', 'More Than 5 Year'];

    // Handle form submission
    const onSubmit = async (values) => {
        const formData = new FormData();

        // Append each field to the FormData object
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        const action = await dispatch(addDoctorToServer(formData));
        
        // Check if action was fulfilled
        if (addDoctorToServer.fulfilled.match(action)) {
            // Redirect to /admin/all-doctors
            navigate('/admin/all-doctors');
        }
    };

    // Formik setup
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            doctorName: '',
            email: '',
            education: '',
            password: '',
            address1: '',
            address2: '',
            experience: '',
            fees: '',
            about: '',
            speciality: '',
            photo: null // This should be null for a file input
        },
        validationSchema: addDoctorSchema,
        onSubmit
    });

    // Handle photo upload
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFieldValue('photo', file); // Store the file object directly
        } else {
            setFieldValue('photo', null); // Set to null if no file is selected
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-[80%] mb-5 py-8 pl-8 pr-28 bg-white mt-5 border-slate-200 border'>
            {/* Photo Upload Section */}
            <div className='flex items-center gap-x-4 pb-4 cursor-pointer' onClick={() => document.getElementById('photoUpload').click()}>
                <img
                    src={values.photo ? URL.createObjectURL(values.photo) : "/assets/assets_admin/upload_area.svg"}
                    alt="Doctor"
                    className='w-24 h-24 object-cover rounded-full'
                />
                <div className='text-gray-700'>Upload Doctor <br />Photo</div>
            </div>
            <input
                type="file"
                id="photoUpload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
            />
            {errors.photo && touched.photo && <p className='text-red-500 text-sm'>{errors.photo}</p>}

            {/* Form Fields */}
            <div className='grid grid-cols-2 gap-x-6'>
                <div>
                    <label className='text-gray-500' htmlFor="doctorName">Doctor Name</label>
                    <input
                        type="text"
                        id="doctorName"
                        name="doctorName"
                        placeholder='Name'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.doctorName}
                    />
                    {errors.doctorName && touched.doctorName && <p className='text-red-500 text-sm'>{errors.doctorName}</p>}
                </div>
                <div>
                    <label className='text-gray-500 mb-1 block' htmlFor="speciality">Doctor Speciality</label>
                    <SelectDropdown
                        label={'Doctor Speciality'}
                        dropdownlist={specialties}
                        onChange={(value) => setFieldValue('speciality', value)}
                        value={values.speciality}
                    />
                    {errors.speciality && touched.speciality && <p className='text-red-500 text-sm'>{errors.speciality}</p>}
                </div>
            </div>

            <div className='mt-4 grid grid-cols-2 gap-x-6'>
                <div>
                    <label className='text-gray-500' htmlFor="email">Doctor Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                </div>
                <div>
                    <label className='text-gray-500' htmlFor="education">Doctor Education</label>
                    <input
                        type="text"
                        id="education"
                        name="education"
                        placeholder='Education'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.education}
                    />
                    {errors.education && touched.education && <p className='text-red-500 text-sm'>{errors.education}</p>}
                </div>
            </div>

            <div className='mt-4 grid grid-cols-2 gap-x-6'>
                <div>
                    <label className='text-gray-500' htmlFor="password">Doctor Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='Password'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {errors.password && touched.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                </div>
                <div>
                    <label className='text-gray-500' htmlFor="address1">Address</label>
                    <input
                        type="text"
                        id="address1"
                        name="address1"
                        placeholder='Address 1'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address1}
                    />
                    {errors.address1 && touched.address1 && <p className='text-red-500 text-sm'>{errors.address1}</p>}
                    <input
                        type="text"
                        id="address2"
                        name="address2"
                        placeholder='Address 2'
                        className='mt-4 w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address2}
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-x-6'>
                <div>
                    <label className='text-gray-500 mb-1 block' htmlFor="experience">Experience</label>
                    <SelectDropdown
                        label={'Experience'}
                        dropdownlist={experiences}
                        onChange={(value) => setFieldValue('experience', value)}
                        value={values.experience}
                    />
                    {errors.experience && touched.experience && <p className='text-red-500 text-sm'>{errors.experience}</p>}
                </div>
            </div>

            <div className='grid grid-cols-2 gap-x-6 pt-3'>
                <div>
                    <label className='text-gray-500' htmlFor="fees">Fees</label>
                    <input
                        type="number"
                        id="fees"
                        name="fees"
                        placeholder='Fees'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fees}
                    />
                    {errors.fees && touched.fees && <p className='text-red-500 text-sm'>{errors.fees}</p>}
                </div>
            </div>

            <div className='mt-4'>
                <div>
                    <label className='text-gray-500' htmlFor="about">About Doctor</label>
                    <textarea
                        rows={5}
                        id="about"
                        name="about"
                        placeholder='About Doctor Self'
                        className='w-full rounded-sm placeholder:text-gray-300 mt-2 py-2 focus:outline-none px-4 border-slate-300 border'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.about}
                    />
                    {errors.about && touched.about && <p className='text-red-500 text-sm'>{errors.about}</p>}
                </div>
            </div>

            {/* Submit Button */}
           {
            addDoctorLoading ? <CircularProgress color='yellow' className=' mt-4 ml-4 block' />
            :
            <button type="submit" className='mt-5 mb-5 py-3 px-8 rounded-full bg-yellow-500 text-white'>
                Add Doctor
            </button>
           }
        </form>
    );
};

export default AddDoctorForm;
