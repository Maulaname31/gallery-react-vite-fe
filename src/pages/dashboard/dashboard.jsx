import React from 'react'
import Sidebar from './components/sidebar'
import TableAccount from './components/tableAccount'

function Dashboard() {
  return (
    <>
    <Sidebar/>
      <div className='container mx-auto'>  
         <TableAccount />
    </div>
    </>
  )
}

export default Dashboard