import React, {useState} from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { url_develope } from '../../const';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
 
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if (!email || !password) {
        setError('Email dan password harus diisi');
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
      if (!emailPattern.test(email)) {
        setError('Email tidak valid. Harap gunakan alamat email yang benar.');
        return;
      }

      const response = await axios.post(`${url_develope}/account/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('jwtToken', data.token);
    
  
        if (response.data.role === 'admin') {
          navigate('/dashboardAdmin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      setError('Email atau password salah!');
    }
  };
  

  return (
    
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <p className="py-6"> Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

        <form className="card-body">
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
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
            <p className="text-sm mt-2"> Belum punya akun?{' '}
              <Link
                to="/register"
                className="link link-primary"
                onClick={() => navigate('/register', { replace: true })}
              >
                <u>Registrasi sekarang</u>
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  </div>
  )
}

export default LoginPage