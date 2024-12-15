import React from 'react';
import { motion } from 'framer-motion';

const EndBanner = () => {
  return (
    <motion.div 
      className="pt-10"
      initial={{ opacity: 0 }}   // Start with opacity 0
      whileInView={{ opacity: 1 }}  // Fade to opacity 1 when in view
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 25,
      }}
      viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the parent is in view
    >
      <div className="bg-yellow-400 rounded-lg">
        {/* 2 rows grid for heading and image */}
        <div className="grid grid-cols-6 lg:px-20 px-2 md:h-[350px] h-[300px]">
          {/* column 1 for text */}
          <div className="col-span-4">
            <h1 className="text-white pt-20 font-bold lg:text-5xl md:text-3xl sm:text-2xl text-xl">
              Book Appointment
            </h1>
            <h2 className="text-white my-4 font-bold lg:text-5xl md:text-3xl sm:text-2xl text-xl">
              With 100+ Trusted Doctors
            </h2>
            <div>
              <button className="bg-white py-3 font-semibold px-5 rounded-full text-yellow-600">
                Book Appointment
              </button>
            </div>
          </div>
          {/* column 2 for image */}
          <motion.div
            className="col-span-2"
            whileInView={{
              opacity: 1,   // Fade in when in view
              y: 0,         // Move to original position when in view
            }}
            initial={{
              opacity: 0,   // Start with hidden opacity
              y: 50,        // Start with an offset for parallax effect
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 25,
            }}
            viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the element is visible
          >
            <img
              className="md:h-[380px] h-[330px] relative -top-7"
              src="/assets/assets_frontend/appointment_img.png"
              alt="Appointment"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EndBanner;
