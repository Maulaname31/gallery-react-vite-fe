import React from 'react'
import Sidebar from './components/sidebar'
import Table from "./components/table"

function Dashboard() {
  return (
    <>
    <Sidebar/>
      <div className='container mx-auto'>  
         <Table />
    </div>
    </>
  )
}

export default Dashboard