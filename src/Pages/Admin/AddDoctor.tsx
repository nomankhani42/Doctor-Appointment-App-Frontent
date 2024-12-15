import AddDoctorForm from '../../Components/Admin Components/AddDoctorForm.tsx'
import AdminLayout from '../../Components/Admin Components/AdminLayout.tsx'
import Layout from '../../Components/Layout.tsx'


const AddDoctor = () => {
  return (
   <AdminLayout >
      {/* heading of the Page  */}
      <h2 className=' font-[500] text-lg'>Add Doctor </h2>
      {/* below are add doctor form  */}
         <AddDoctorForm />
   </AdminLayout>
  )
}

export default AddDoctor
