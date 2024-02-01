import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'


function RegisterPage() {
    const [username, setusername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
  
      if (!validateEmail(email)) {
        console.log('Invalid email address. Please use a valid Gmail or Yahoo email.');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:3001/api/account/auth/register', {
          username,
          email,
          password,
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input 
            type="username"  
            value={username}
            onChange={(e) => setusername(e.target.value)}
            id="username"
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