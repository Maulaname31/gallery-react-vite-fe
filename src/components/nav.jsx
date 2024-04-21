import React, {useState, useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { swalConfirm } from './alert';
import axios from 'axios';
import { url_develope } from '../const';
import { jwtDecode } from 'jwt-decode';


function Nav() {
const navigate = useNavigate();
const jwt = localStorage.getItem('jwtToken')
const [dataCategory, setDataCategory] = useState([])
const [dataAlbum, setDataAlbum] = useState([])

  const token = localStorage.getItem('jwtToken');
  const getUserInfo = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return {
        username: decodedToken.username,
        role: decodedToken.role
      };
    }
    return null;
  };
  const userInfo = getUserInfo();


useEffect(() =>{
  axios.get(`${url_develope}/category/`)
  .then(response =>{
    setDataCategory(response.data);
  }).catch(err =>[
    console.error('Error fetching Category', err)
  ])

  axios.get(`${url_develope}/album/`)
  .then(response =>{
    setDataAlbum(response.data);
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
    navigate('/')
    }
  })
}

const handleCategoryClick = (categoryId) =>{
  navigate(`/categoryPage/${categoryId}`)
}

  return (
    <div className="navbar bg-[#2D3250] shadow-md z-[999] ">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to='/'>Home</Link></li>
          <li>
          <a>Category</a> 
          <ul className="p-2">
          <li><Link to='/'>All</Link></li>
            {dataCategory.map((item, index) => (        
              <li key={index}><button onClick={()=> handleCategoryClick(item.categoryId)}>
                {item.nameCategory}
                </button>
             </li> 
            ))}
          </ul>
        </li>
          {jwt && (
              <>
          <li>
            <Link to='/viewAlbum'>Album</Link> 
            {/* <ul className="p-2">
            <li><Link to='/'>All</Link></li>
              {dataAlbum.map((item, index) => (        
                <li key={index}><button onClick={()=> handleCategoryClick(item.albumId)}>
                  {item.albumName}
                  </button>
              </li> 
              ))}
            </ul> */}
          </li>
              </>
            )}
          <li><Link to='/about'>About</Link></li>
        </ul>
      </div>
      <Link to="/" className="btn btn-ghost text-xl">PictUL</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link to='/'>Home</Link></li>
        {/* <li>
          <details>
            <summary>Category</summary>
            <ul className="p-2 ">
              <li><Link to='/'>All</Link></li>
            {dataCategory.map((item, index) => (    
              <li key={index}>
                <button onClick={()=> handleCategoryClick(item.categoryId)}>
                {item.nameCategory}
                </button>
              </li> 
            ))}
          </ul>
          </details>
        </li> */}
        {jwt && (
            <>
            <li>
                <Link to='/viewAlbum'>Album</Link>
            </li>
            </>
          )}
        <li><Link to='/about'>About</Link></li>
      </ul>
      
    </div>
    <div className="navbar navbar-end ">
      

      {jwt ? (
          <>
          <p className='mr-3'> <i>{userInfo.username ? userInfo.username : ''}</i></p>
        <div className='dropdown dropdown-end'>
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online placeholder">
     <div className="bg-neutral text-neutral-content w-10 rounded-full">
        <span className="text-base">
          {userInfo.username.split("")[0].charAt().toUpperCase()}
          {userInfo.username.split(" ")[1] ? userInfo.username.split(" ")[1].charAt(0).toUpperCase() : ''}
          </span>
      </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link >
          <i className="ri-user-4-line"></i>Profile
          
          </Link>
        </li>
        {userInfo.role === 'user' ? (
          <li><Link to='/photo'><i className="ri-dashboard-line"></i>Dashboard</Link></li>
          ):(    
            <li><Link to='/dashboardAdmin'><i className="ri-dashboard-line"></i>Dashboard</Link></li>
        )}
        <li onClick={handleLogout}><Link><i className="ri-logout-box-line"></i>Logout</Link> </li>
      </ul>
     </div>
     </>
      ):(
        <li>
          <Link to="/login" className="btn">Login</Link>
        </li>

      )}
    </div>
  </div>
  )
}
export default Nav