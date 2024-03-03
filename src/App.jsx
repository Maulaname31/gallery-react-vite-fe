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
import UploadUpdate from './pages/dashboard/components/action/photoUpdate';
import CategoryPage from './pages/category/page';
import ViewImage from './pages/view/page';
import Album from './pages/dashboard/album';

function App() {
  return (
<Router>
  <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view/:photoId' element={<ViewImage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
       <Route path='/register' element={<RegisterPage/>}/>

        <Route element={<PrivateRoute />}>
        <Route path='/categoryTable' element={<Category/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/updateAcc/:userId' element={<AccountUpdate/>}/>
        <Route path='/photo' element={<Photos/>}/>
        <Route path='/uploadPhoto' element={<Upload/>}/>
        <Route path='/updateUpload/:photoId' element={<UploadUpdate/>}/>
        <Route path='/categoryPage/:categoryId' element={<CategoryPage/>}/>
        <Route path='/album' element={<Album/>}/>
        </Route>
  </Routes>
</Router>
  );
}

export default App;
