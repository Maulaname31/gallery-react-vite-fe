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
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            <ul className="p-2">
            <li><Link to='/'>All</Link></li>
              {dataAlbum.map((item, index) => (        
                <li key={index}><button onClick={()=> handleCategoryClick(item.albumId)}>
                  {item.albumName}
                  </button>
              </li> 
              ))}
            </ul>
          </li>
              </>
            )}
          <li><Link to=''>About</Link></li>
        </ul>
      </div>
      <Link to="/" className="btn btn-ghost text-xl">GalleryUi</Link>
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
        <li><Link to=''>About</Link></li>
      </ul>
    </div>
    <div className="navbar navbar-end ">

      {jwt ? (
          <>
          <p className='mr-3'> <i>{userInfo.username ? userInfo.username : ''}</i></p>
        <div className='dropdown dropdown-end'>
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12.1597 16C10.1243 16 8.29182 16.8687 7.01276 18.2556C8.38039 19.3474 10.114 20 12 20C13.9695 20 15.7727 19.2883 17.1666 18.1081C15.8956 16.8074 14.1219 16 12.1597 16ZM12 4C7.58172 4 4 7.58172 4 12C4 13.8106 4.6015 15.4807 5.61557 16.8214C7.25639 15.0841 9.58144 14 12.1597 14C14.6441 14 16.8933 15.0066 18.5218 16.6342C19.4526 15.3267 20 13.7273 20 12C20 7.58172 16.4183 4 12 4ZM12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5ZM12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7Z"></path></svg>        </div>

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
            <li><Link to='/dashboard'>Dashboard</Link></li>
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