import React,{useState, useEffect} from 'react'
import { useParams, useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { swalSucces } from '../../../../components/alert'
import { url_develope } from '../../../../const'

function AccountUpdate() {
    const {userId} = useParams()
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [address, setAddress]= useState('')
    const [fullName, setFullname] = useState('')
    const [warning, setWarning] = useState('')

    useEffect(() => {
        axios
        .get(`${url_develope}/account/auth/${userId}`)
        .then((response) => {
          const userData = response.data; 
     
          setUsername(userData.username);
          setEmail(userData.email);
          setAddress(userData.address || ''); 
          setFullname(userData.fullName || '');
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
    }, [userId]);

    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!password) {
          setWarning('Password is required.');
          return; 
        }
          if (password !== confirmPassword) {
        setWarning('Passwords do not match.');
        return;
          }
        axios.put(`${url_develope}/account/auth/updateAcc/${userId}`, {
             username,
             email,
             address,
             fullName, 
             password })
          .then(response => {
            swalSucces("Success", "successfully updated the data", "success")
            navigate('/dashboard', {replace:true})
          })
          .catch(error => {
            console.error(error);
          });
      };

  return (
    <div className="mx-auto max-w-6xl py-20 px-12 lg:px-24  sm:rounded-lg mb-24">
    <div className='font-bold text-center text-lg uppercase'>
      <h2>Edit account</h2>
    </div>  
  <form onSubmit={handleSubmit} >
    <div className=" shadow-md sm:rounded-lg bg-slate-800 px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="username">
            username
          </label>
          <input 
          className="w-full input input-bordered rounded py-3 px-4 mb-3" 
          id="username" 
          type="text"
          value={username || '' } 
          onChange={(e) => setUsername(e.target.value)} required/> 
        </div>

        <div className="md:w-1/2 px-3 ">
          <label className="uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="email">Full Name</label>
          <input 
          className="w-full input input-bordered rounded py-3 px-4 mb-3" 
          id="fullName" 
          type="text" 
          value={fullName || ''}
          onChange={(e) => setFullname(e.target.value)} required/>
        </div>
      </div>

      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <div>
          <label className="uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="instance">Email</label>
          <input
           className="w-full input input-bordered rounded py-3 px-4 mb-3" 
           id="email" 
           type="email"
           value={email|| ''}
           onChange={(e) => setEmail(e.target.value)} required/>
          </div>
        </div>

        <div className="md:w-1/2 px-3">
          <div>
          <label className="uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="address">Address</label>
          <input
            className="w-full input input-bordered rounded py-3 px-4 mb-3"
            id="instanceAddress"
            type="text"
            value={address|| ''}
            onChange={(e) => setAddress(e.target.value)} required/>
          </div>
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label className="uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="password">New Password</label>
          <input className="w-full input input-bordered rounded py-3 px-4 mb-3" 

          type="password" 
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"  />
          {warning && <p className="text-red-500">{warning}</p>}
        </div>
      </div>

      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label className="uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="password">Confirm New Password</label>
          <input className="w-full input input-bordered rounded py-3 px-4 mb-3" 

          type="password" 
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="******"  />
          {warning && <p className="text-red-500">{warning}</p>}
        </div>
      </div>

      <div className="-mx-3 md:flex mt-2">
            <div className="md:w-full px-3">
              <button
                type="submit"
                className="md:w-full bg-green-500 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full"
              >
                Submit
              </button>
            </div>
            <div className="md:w-full ">
              <Link to="/dashboard" className="btn btn-primary md:w-full font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full">
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AccountUpdate