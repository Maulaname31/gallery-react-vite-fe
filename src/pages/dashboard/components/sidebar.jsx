import React from 'react'
import Table from './table'

function Sidebar() {
  return (
    
  <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

  <div className=' m-3'>
    <label htmlFor="my-drawer-2" className="btn btn-accent btn-outline drawer-button lg:hidden ">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </label>
  </div>

  <div className="drawer-content max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
    <div className="sm:flex sm:space-x-4 gap-12">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-sm leading-6 font-medium text-gray-400">Total Subscribers</h3>
                        <p className="text-3xl font-bold text-black">71,897</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-sm leading-6 font-medium text-gray-400">Avg. Open Rate</h3>
                        <p className="text-3xl font-bold text-black">58.16%</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
                <div className="sm:flex sm:items-start">
                    <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                        <h3 className="text-sm leading-6 font-medium text-gray-400">Avg. Click Rate</h3>
                        <p className="text-3xl font3-bold text-black">24.57%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
<Table/>
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