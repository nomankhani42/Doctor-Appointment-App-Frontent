import React from 'react'
import Layout from '../Components/Layout.tsx'
import Navbar from '../Components/Navbar.tsx'
import Footer from '../Components/Footer.tsx'

const ContactUs = () => {
  return (
    <Layout>
    {/* this is our Navbar  */}
     <Navbar />
     {/* this is our main body area of the page  */}
     <main className=' min-h-[60vh]'>
                     {/* this is main heading of the page  */}
                     <h2 className='uppercase text-2xl py-10 text-center'>Contact <span className=' font-semibold'>US</span></h2>
                     
                     {/* this is contact us section  */}
                      {/* grid of 2 columns for large devices and 2 rows for small devices  */}
                     <div className=' lg:pl-20 flex lg:flex-row flex-col gap-x-5 gap-y-5 lg:items-center'>  
                      {/* column1 or row 1  */}
                           <div>
                                  <img className=' sm:h-[500px] h-[300px] w-full' src="/assets/assets_frontend/contact_image.png" alt="" />
                           </div>

                           {/* column 2 or row 2  */}
                           <div className=' sm:pl-0 pl-4'>
                               <h2 className=' text-xl font-semibold uppercase'>Our Office</h2>

                                 {/* address  */}
                                 <div className='pt-5 flex flex-col gap-y-1'>
                                 <p>75755 Nazimabad </p>
                                 <p>North Karachi  Pakistan</p>
                                 </div>
                                  {/* contact  */}
                                  <div className='pt-5 flex flex-col gap-y-1'>
                                 <p><span className='font-semibold'>Tel</span> 923452342432 </p>
                                 <p><span className='font-semibold'>Email</span> Doctorio@gmail.com </p>
                                 </div>

                                 {/* career section  */}
                                  <div className='pt-7'>
                                  <h2 className=' text-xl font-semibold uppercase'>Careers at doctorio </h2>
                                  <p className=' py-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, porro?</p>
                                  <button className='  py-3 my-2 px-4 border border-black text-sm'>Explore Jobs</button>
                                  </div>
                           </div>
                     </div>
     </main>


     <Footer />
</Layout>
  )
}

export default ContactUs
