import { useNavigate, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { swalConfirm } from '../../../components/alert';

function Sidebar() {
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
    

    <div className="navbar z-[999] bg-[#2D3250] shadow-lg">
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
        <Link to='/' className="btn btn-ghost text-xl">PictUL</Link>

        {userInfo.role === 'admin' ? (
          <>
            <li><Link to='/dashboardAdmin'><i className="ri-dashboard-fill"></i> Dashboard<span className='badge'>admin</span></Link>
            </li>
            <li><Link to="/photo"><i className="ri-image-2-line"></i> Gallery</Link></li>
            <li><Link to="/album"><i className="ri-folder-image-line"></i>Album</Link></li> 
            <li><Link to='/categoryTable'><i className="ri-hashtag"></i>Category<span className='badge'>admin</span></Link></li>
            {/* <li><Link to="/like-comment"><i className="ri-thumb-up-line"></i>Like & Comment</Link></li>  */}
            <li><Link to="/manageAccount"><i className="ri-shield-user-fill"></i>Accounts<span className='badge'>admin</span> </Link></li> 
          </>
        ) : (
          <>
            <li><Link to="/photo"><i className="ri-upload-2-fill"></i> Gallery</Link></li>
            <li><Link to="/album"><i className="ri-folder-image-line"></i>Album</Link></li> 
            {/* <li><Link to="/like-comment"><i className="ri-thumb-up-line"></i>Like & Comment</Link></li>  */}
        
          </>
        )}

        <hr className='mt-11 mb-3' />
        <li onClick={handleLogout}><a><i className="ri-logout-box-line"></i>LogOut</a></li>
      </ul>
    </div>
      </div>

      <div className="navbar-center">
        <Link to='/' className="btn btn-ghost text-xl">PictUL </Link>
      </div>

      <div className="navbar-end">
      <>
          <p className='mr-3'> <i>{userInfo.username ? userInfo.username : ''}</i></p>
        <div className='dropdown dropdown-end'>
     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online placeholder">
     <div className="bg-neutral text-neutral-content w-10 rounded-full">
      <span className="text-base">
        {userInfo.username.split("")[0].charAt()}
        {userInfo.username.split(" ")[1] ? userInfo.username.split(" ")[1].charAt(0) : ''}
        </span>
    </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link >
          <i className="ri-user-4-line"></i>Profile
          
          </Link>
        </li>
        <li onClick={handleLogout}><Link><i className="ri-logout-box-line"></i>Logout</Link> </li>
      </ul>
     </div>
     </>
      </div>
 


   </div>
 
  )
}

export default Sidebar