import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'
import { url_develope } from '../../const'


function RegisterPage() {
    const [username,setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress]= useState('')
    const [fullName, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('')
    const navigate = useNavigate()



    const validateEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
      return emailPattern.test(email);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!username || !email || !password) {
        setNotif('Data required');
        return;
      }
      if(password != confirmPassword){
        setError('Password not match')
        return
      }
  
      if (!validateEmail(email)) {
        console.log('Invalid email address. Please use a valid Gmail or Yahoo email.');
        return;
      }
  
      try {
        const response = await axios.post(`${url_develope}/account/auth/register`, {
          username,
          fullName,
          email,
          password,
          address

        });
  
        if (response.status === 201) {
          setNotif('Berhasil membuat akun')
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 2000);
          
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || 'Error during registration.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    };


  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.</p>
      </div>

      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
        {notif && (
                <div role="alert" className="alert alert-success mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{notif}</span>
                </div>
              )}
              

        {error && (
              <div role="alert" className="alert alert-warning">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input 
            type="text"  
            value={username}
            onChange={(e) =>setUsername(e.target.value)}
            id="username"
            className="input input-bordered" 
            required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Full name</span>
            </label>
            <input 
            type="text"  
            value={fullName}
            onChange={(e) =>setFullname(e.target.value)}
            id="fullname"
            className="input input-bordered" 
            required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
            type="email"  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="input input-bordered" 
            required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
             type="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             id="password"
             className="input input-bordered" 
             required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">confirm Password</span>
            </label>
            <input
             type="password" 
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             id="confirmPassword"
             className="input input-bordered" 
             required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input 
            type="text"  
            value={address}
            onChange={(e) =>setAddress(e.target.value)}
            id="address"
            className="input input-bordered" 
            required />
          </div>


          <div className="form-control mt-6">
          <button onClick={handleSubmit} className="btn btn-primary">Register</button>
            <p className="text-sm mt-2"> Sudah punya akun?{' '}
          <Link
            to="/login"
            className="link link-primary">
            <u>Masuk</u>
          </Link>
        </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default RegisterPage