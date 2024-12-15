import React from 'react'

const LatestAppointmentCardDoctor = ({ item , completeAppointmentHandle,cencelAppointmentHandle }) => {
    return (
        <div>
            {/* this is the main view of latest apoointment card  */}
            <div>
                {/* this div contain image text and action button  */}
                <div className=' flex justify-between items-center'>
                    {/* image and text div  */}
                    <div className=' flex items-center gap-x-5'>
                        {/* image div of patient  */}
                        <div>
                            <img className=' h-14 w-14 rounded-full' src={item.patient.photo} alt="" />
                        </div>
                        {/* name and booking date time view  */}
                        <div>
                            {/* this is name of the patient  */}
                            <h4 className=' text-base font-[550]'>{item.patient.name}</h4>
                            <p className='pt-1 text-slate-500'>Booking On {item.dateTime}</p>
                        </div>

                    </div>
                    {/* action button div or cecel or accept  */}
                    {item.status === 'cancelled' ? (
                        <span className="text-red-500 block text-center font-semibold text-sm">Cancelled</span>
                      ) : item.status === 'completed' ? (
                        <div className=' text-center text-green-500 font-semibold'>Completed</div>
                      ) : (
                        <div>
                          <button onClick={() => cencelAppointmentHandle(item._id)}>
                            <img src="/assets/assets_admin/cancel_icon.svg" alt="Cancel" />
                          </button>
                          <button onClick={() => completeAppointmentHandle(item._id)}>
                            <img src="/assets/assets_admin/tick_icon.svg" alt="Complete" />
                          </button>
                        </div>
                      )}
                </div>
            </div>
        </div>
    )
}

export default LatestAppointmentCardDoctor;
