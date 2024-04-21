import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/sidebar';
import Loading from '../../components/loading';
import axios from 'axios';
import { url_develope } from '../../const';
import { useNavigate } from 'react-router-dom';
import { swalConfirm } from '../../components/alert';
import { jwtDecode } from 'jwt-decode';
import Pagination from './components/pagination';


function Photos() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const [galleryType, setGalleryType] = useState('public'); 
    const [currentPage, setCurrentPage] =useState(1);
    const recordsPerPage = 5;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    const token = localStorage.getItem('jwtToken');
  const getUserInfo = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return {
        userID: decodedToken.userId,
        role: decodedToken.role
      };
    }
    return null;
  };
  const userInfo = getUserInfo();

    
            const fetchData = useCallback(async () => {
                try {
                    setIsLoading(true);
                    let response;
                    
                    if (galleryType === 'own') {
                        response = await axios.get(`${url_develope}/upload/`);
                    } else if (galleryType === 'public') {
            
                        response = await axios.get(`${url_develope}/upload/photo/${userInfo.userID}`);
                    }
                    const dataImageUrl = response.data.reverse().map((item) => ({
                        ...item,
                        src: `http://localhost:3001/${item.fileLocation[0].src}`
                    }));
                    setData(dataImageUrl);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false);
                }
            }, [userInfo.userID, galleryType]);

    const handleGalleryTypeChange = (event) => {
        setGalleryType(event.target.value);

    };

    const handleOpenLightbox = (photoId) =>{
        console.log(photoId)
    }
    


    useEffect(() => {
        if (userInfo.userID) {
            fetchData();
        }
    }, [userInfo.userID, fetchData]);

    
    const handleDelete = (photoId) => {
        swalConfirm("Are you sure?","Are you sure you want to delete this!", "warning", "Yess, Delete it")
        .then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                axios.delete(`${url_develope}/upload/deletePhoto/${photoId}`)
                .then(response => {
                    fetchData(); 
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                })

                axios.delete(`${url_develope}/comment/deleteCommentPhoto/${photoId}`)
                .then(response => {
                    fetchData(); 
                })
                .catch(error => {
                    console.error('Error deleting photo:', error);
                })

                axios.delete(`${url_develope}/like/deleteLikePhoto/${photoId}`)
                .then(response => {
                    fetchData(); 
                })
                .catch(error => {
                    console.error('Error deleting Like:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            }
        });
    }

    return (
        <>

         <Sidebar />
            <div className='relative bg-gray-800 overflow-x-auto shadow-md sm:rounded-lg m-5'>
                <div className='m-3 '> 
                    <p className='text-xl md:text-2xl'>All Photo List</p>
                    <p className='text-base text-start mt-2 '>Photo total: {data.length}</p>
                </div>
                    <div className='flex  justify-end m-4'>
                    {userInfo.role === 'admin' && (
                <select className="select select-bordered w-full max-w-48 mx-3" value={galleryType} onChange={handleGalleryTypeChange}>
                    <option value="own">Public Gallery</option>
                    <option value="public">Own Gallery</option>
                </select>
            )}
                        
                        <button
                        className="btn btn-primary"  
                        onClick={() => navigate('/uploadPhoto')}>
                            + Photos
                        </button>
                    </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Photo Tittle
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Photo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                                    <Loading />  
                        ) : (
                            data.length > 0 ? (
                                currentRecords.map((item, index) => (
                                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {(currentPage - 1) * recordsPerPage + index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.photoTittle}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.categories.map((category, index) => (
                                                <span key={index}
                                                >
                                                    {category.nameCategory}
                                                    {index !== item.categories.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{
                                            <img
                                            src={item.src}
                                            alt={item.photoTittle}
                                            onClick={(e) => {handleOpenLightbox(item.photoId)}}
                                            className="object-cover w-24 h-24 rounded-md"
                                          />}
                                          </td>
                                        <td className="px-6 py-4 whitespace-nowrap ">
                                            <button onClick={() => navigate(`/updateUpload/${item.photoId}`)} className="bg-blue-500 text-white rounded-md p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110" >
                                            <i className="ri-edit-line"></i>
                                            </button>

                                            <button onClick={() => handleDelete(item.photoId)} className="ml-3 bg-red-500 text-white rounded-md p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110" >
                                            <i className="ri-delete-bin-line"></i>
                                            </button>   
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className='text-center ' colSpan="5 ">No data available</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
                {data.length > 0 && (
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
            
            </div>
        </>
    );
}

export default Photos;
