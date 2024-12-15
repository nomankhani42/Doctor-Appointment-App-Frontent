import DoctorBIO from '../../Components/Doctor Components/DoctorBIO'
import DoctorLayout from '../../Components/Doctor Components/DoctorLayout'
import EditDoctorBio from '../../Components/Doctor Components/EditDoctorBio'
import React from 'react'
import { useSelector } from 'react-redux'

const DoctorProfile = () => {
   const { doctor } = useSelector((state) => state.user); 
   const {updateProfile } = useSelector((state) => state.doctor); 
   console.log(updateProfile)
  return (
     <DoctorLayout>
           <div>
                {/* this is profile image of the doctor  */}
                <div className=' bg-yellow-500 rounded-md overflow-hidden w-fit'>
                   <img className=' h-[270px]' src={doctor.photo ? doctor.photo :"/assets/assets_frontend/doc1.png"} alt="" />
                </div>
              
                  {updateProfile ?  <EditDoctorBio /> : <DoctorBIO /> } 
           </div>
     </DoctorLayout>
  )
}

export default DoctorProfile
