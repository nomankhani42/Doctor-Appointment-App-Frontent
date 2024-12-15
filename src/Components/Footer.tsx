import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className=' pt-20 '>
            <div className='pb-5 px-4 sm:px-0 flex flex-col md:grid grid-cols-5 lg:gap-x-20 gap-x-5 items-start  border-b border-b-gray-300'>
                {/* three columns for footer  */}

                {/* column 1  of width 60% */}
                <div className='col-span-3'>
                    {/* image of logo in footer  */}
                    <div className=' pb-5'>
                        <img src="/assets/assets_frontend/logo.svg" alt="" />

                    </div>
                    <p className='text-md text-gray-500'> corporis aliquam blanditiis? Placeat repudiandae perferendis reprehenderit, magnam tempore amet ratione nostrum cum sint pariatur ad nobis molestiae sed quae natus reiciendis nesciunt architecto doloribus adipisci neque similique odio explicabo ducimus suscipit? Commodi voluptatum dignissimos ullam nesciunt!</p>
                </div>
                {/* column 2 of width 20%  */}
                <div>
                         <h2 className='text-xl uppercase font-semibold lg:pb-10 pt-5 lg:pt-0 pb-5'>Company</h2>

                         <ul className=' flex flex-col gap-y-2'>
                            <li>
                                <Link className='text-gray-500'>Home</Link>
                            </li>
                            <li>
                                <Link className='text-gray-500'>About Us</Link>
                            </li>
                            <li>
                                <Link className='text-gray-500'>Contact Us</Link>
                            </li>
                            <li>
                                <Link className='text-gray-500'>Privacy Policy</Link>
                            </li>
                         </ul>
                </div>
                {/* column 3 of width 20%  */}
                <div>
                      
                        <h2 className='text-xl uppercase font-semibold lg:pb-10 pt-5 lg:pt-0 pb-5'>Get in Touch</h2>
                          <ul className=' flex flex-col gap-y-2'>
                            <li className='text-gray-500'>
                                +92345353635
                            </li>
                            <li className='text-gray-500'>
                               noman@gmail.com
                            </li>
                          
                         </ul>
                      
                </div>
            </div>

            {/* sub footer also included in footer com also  */}
               <div className='py-4 text-gray-500 text-center'>
                   Copyright@DoctorIo 2024 - All Rights Reserved
               </div>
        </div>
    )
}

export default Footer
