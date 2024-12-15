import React from 'react'

const Hero = () => {
    return (
        <div className=' pt-8'>
            {/* hero content box  */}

            <div className=' sm:px-10  pt-10 grid xl:grid-cols-2 lg:grid-cols-3 items-center bg-yellow-400 rounded-lg tt-10'>
                {/* 2 columns for image and text  */}
                {/* column 1 */}
                <div className=' pl-5 lg:col-span-2 xl:col-span-1'>
                    <h1 className=' text-white font-bold xl:text-5xl text-3xl'>Book Appointment</h1>
                    <h2 className=' text-white my-4 font-bold xl:text-5xl text-3xl'> With Trusted Doctors</h2>


                    <div className=' flex items-center gap-x-2 my-5 justify-center'>
                        <img src="/assets/assets_frontend/group_profiles.png" alt="" />
                        <p className='  text-white pr-2'>Simply Browse Through Our Extensive List Of Doctor's, Shehdule Your Appointment Hassle Free</p>
                    </div>

                    {/* button  */}
                    <div>
                        <button className=' bg-white py-3 font-semibold px-5 rounded-full text-yellow-600'>Book Appointment</button>
                    </div>
                </div>
                {/* column 2  */}
                <div>
                    <img src="/assets/assets_frontend/header_img.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero
