import React from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'

function Nav() {
const Navigate = useNavigate();
const jwt = localStorage.getItem('jwtToken')
const handleLogout = () =>{
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('userId')
  Navigate('/')
}

  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to=''>Home</Link></li>
          <li>
            <a>Category</a>
            <ul className="p-2">
              <li><Link to=''>Submenu 1</Link></li>
              <li><Link to=''>Submenu 2</Link></li>
            </ul>
          </li>
          {jwt && (
              <>
                <li>
                  <a>Album</a>
                  <ul className="p-2">
                    <li><Link to=''>+ album </Link></li>
                    <li><Link to=''>Submenu 2</Link></li>
                  </ul>
                </li>
                <li ><Link to='/upload'>Upload</Link></li>
              </>
            )}
          <li><Link to=''>About</Link></li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">GalleryUi</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link to=''>Home</Link></li>
        <li>
          <details>
            <summary>Category</summary>
            <ul className="p-2">
              <li><Link to=''>Submenu 1</Link></li>
              <li><Link to=''>Submenu 2</Link></li>
            </ul>
          </details>
        </li>
        {jwt && (
            <>
              <li>
                <details>
                  <summary>Album</summary>
                  <ul className="p-2">
                    <li><Link to=''>+ album</Link></li>
                    <li><Link to=''>Submenu 2</Link></li>
                  </ul>
                </details>
              </li>
              <li><Link to='/upload'>Upload</Link></li>
            </>
          )}
        <li><Link to=''>About</Link></li>
      </ul>
    </div>
    <div className="navbar-end">
        {jwt ? (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
         )}
      </div>
  </div>
  )
}
<Link to="/login" className="btn">Login</Link>
export default Nav