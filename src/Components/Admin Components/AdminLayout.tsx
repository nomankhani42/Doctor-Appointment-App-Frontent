import React from 'react'
import AdminNavbar from './AdminNavbar'
import SiderBar from './SiderBar'

const AdminLayout = ({children}) => {
  return (
    <div>
        {/* this is the navbar of the layout of admin  */}
           <AdminNavbar />
           {/* this is side bar and page content div  */}
            <div className='grid grid-cols-10'>
                   {/* this is the side bar of the page  */}
                   <SiderBar  />
                   {/* and this the admin panel page content  */}
                   <div className='col-span-8 pl-10 pt-5 bg-slate-50'>
                      {children}
                   </div>
            </div>
    </div>
  )
}

export default AdminLayout
