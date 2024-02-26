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
  <div className="drawer z-[999] ">
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
      <Link to='/' className="btn btn-ghost text-xl">GalleryUi</Link>

      {userRole === 'admin' ? (
        <>
          <li>
            <Link to='/dashboard'>
              Dashboard
            <span className='badge'>admin</span>
            </Link>
          </li>
          <li><Link to="/photo">Post Image</Link></li>
          <li><Link>Album</Link></li>
          <li>
            <Link to='/categoryTable'
            >Category
            <span className='badge'>admin</span>
          </Link>
          </li>
          <li><Link>Like & Comment</Link></li>
        </>
      ) : 
      <>
      <li><Link>Post Image</Link></li>
      <li><Link>Album</Link></li>
      <li><Link>Like & Comment</Link></li>
        </>}

      <hr className='mt-11 mb-3' />
      <li onClick={handleLogout} className=''><a>LogOut</a></li>
    </ul>
  
  </div>
</div>
  )
}

export default Sidebar