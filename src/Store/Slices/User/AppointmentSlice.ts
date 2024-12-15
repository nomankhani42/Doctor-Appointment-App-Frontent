import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIBASEURL } from '../../../BaseUrl/index.ts';
import toast from 'react-hot-toast';

const initialState = {
    // this state is for when patient booking an appointment
    bookingAppoinmentLoading: false,
    // this state is for getting patient appointments
    getPatientAppointmentsLoading: false,
    PatientAppointments: [],
    // this state is for getting doctor appointments
    doctorAppointmentsLoading: false,
    doctorAppointments: [],
    // this state is for getting all Appointments for admin dashboard
    AllAppointmentsLoading: false,
    AllAppointments: [],
};

// Book appointment
export const BookAppointment = createAsyncThunk('appointment/book-appointment', async (Credentials, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.post('appointment/book-appointment', Credentials);
        const data = response.data;
        const { success, message, savedAppointment } = data;

        if (!success) return rejectWithValue(message);
        return { success, message, savedAppointment };
    } catch (error) {
        console.error('Error Booking Appointment:', error);
        return rejectWithValue(error.response?.data?.message || 'An error occurred while booking the appointment.');
    }
});

// Get patient appointments
export const getPatientAppointments = createAsyncThunk('appointment/get-patientAppointments', async (id, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.get(`appointment/get-patient-appointment/${id}`);
        const data = response.data;
        const { message, success, patientAppointments } = data;

        if (!success) return rejectWithValue(message);
        return { message, success, patientAppointments };
    } catch (error) {
        console.error('Error Fetching Patient Appointments:', error);
        return rejectWithValue(error.response?.data?.message || 'An error occurred while fetching patient appointments.');
    }
});

// Get all appointments (admin)
export const getAllAppointments = createAsyncThunk('appointments/get-all-appointments-admin', async (_, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.get('appointment/get-all-appointments');
        const data = response.data;
        const { success, message, AllAppointments } = data;

        if (!success) return rejectWithValue(message);
        return { success, message, AllAppointments };
    } catch (error) {
        console.error('Error Fetching All Appointments:', error);
        return rejectWithValue(error.response?.data?.message || 'An error occurred while fetching all appointments.');
    }
});

// Cancel appointment
export const cancelAppointment = createAsyncThunk('appointments/cancel-appointment', async ({ id }, { rejectWithValue }) => {
  
        const response = await APIBASEURL.put(`appointment/cencel-appointment/${ id }`, );
        const data = response.data;
        const { success, message, appointment } = data;

        if (!success) return rejectWithValue(message);
        return { success, message, appointment };
   
});

// Get doctor appointments
export const getDoctorAppointments = createAsyncThunk('appointments/get-doctor-appointments', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await APIBASEURL.get(`appointment/get-doctor-appointments/${id}`);
        const data = response.data;
        const { success, message, DoctorAppointments } = data;

        if (!success) return rejectWithValue(message);
        return { success, message, DoctorAppointments };
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        return rejectWithValue('An error occurred while fetching doctor appointments.');
    }
});

// Complete appointment
export const completeAppointment = createAsyncThunk('appointments/complete-appointment-by-admin', async ({ id }, { rejectWithValue }) => {
    

        const response = await APIBASEURL.put(`appointment/complete-appointment/${ id }`);
        const data = response.data;
        const { success, message, appointment } = data;

        if (!success) return rejectWithValue(message);
        return { success, message, appointment };
    
});

// make payment online 

export const makeAppointmentFee=createAsyncThunk('appointments/make-appointment-fee',async(credentials,{rejectWithValue})=>{
      const response=await APIBASEURL.post('appointment/make-appointment-payment',credentials);
      const data=response.data;
      const { success, message, url } = data;
      if(response.data.success){
        window.location.replace(response.data.url)
      }

      return { success, message, appointment };

})


export const confirmPayment=createAsyncThunk('appointment/confirm-payment',async({id},{rejectWithValue})=>{
     const response=await APIBASEURL.put(`appointment/confirm-payment/${id}`);
     const data=response.data;

     const {success,message,updatePaymentStatus}=data;

    
      return {success,message,updatePaymentStatus};
})

const AppointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Book Appointment
            .addCase(BookAppointment.pending, (state) => {
                state.bookingAppoinmentLoading = true;
            })
            .addCase(BookAppointment.fulfilled, (state, action) => {
                state.bookingAppoinmentLoading = false;
                toast.success('Appointment Booked Successfully');
            })
            .addCase(BookAppointment.rejected, (state, action) => {
                state.bookingAppoinmentLoading = false;
                toast.error(action.payload);
            })

            // Get Patient Appointments
            .addCase(getPatientAppointments.pending, (state) => {
                state.getPatientAppointmentsLoading = true;
            })
            .addCase(getPatientAppointments.fulfilled, (state, action) => {
                state.PatientAppointments = action.payload.patientAppointments;
                state.getPatientAppointmentsLoading = false;
            })
            .addCase(getPatientAppointments.rejected, (state, action) => {
                state.getPatientAppointmentsLoading = false;
            })

            // Get All Appointments (Admin)
            .addCase(getAllAppointments.pending, (state) => {
                state.AllAppointmentsLoading = true;
            })
            .addCase(getAllAppointments.fulfilled, (state, action) => {
                state.AllAppointments = action.payload.AllAppointments;
                state.AllAppointmentsLoading = false;
            })
            .addCase(getAllAppointments.rejected, (state, action) => {
                state.AllAppointmentsLoading = false;
                state.AllAppointments = [];
            })

            // Cancel Appointment
            .addCase(cancelAppointment.pending, (state) => {
                // Optionally handle loading state here
            })
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                  })
            .addCase(cancelAppointment.rejected, (state, action) => {
                
            })

            // Get Doctor Appointments
            .addCase(getDoctorAppointments.pending, (state) => {
                state.doctorAppointmentsLoading = true;
            })
            .addCase(getDoctorAppointments.fulfilled, (state, action) => {
                state.doctorAppointments = action.payload.DoctorAppointments;
                state.doctorAppointmentsLoading = false;
            })
            .addCase(getDoctorAppointments.rejected, (state) => {
                state.doctorAppointmentsLoading = false;
                state.doctorAppointments = [];
            })

            // Complete Appointment
            .addCase(completeAppointment.pending, (state) => {
                // Optionally handle loading state here
            })
            .addCase(completeAppointment.fulfilled, (state, action) => {
             
            })
            .addCase(completeAppointment.rejected, (state, action) => {
               
            })
            .addCase(makeAppointmentFee.pending,(state,action)=>{

            })
            .addCase(makeAppointmentFee.fulfilled,(state,action)=>{
                
            })
            .addCase(makeAppointmentFee.rejected,(state,action)=>{
                
            })
            .addCase(confirmPayment.pending,(state,action)=>{
                
            })
            .addCase(confirmPayment.fulfilled,(state,action)=>{
                
            })
            .addCase(confirmPayment.rejected,(state,action)=>{
                
            })
    },
});

export default AppointmentSlice.reducer;
