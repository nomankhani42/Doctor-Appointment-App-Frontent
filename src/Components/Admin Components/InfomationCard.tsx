import React from 'react'

const InfomationCard = ({iconImg,count,title}) => {
  return (
    <div>
        {/* main are  */}
       <div className=' bg-white py-7 px-4 flex items-center gap-x-5 border border-slate-200 rounded-sm'>
          {/* this card contains 2 divs 1 for image and for card title and count  */}
          {/* image div  */}
          <div>
               <img src={iconImg} alt="" />
          </div>
          {/* detail div  */}
          <div className=''>
            <h2 className=' text-2xl font-[500]'>{count}</h2>
            <p className=' text-slate-400'>{title}</p>

          </div>
       </div>
    </div>
  )
}

export default InfomationCard
