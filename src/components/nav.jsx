import React, {useState, useEffect} from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import { swalConfirm } from './alert';
import axios from 'axios';
import { url_develope } from '../const';


function Nav() {
const Navigate = useNavigate();
const jwt = localStorage.getItem('jwtToken')
const [data, setData] = useState([])

useEffect(() =>{
  axios.get(`${url_develope}/category/`)
  .then(response =>{
    setData(response.data);
  }).catch(err =>[
    console.error('Error fetching Category', err)
  ])
},[])

const handleLogout = () =>{
  swalConfirm('Logout?', 'are you sure you want to log out?', 'warning', 'Yes, Logout!')
  .then((result) =>{
    if(result.isConfirmed){
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userId')
    Navigate('/')
    }
  })
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
            {data.map((item, index) => (        
              <li key={index}><Link to=''>{item.nameCategory}</Link></li> 
            ))}
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
              </>
            )}
          <li><Link to=''>About</Link></li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl"><Link to="/">GalleryUi</Link></a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link to=''>Home</Link></li>
        <li>
          <details>
            <summary>Category</summary>
            <ul className="p-2">
              <li><Link>All</Link></li>
            {data.map((item, index) => (    
              <li key={index}><Link to=''>{item.nameCategory}</Link></li> 
            ))}
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

            </>
          )}
        <li><Link to=''>About</Link></li>
      </ul>
    </div>
    <div className="navbar navbar-end ">
      <div className='dropdown dropdown-end'>
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link>Dashboard</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
    </div>
  </div>
  )
}
<Link to="/login" className="btn">Login</Link>
export default Nav