import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './pages/login/privateRoute';
import './App.css';
import Home from './pages/home';
import LoginPage from './pages/login/loginPage';
import RegisterPage from './pages/login/registerPage';
import AccountTb from './pages/dashboard/account'
import Category from './pages/dashboard/category';
import AccountUpdate from './pages/dashboard/components/action/accountUpdate';
import Photos from './pages/dashboard/photos';
import Upload from './pages/dashboard/components/action/uploadPhoto';
import UpdatePhoto from './pages/dashboard/components/action/updatePhoto';
import CategoryPage from './pages/category/page';
import ViewImage from './pages/view/page';
import Album from './pages/dashboard/album';
import ViewAlbum from './pages/album/page'
import ViewPhoto from './pages/album/photoAlbum'
import DashboardAdmin from './pages/dashboard/adminDashboard';


function App() {
  return (
<Router>
  <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/view/:photoId' element={<ViewImage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
       <Route path='/register' element={<RegisterPage/>}/>


        <Route element={<PrivateRoute />}>
        <Route path='/dashboardAdmin' element={<DashboardAdmin/>}/>
        <Route path='/categoryTable' element={<Category/>}/>
        <Route path='/manageAccount' element={<AccountTb/>}/>
        <Route path='/updateAcc/:userId' element={<AccountUpdate/>}/>
        <Route path='/photo' element={<Photos/>}/>
        <Route path='/uploadPhoto' element={<Upload/>}/>
        <Route path='/updateUpload/:photoId' element={<UpdatePhoto/>}/>
        <Route path='/categoryPage/:categoryId' element={<CategoryPage/>}/>
        <Route path='/viewAlbum' element={<ViewAlbum/>}/>
        <Route path='/viewAlbum/photo/:albumId' element={<ViewPhoto/>}/>
        <Route path='/album' element={<Album/>}/>

        
        </Route>
  </Routes>
</Router>
  );
}

export default App;
