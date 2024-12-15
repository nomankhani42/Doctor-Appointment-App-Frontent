// features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIBASEURL } from '../../../BaseUrl/index.ts';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  user: null, // User data if user is login in
  doctor :null, // if doctor is login in
  isAuthenticated: false, // Authentication status
  role: null,
  token: null, // Authentication token
  loading: false, // Loading state for API calls
  sigInLoading:false,
  error: null, // Error state
  editUserProfile: false,
  editUserProfileLoading:false,
   
  //  states for sign up new user 

  signUpLoading:false
};

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await APIBASEURL.post('login', credentials); // API call
      const { success, message, user, token } = response.data; // Destructure response

      if (!success) {
        return rejectWithValue(message || 'Login failed');
      }

      return { user, message, token, role: user.role }; // Return payload
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

// Async thunk for SignUp
export const newUser=createAsyncThunk('user/new-user',async(credentials,{rejectWithValue})=>{
   const response= await APIBASEURL.post('new-user',credentials);
   const data=response.data;
   const {success,message}=data
   if(!success){
    return rejectWithValue(message)
   }
   return {success,message};
})
// Async thunk for checking authentication
export const checkAuthentication = createAsyncThunk(
  'user/check-auth',
  async (token, { rejectWithValue }) => {
    
      const response = await APIBASEURL.get('check-authentication', {
        headers: {
          Authorization: token,
        },
      });
      const { success, message } = response.data;

      if (!success) {
        return rejectWithValue(message || 'Not Authenticated');
      }

      return message; // Or return user data if needed
    
  }
);

// Async thunk for updating profile
export const updateUserProfile = createAsyncThunk(
  'user/update-profile',
  async ({ id, formData }, { rejectWithValue }) => {
    console.log(id,formData)
    try {
      const response = await APIBASEURL.put(`update-user-profile/${id}`, formData); // Corrected the URL
      const { user, success, message } = response.data; // Assuming your API returns these fields

      if (!success) {
        return rejectWithValue(message);
      }

      return { user, success, message }; // Return user data and success message
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return rejectWithValue(message);
    }
  }
);

// async for doctor login 
export const loginDoctor=createAsyncThunk('doctor/doctor-login',async(credentials,{rejectWithValue})=>{
  try {
     const response=await APIBASEURL.post('doctor/login-doctor',credentials);
     console.log(response)
       const data=response.data;
       const {success,message,doctor,token}=data;
       if(!success) return rejectWithValue(message);

       return {success,message,doctor,token};

  } 
  catch (error) {
     return rejectWithValue(error)
  }
})

// User slice definition
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editProfileAction(state, action) {
      state.editUserProfile = action.payload;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null; // Reset token on logout
    },
    updateDoctorDataOnDoctorUpdate:(state,action)=>{
      state.doctor=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.sigInLoading=true
        state.error = null; // Reset error on new login attempt
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated=true;
        state.user = action.payload.user; // Set user on successful login
        state.token = action.payload.token; // Set token
        state.isAuthenticated = true; // Set authenticated state
        state.sigInLoading=false;
        state.role = action.payload.role;
        toast.success(action.payload.message); // Show success toast
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.sigInLoading=false;
        state.error = action.payload; // Set error message
        toast.error(action.payload); // Show error toast
        
      })
      // Handle authentication check
      .addCase(checkAuthentication.pending, (state) => {
        state.loading = true; // Indicate loading state
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.loading = false; // Loading finished
        state.isAuthenticated = true; // User is authenticated
        // You can add user data to state if needed
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null; // Reset token on failure
        // toast.error(action.payload); // Uncomment to show error toast
      })
      // Handle update profile actions
      .addCase(updateUserProfile.pending, (state) => {

         state.editUserProfileLoading=true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false; // Loading finished
        state.user = action.payload.user; // Update user data in state
        toast.success(action.payload.message); // Show success toast
        state.editUserProfileLoading=false;
        state.editUserProfile=false
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false; // Loading finished
        state.error = action.payload; // Set error message
        
        state.editUserProfileLoading=false;
        toast.error(action.payload); // Show error toast
      })
      .addCase(loginDoctor.pending,(state,action)=>{
               state.user={};   
      })
      .addCase(loginDoctor.fulfilled,(state,action)=>{
        
        state.doctor=action.payload.doctor;
        state.user={};
        state.token=action.payload.token
        state.role='doctor';
        state.token=
          state.isAuthenticated=true;
          toast.success(action.payload.message)
          
          
      })
      .addCase(loginDoctor.rejected,(state,action)=>{
          state.isAuthenticated=false;
          state.doctor=null;
      })
      .addCase(newUser.pending,(state,action)=>{
          state.signUpLoading=true
        
    })
    .addCase(newUser.fulfilled,(state,action)=>{
      toast.success(action.payload.message)
      state.signUpLoading=false
        
    })
    .addCase(newUser.rejected,(state,action)=>{
      toast.error(action.payload)
      state.signUpLoading=false;
        
    })

  },
});

// Export actions and reducer
export const { logout, editProfileAction,updateDoctorDataOnDoctorUpdate } = userSlice.actions;
export default userSlice.reducer;
