import * as yup from 'yup';

export const signupSchema = yup.object({
    FullName: yup
        .string()
        .min(3, 'Full Name must be at least 3 characters long.')
        .max(20, 'Full Name cannot exceed 20 characters.')
        .required('Full Name is required.'),
    
    emailID: yup
        .string()
        .email('Please enter a valid email address.')
        .required('Email ID is required.'),
    
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password cannot exceed 20 characters.')
});

export const signinSchema = yup.object({
 
    
    emailID: yup
        .string()
        .email('Please enter a valid email address.')
        .required('Email ID is required.'),
    
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password cannot exceed 20 characters.')
});

export const addDoctorSchema = yup.object({
    doctorName: yup
        .string()
        .min(3, 'Doctor Name must be at least 3 characters long.')
        .max(50, 'Doctor Name cannot exceed 50 characters.')
        .required('Doctor Name is required.'),
    
    email: yup
        .string()
        .email('Please enter a valid email address.')
        .required('Email is required.'),
    
    education: yup
        .string()
        .required('Education is required.'),
    
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password cannot exceed 20 characters.'),
    
    address1: yup
        .string()
        .required('Address is required.'),
    
    address2: yup
        .string()
        .optional(), // Address 2 is optional

    experience: yup
        .string()
        .required('Experience is required.'),
    
    fees: yup
        .number()
        .positive('Fees must be a positive number.')
        .required('Fees are required.'),
    
    about: yup
        .string()
        .max(500, 'About section cannot exceed 500 characters.')
        .required('About section is required.'),
    
    speciality: yup
        .string()
        .required('Speciality is required.'),
    
    photo: yup
        .string()
        
        .required('Photo is required.')
});


export const userSchema = yup.object().shape({
    // Photo is expected to be a string
    photo: yup
        .string()
       ,
    
    FullName: yup
        .string()
        .required('Full Name is required.'),
    
    emailID: yup
        .string()
        .email('Please enter a valid email address.')
        .required('Email ID is required.'),
    
    address1: yup
        .string()
        .required('Address 1 Is Required'), 
        address2: yup
        .string(),
        // Address 2 is optional
        

    gender: yup
        .string()
        .oneOf(['male', 'female', 'other'], 'Gender must be one of the following: male, female, other.')
        .optional(), // Gender is optional

    birthDay: yup
        .date()
        .required('Birthday is required.')
        .max(new Date(), 'Birthday cannot be in the future.'), // Prevent future dates
    
    role: yup
        .string()
        .default('user') // Default role is 'user'
        .optional(), // Role is optional
    
    password: yup
        .string()
      
       
});

export const DoctorLoginSchema = yup.object({
 
    
    email: yup
        .string()
        .email('Please enter a valid email address.')
        .required('Email ID is required.'),
    
    password: yup
        .string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters long.')
        .max(20, 'Password cannot exceed 20 characters.')
});
