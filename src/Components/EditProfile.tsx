import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../Store/Slices/User/UserSlice.ts';
import { useLocation, useNavigate } from 'react-router';

const EditProfile = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const { user, editUserProfileLoading } = useSelector(state => state.user);
    const location =useLocation();
    const navigate=useNavigate();
    
    const dispatch = useDispatch();

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formik = useFormik({
        initialValues: {
            FullName: user.FullName || '', // Pre-fill the FullName field
            photo: user.photo || null, // Store file object for the photo
            address1: user.address1 || '', // Pre-fill address line 1
            address2: user.address2 || '', // Pre-fill address line 2
            gender: user.gender || '',
            birthDay: user.birthDay ? formatDate(user.birthDay) : '', // Format birthDay correctly
            phone: user.phone || 'Enter Phone Number', // Pre-fill phone number
        },
        validationSchema: Yup.object({
            FullName: Yup.string().required('Full Name is required'),
            address1: Yup.string().required('Address Line 1 is required'),
            address2: Yup.string(), // Optional field
            phone: Yup.string()
                .required('Phone number is required')
                .matches(/^\+?[0-9 ]*$/, 'Phone number is not valid'), // Validate phone number format
            gender: Yup.string().required('Gender is required'),
            birthDay: Yup.date()
                .required('Birthday is required')
                .nullable() // Allow null
                .transform(value => (value instanceof Date && !isNaN(value) ? value : null)), // Transform input to null if invalid
        }),
        onSubmit: async (values) => {
            // Create FormData to send the file and other form data
            const formData = new FormData();
            formData.append('FullName', values.FullName);
            formData.append('photo', values.photo); // Append the image file
            formData.append('address1', values.address1);
            formData.append('address2', values.address2);
            formData.append('gender', values.gender);
            formData.append('birthDay', values.birthDay);
            formData.append('phone', values.phone);

            // Dispatch the updateUserProfile action
         const res=await   dispatch(updateUserProfile({ id: user._id, formData })).unwrap();

         if (location.state) {
            navigate(location.state); // Navigate back to the previous location if available
        }
        },
    });

    // Handle file change
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            // Set the selected file to formik state
            formik.setFieldValue('photo', file);
            // Create a URL for the selected image to show a preview
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='pt-8 px-3 sm:px-0 pb-5'>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className='flex gap-x-4'>
                        <img
                            onClick={() => document.getElementById('photoupload').click()}
                            className='h-[180px] rounded-lg cursor-pointer'
                            src={ imagePreview ||user.photo || "/assets/assets_frontend/upload_area.png"} // Use preview or default image
                            alt="Upload Area"
                        />
                        <input 
                            type="file" 
                            id='photoupload' 
                            className='hidden' 
                            accept="image/*" // Allow only image files
                            onChange={handleFileChange} // Handle file change
                        />
                    </div>
                    <div className='py-4'>
                        <div>
                            <input
                                type="text"
                                name="FullName"
                                value={formik.values.FullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='border-none outline-none px-6 rounded-sm py-3 text-lg bg-slate-100'
                                placeholder='Full Name'
                            />
                            {formik.touched.FullName && formik.errors.FullName && (
                                <div className='text-red-500 mt-1 pl-1'>{formik.errors.FullName}</div>
                            )}
                        </div>
                    </div>
                    <div className='lg:w-1/3 border-t border-gray-400 pt-8'>
                        <h4 className='text-[#9fa4a6] font-semibold uppercase'>Contact Information</h4>
                        <div className='pt-4 flex gap-x-20'>
                            <span className='font-semibold text-gray-700'>Email Id :</span>
                            <span className='text-cyan-500 font-semibold'>{user.emailID}</span>
                        </div>
                        <div className='pt-4 flex gap-x-24 items-center'>
                            <div className='font-semibold text-gray-700'>Phone :</div>
                            <div className='flex flex-col w-full'>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='border-none outline-none px-4 rounded-sm py-2 text-base bg-slate-100 w-[70%]'
                                    placeholder='Phone Number'
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className='text-red-500 mt-1 pl-1 text-sm'>{formik.errors.phone}</div>
                                )}
                            </div>
                        </div>
                        <div className='pt-4 flex gap-x-20 items-center'>
                            <p className='font-semibold text-gray-700'>Address : </p>
                            <div className='flex flex-col w-full'>
                                <input
                                    type="text"
                                    name="address1"
                                    value={formik.values.address1}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='mb-3 border-none outline-none px-4 rounded-sm py-2 text-base bg-slate-100 w-[70%]'
                                    placeholder='Address Line 1'
                                />
                                {formik.touched.address1 && formik.errors.address1 && (
                                    <div className='text-red-500  pl-1 text-sm'>{formik.errors.address1}</div>
                                )}
                                <input
                                    type="text"
                                    name="address2"
                                    value={formik.values.address2}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='border-none outline-none mt-3 px-4 rounded-sm py-2 text-base bg-slate-100 w-[70%]'
                                    placeholder='Address Line 2'
                                />
                                {formik.touched.address2 && formik.errors.address2 && (
                                    <div className='text-red-500 pl-1 mt-1 text-sm'>{formik.errors.address2}</div>
                                )}
                            </div>
                        </div>
                        <div className='pt-4'>
                            <h4 className='text-[#9fa4a6] pb-5 font-semibold uppercase'>Basic Information</h4>
                            <div className='pt-2 flex items-center gap-x-20'>
                                <span className='font-semibold text-gray-700'>Gender:</span>
                                <div className='flex flex-col w-full'>
                                    <Select
                                        className='w-[200px] h-10 bg-slate-100 border-none outline-none'
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Select Gender</MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <div className='text-red-500 pl-1 mt-1 text-sm'>{formik.errors.gender}</div>
                                    )}
                                </div>
                            </div>
                            <div className='pt-2 flex gap-x-16 items-center my-4'>
                                <span className='font-semibold text-gray-700'>Birthday:</span>
                                <div className='flex flex-col w-full'>
                                    <input
                                        type="date"
                                        name="birthDay"
                                        value={formik.values.birthDay}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className='border-none w-[200px] outline-none px-4 rounded-sm py-2 text-base bg-slate-100'
                                    />
                                    {formik.touched.birthDay && formik.errors.birthDay && (
                                        <div className='text-red-500 pl-1 mt-1 text-sm'>{formik.errors.birthDay}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='py-8'>
                            <button
                                type="submit"
                                className='px-10 py-3 rounded-full border border-slate-400 transition-all duration-200 hover:border-none hover:bg-yellow-500 hover:text-white'
                                disabled={editUserProfileLoading} // Disable if loading
                            >
                                {editUserProfileLoading ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
