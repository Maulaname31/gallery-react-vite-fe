import React,{useState, useEffect} from 'react'
import Sidebar from './components/sidebar'
import axios from 'axios'
import { url_develope } from '../../const'
import { Link } from 'react-router-dom'

function DashboardAdmin() {
  const [countPhotos, setCountPhotos] = useState()
  const [countAccounts, setCountAccounts] = useState()
  const [countCategories, setCountCategories] = useState()

  useEffect(() => {


    axios.get(`${url_develope}/account/auth/`)
        .then(response => {
            setCountAccounts(response.data.length);

        })
        .catch(error => {

        });


    axios.get(`${url_develope}/upload/`)
        .then(response => {
            setCountPhotos(response.data.length);

        })
        .catch(error => {
            console.error('Error fetching photos:', error);

        });

    axios.get(`${url_develope}/category/`)
        .then(response => {
            setCountCategories(response.data.length);

        })
        .catch(error => {
            console.error('Error fetching categories:', error);

        });
}, []);

  
  return (
   <>
   <Sidebar/>
   <div className='relative overflow-x-auto m-5'>
    <div>
    <div className="mt-2 flex flex-wrap justify-center items-center gap-9 ">
      <Link to="/manageAccount"
        className="flex h-20 w-40 bg-slate-100 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
        <i className="ri-user-fill mr-3 text-2xl"></i>

            <span className="font-bold text-gray-600">{countAccounts} </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Users</div>
    </Link>

    <Link to="/photo"
        className="flex h-20 w-40 bg-slate-100 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
        <i className="ri-image-line mr-3 text-2xl"></i>

            <span className="font-bold text-gray-600"> {countPhotos} </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Photos</div>
    </Link>

 
    <Link to="/categoryTable"
        className="flex h-20 w-40 bg-slate-100 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <div className="flex flex-row items-center justify-center">
        <i  className="ri-hashtag mr-3 text-2xl"></i>

            <span className="font-bold text-gray-600"> {countCategories } </span>
        </div>

        <div className="mt-2 text-sm text-gray-400">Categories</div>
    </Link>
</div>
</div>
    </div>

   </>
  )
}

export default DashboardAdmin