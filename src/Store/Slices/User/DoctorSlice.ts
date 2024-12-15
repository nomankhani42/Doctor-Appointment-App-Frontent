import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIBASEURL } from '../../../BaseUrl/index.ts'; // Adjust this import based on your project structure
import toast from "react-hot-toast";

import {updateDoctorDataOnDoctorUpdate} from './UserSlice.ts'




// Thunk to add a doctor to the server
export const addDoctorToServer = createAsyncThunk('doctor/add-doctor', async (Credentials, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.post('doctor/add-doctor', Credentials);
        const { data } = response; // Assuming response is an Axios response
        const { success, user, message } = data;

        if (!success) {
            return rejectWithValue(message);
        }
        return { message, user, success };
    } catch (error) {
        return rejectWithValue(error.message); // Handle request errors
    }
});

// Thunk to get all doctors from the server
export const getAllDoctors = createAsyncThunk('doctor/get-all-doctors', async (_, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.get('doctor/get-all-doctors');
        const { data } = response; // Destructure data
        const { success, message, Doctors } = data; // Ensure these keys exist in the response

        if (!success) {
            return rejectWithValue(message);
        }
        return { success, message, Doctors };
    } catch (error) {
        return rejectWithValue(error.message); // Handle request errors
    }
});

// Thunk to get a single doctor by ID
export const getSingleDoctorData = createAsyncThunk('doctor/get-single-doctor', async (id, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.get(`doctor/get-single-doctor_${id}`);
        const { data } = response; // Destructure data
        const { success, message, doctor } = data; // Ensure these keys exist in the response

        if (!success) return rejectWithValue(message);
        return { success, message, doctor };
    } catch (error) {
        return rejectWithValue(error.message); // Handle request errors
    }
});

// Thunk to get related doctors by specialty same as fileration doctors
export const getRelatedDoctors = createAsyncThunk('doctor/get-related-doctors', async (speciality, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.get(`doctor/get-related-doctors/${speciality}`);
        const { data } = response; // Destructure data
        const { success, message, relatedDoctor } = data; // Ensure these keys exist in the response

        if (!success) return rejectWithValue(message);
        return { success, message, relatedDoctor };
    } catch (error) {
        return rejectWithValue(error.message); // Handle request errors
    }
});

export const changeDoctorAvailablity = createAsyncThunk('doctor/change-doctor-availablity', async ({ id, checked }, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.put(`doctor/update-doctor-availablity/${id}`, { checked });

        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
})

export const updateDoctorProfile = createAsyncThunk(
    'doctor/update-doctor-profile',
    async ({ id, data }, { rejectWithValue ,dispatch}) => {
      const response = await APIBASEURL.put(`doctor/update-doctor-profile/${id}`, data);
      const result = response.data;
      const { success, message, updateDoctor } = result;
      
      if (!success) {
        return rejectWithValue(message);
      }
  
   
      dispatch(updateDoctorDataOnDoctorUpdate(updateDoctor))
      return { success, message, updateDoctor };
    }
  );

// Doctor slice
const DoctorSlice = createSlice({
    name: 'doctor',
    initialState: {
        doctors: [], // Array to hold doctor objects
        loading: false, // Indicates if the fetch operation is ongoing
        addDoctorLoading: false, // Indicates if the add doctor operation is ongoing
        error: null, // To hold any error messages

        // States for doctor detail page 
        doctorDetail: {},
        doctorDetailsLoading: false,

        // Related doctors for the same page 
        relatedDoctors: [],
        relatedDoctorsLoading: false, // Loading state for related doctors
        relatedDoctorsError: null, // Error state for related doctors

         // states for updating profile;
         updateProfile:false,
         updateProfileLoading:false
    },
    reducers: {
        clearError(state) {
            state.error = null; // Action to clear the error message
            state.relatedDoctorsError = null; // Clear related doctors error
        },
        changeEditState:(state)=>{
            
            state.updateProfile=true;
            
        }

    },
    extraReducers: (builder) => {
        builder
            // Handle adding a doctor
            .addCase(addDoctorToServer.pending, (state) => {
                state.addDoctorLoading = true; // Set loading state
                state.error = null; // Reset any previous errors
            })
            .addCase(addDoctorToServer.fulfilled, (state, action) => {
                state.addDoctorLoading = false; // Reset loading state
                state.doctors.push(action.payload.user); // Add the new doctor to the state
                toast.success(action.payload.message); // Notify success
            })
            .addCase(addDoctorToServer.rejected, (state, action) => {
                state.addDoctorLoading = false; // Reset loading state
                state.error = action.payload; // Set error message
                toast.error(action.payload); // Notify error
            })
            // Handle fetching all doctors
            .addCase(getAllDoctors.pending, (state) => {
                state.loading = true; // Set loading state
                state.error = null; // Reset any previous errors
            })
            .addCase(getAllDoctors.fulfilled, (state, action) => {
                state.doctors = action.payload.Doctors; // Update doctors array
                state.loading = false; // Reset loading state
            })
            .addCase(getAllDoctors.rejected, (state, action) => {
                state.loading = false; // Reset loading state
                state.error = action.payload; // Set error message
                toast.error(action.payload); // Notify error
            })
            // Handle fetching single doctor data
            .addCase(getSingleDoctorData.pending, (state) => {
                state.doctorDetailsLoading = true; // Set loading state
            })
            .addCase(getSingleDoctorData.fulfilled, (state, action) => {
                state.doctorDetailsLoading = false; // Reset loading state
                state.doctorDetail = action.payload.doctor; // Set single doctor data
            })
            .addCase(getSingleDoctorData.rejected, (state, action) => {
                state.doctorDetailsLoading = false; // Reset loading state
                state.error = action.payload; // Set error message
                toast.error(action.payload); // Notify error
            })
            // Handle fetching related doctors
            .addCase(getRelatedDoctors.pending, (state) => {
                state.relatedDoctorsLoading = true; // Set loading state
                state.relatedDoctorsError = null; // Reset any previous errors
                state.relatedDoctors = []; // Clear previous related doctors
            })
            .addCase(getRelatedDoctors.fulfilled, (state, action) => {
                state.relatedDoctorsLoading = false; // Reset loading state
                state.relatedDoctors = action.payload.relatedDoctor; // Set related doctors
            })
            .addCase(getRelatedDoctors.rejected, (state, action) => {
                state.relatedDoctorsLoading = false; // Reset loading state
                state.relatedDoctorsError = action.payload; // Set error message
                toast.error(action.payload); // Notify error
            })
            .addCase(updateDoctorProfile.pending,(state,action)=>{
                state.updateProfileLoading=true
            })
            .addCase(updateDoctorProfile.fulfilled,(state,action)=>{
                
                toast.success(action.payload.message)
                
                state.updateProfile=false;

                state.updateProfileLoading=false;
            })
            .addCase(updateDoctorProfile.rejected,(state,action)=>{
                toast.error(action.payload.message);
                state.updateProfile=true;
                state.updateProfileLoading=false;
            })
    }
});

// Export the clearError action to be used in components
export const { clearError,changeEditState } = DoctorSlice.actions;

// Export the reducer to be used in the store
export default DoctorSlice.reducer;
