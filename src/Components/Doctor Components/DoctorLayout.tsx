import React from 'react'
import SiderBar from '../Admin Components/SiderBar'
import DoctorNavbar from './DoctorNavbar'
import DoctorSiderBar from './DoctorSideBar'

const DoctorLayout = ({children}) => {
    return (
        <div>
            {/* this is the navbar of the layout of Doctor  */}
               <DoctorNavbar />
               {/* this is side bar and page content div  */}
                <div className='grid grid-cols-10'>
                       {/* this is the side bar of the page  */}
                         <DoctorSiderBar />
                       {/* and this the admin panel page content  */}
                       <div className='col-span-8 pl-10 pt-5 bg-slate-50'>
                          {children}
                       </div>
                </div>
        </div>
      )
}

export default DoctorLayout
