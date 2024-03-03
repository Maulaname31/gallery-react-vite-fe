import { useNavigate, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { swalConfirm } from '../../../components/alert';

function Sidebar() {
  const token = localStorage.getItem('jwtToken');
  const getRole = () => {
    if (token) {
      const decode = jwtDecode(token);
      return decode.role;
    }
    return null;
  };
  const userRole = getRole();
  const Navigate = useNavigate()

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
    // lg:drawer-open
    // <div className="drawer z-[999] ">
    // <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
    //   <div className='m-3'>
    //    <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle drawer-button ">
    //    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
    //     </label>
    //    </div>
    

    <div className="navbar bg-base-200 z-[999] shadow-lg">
      <div className="navbar-start">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </label>

        <div className="drawer-side z-50">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <Link to='/' className="btn btn-ghost text-xl">GalleryUi</Link>

        {userRole === 'admin' ? (
          <>
            <li><Link to='/dashboard'><i className="ri-dashboard-fill"></i> Dashboard<span className='badge'>admin</span></Link>
            </li>
            <li><Link to="/photo"><i className="ri-upload-2-fill"></i> Post Image</Link></li>
            <li><Link to="/album"><i className="ri-folder-image-line"></i>Album</Link></li> 
            <li><Link to='/categoryTable'><i className="ri-hashtag"></i>Category<span className='badge'>admin</span></Link></li>
            <li><Link to="/like-comment"><i className="ri-thumb-up-line"></i>Like & Comment</Link></li> 
          </>
        ) : (
          <>
            <li><Link to="/photo"><i className="ri-upload-2-fill"></i> Post Image</Link></li>
            <li><Link to="/album"><i className="ri-folder-image-line"></i>Album</Link></li> 
            <li><Link to="/like-comment"><i className="ri-thumb-up-line"></i>Like & Comment</Link></li> 
          </>
        )}

        <hr className='mt-11 mb-3' />
        <li onClick={handleLogout}><a>LogOut</a></li>
      </ul>
    </div>
      </div>

      {/* <div className="navbar-center">
        <Link to='/' className="btn btn-ghost text-xl">daisyUI</Link>
      </div> */}

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
 


   </div>
 
  )
}

export default Sidebar