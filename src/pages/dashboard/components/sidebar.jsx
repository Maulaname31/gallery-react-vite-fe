import React from 'react'
import Table from './table'

function Sidebar() {
  return (
    
  <div className="drawer z-[999]">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

  <div className='m-3'>
     <label htmlFor="my-drawer-2" className="btn btn-accent btn-outline drawer-button ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-auto stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
     </div>
     <div className="drawer-content max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
          </div>
          
    <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <a className="btn btn-ghost text-xl">PictUL</a>
      <li><a>Dasboard</a></li>
      <li><a>Category</a></li>
      <li><a>Account</a></li>
      <hr className='mt-11 mb-11' />
      <li ><a>LogOut</a></li>
    </ul>
  
  </div>
</div>
  )
}

export default Sidebar