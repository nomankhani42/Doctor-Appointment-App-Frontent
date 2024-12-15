
import Users from './Pages/Users.tsx';
import { Navigate, Route, Routes } from 'react-router';
import Home from './Pages/Home.tsx';
import AllDoctors from './Pages/AllDoctors.tsx';
import AboutUs from './Pages/AboutUs.tsx';
import ContactUs from './Pages/ContactUs.tsx';
import SignUp from './Pages/SignUp.tsx';
import Login from './Pages/Login.tsx';
import DoctorDetail from './Pages/DoctorDetail.tsx';
import Admin from './Pages/Admin/Admin.tsx';
import Doctor from './Pages/Doctor/Doctor.tsx';
import PublcProtected from './ProtectedRoutes/PublcProtected.tsx';
import AdminProtected from './ProtectedRoutes/AdminProtected.tsx';
import DoctorProtected from './ProtectedRoutes/DoctorProtected.tsx';
import UserProtected from './ProtectedRoutes/UserProtected.tsx';
import MyProfile from './Pages/User/MyProfile.tsx';
import MyAppointments from './Pages/User/MyAppointments.tsx';
import UserProfileProtected from './ProtectedRoutes/UserProfileProtected.tsx';
import AdminAppointments from './Pages/Admin/AdminAppointments.tsx';
import AddDoctor from './Pages/Admin/AddDoctor.tsx';
import DoctorList from './Pages/Admin/DoctorList.tsx';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments.tsx';
import DoctorProfile from './Pages/Doctor/DoctorProfile.tsx';
import DoctorLogin from './Pages/User/DoctorLogin.tsx';



const App = () => {

  return (
       <Routes>
        <Route path="/" element={<UserProtected></UserProtected>}>
        <Route index element={<Home />} />
        <Route path="all-doctors" element={<AllDoctors />} />
        <Route path="doctor/:id" element={<DoctorDetail />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>

          {/* protected Routes when user is authenticated for eg my profile and my appointments  */}
           <Route path='/profile' Component={UserProfileProtected}>
            <Route index  Component={MyProfile} />
            <Route path='my-appointments' Component={MyAppointments} />

           </Route>
          
          <Route path='/signup' element={<PublcProtected>
            <SignUp />
          </PublcProtected>}  />
          <Route path='/doctor-login' element={<PublcProtected>
            <DoctorLogin/>
          </PublcProtected>}  />
          
          <Route path='/login' element={
            <PublcProtected>
               <Login />
            </PublcProtected>
           }  />

        {/*this is admin Route*/}
        <Route path={'/admin'} element={<AdminProtected />}>
  {/* Redirect from /admin to /admin/dashboard */}
  <Route index element={<Navigate to="/admin/dashboard" replace />} />
  <Route path={'dashboard'} element={<Admin />} />
  <Route path={'all-appointments'} element={<AdminAppointments />} />
  <Route path={'add-doctor'} element={<AddDoctor />} />
  <Route path={'all-doctors'} element={<DoctorList />} />
  <Route path={'*'} element={<Admin />} />
</Route>
           {/*this is Doctor Route*/}
            <Route path='/doctor' element={<DoctorProtected />} >
               <Route index element={<Navigate to={'/doctor/dashboard'} />} replace />
               <Route path='dashboard' element={<Doctor />} />
               <Route path='doctor-appointments' element={<DoctorAppointments />} />
               <Route path='doctor-profile' element={<DoctorProfile />} />
            </Route>

       </Routes>
  )
}

export default App
