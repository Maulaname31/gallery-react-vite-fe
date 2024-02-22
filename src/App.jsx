import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './pages/login/privateRoute';
import './App.css';
import Home from './pages/home';
import LoginPage from './pages/login/loginPage';
import RegisterPage from './pages/login/registerPage';
import Upload from './pages/upload/upload';
import Dashboard from './pages/dashboard/dashboard';
import Category from './pages/dashboard/category';
import AccountUpdate from './pages/dashboard/components/action/accountUpdate';

function App() {
  return (
<Router>
  <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage/>}/>
       <Route path='/register' element={<RegisterPage/>}/>

        <Route element={<PrivateRoute />}>
        <Route path='/category' element={<Category/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/updateAcc/:userId' element={<AccountUpdate/>}/>

        </Route>
  </Routes>
</Router>
  );
}

export default App;
