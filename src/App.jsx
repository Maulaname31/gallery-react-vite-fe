import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import LoginPage from './pages/login/loginPage';
import RegisterPage from './pages/login/registerPage';
import Upload from './pages/upload/upload';

function App() {
  return (
<Router>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/upload' element={<Upload/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
  </Routes>
</Router>
  );
}

export default App;
