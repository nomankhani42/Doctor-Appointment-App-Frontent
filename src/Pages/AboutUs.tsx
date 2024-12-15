import React from 'react'
import Layout from '../Components/Layout.tsx';
import Navbar from '../Components/Navbar.tsx';
import Footer from '../Components/Footer.tsx';

const AboutUs = () => {
  return (
    <Layout>
      {/* this is our Navbar  */}
      <Navbar />
      {/* this is our main body area of the page  */}
      <main className=' min-h-[60vh] pb-20'>
        {/* this is main heading of the page  */}
        <h2 className='uppercase text-2xl py-10 text-center'>About <span className=' font-semibold'>US</span></h2>
        {/* this is the div of grid */}
        <div className=' lg:grid lg:grid-cols-9 flex flex-col gap-y-5 gap-x-10  '>
          {/* img column for lg devices and row for small devices  */}
          <div className='  xl:col-span-3 lg:col-span-4 items-center'>

            <img className=' sm:h-[500px] h-[300px] w-full' src="/assets/assets_frontend/about_image.png" alt="" />
          </div>

          {/* another div for about text  */}
          <div className='col-span-5 px-4 sm:px-0 xl:pt-5'>
            <p className=' capitalize leading-7 text-gray-600 text-md'> cupiditate facere voluptates explicabo maiores quisquam nobis deleniti, incidunt repudiandae recusandae obcaecati, blanditiis sed reprehenderit repellendus officiis vel aperiam adipisci minus vero ad minima commodi delectus. Sapiente, consequuntur explicabo! Est, a.</p>
            <p className=' capitalize leading-7 py-10 text-gray-600 text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, distinctio.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi rem possimus omnis iusto veniam libero tempore eius assumenda velit! Nihil, ad. Necessitatibus similique facere numquam architecto facilis cum voluptate?</p>
                     {/* our visioon div  */}
                     <div>
                        <h4 className=' text-lg font-semibold pb-8'>Our Vision</h4>
                        <p className=' capitalize leading-7 text-gray-600 text-md'>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam, aperiam. adipisicing elit. Voluptatum vel ducimus minima blanditiis reprehenderit sit quo natus odio provident nihil.</p>
                     </div>
          </div>
          <div>

          </div>

        </div>
        
           
      </main>


      <Footer />
    </Layout>
  )
}

export default AboutUs;
