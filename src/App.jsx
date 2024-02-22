import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './pages/login/privateRoute';
import './App.css';
import Home from './pages/home';
import LoginPage from './pages/login/loginPage';
import RegisterPage from './pages/login/registerPage';
import Dashboard from './pages/dashboard/dashboard';
import Category from './pages/dashboard/category';
import AccountUpdate from './pages/dashboard/components/action/accountUpdate';
import Photos from './pages/dashboard/photos';
import Upload from './pages/dashboard/components/action/uploadPhoto';

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
        <Route path='/updateAcc/:userId' element={<AccountUpdate/>}/>
        <Route path='/photo' element={<Photos/>}/>
        <Route path='/uploadPhoto' element={<Upload/>}/>
        </Route>
  </Routes>
</Router>
  );
}

export default App;
