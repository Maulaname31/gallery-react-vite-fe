import React from 'react'
import Sidebar from './components/sidebar'
import TableAccount from './components/tableAccount'
import TableCategory from './components/tableCategory'

function Category() {
  return (
    <>
    <Sidebar/>
      <div className='container mx-auto'>  
         <TableCategory/>
    </div>
    </>
  )
}

export default Category