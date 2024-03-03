import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/sidebar';
import Loading from '../../components/loading';
import axios from 'axios';
import { url_develope } from '../../const';
import { useNavigate } from 'react-router-dom';
import { swalConfirm } from '../../components/alert';
import { jwtDecode } from 'jwt-decode';

function Photos() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    const token = localStorage.getItem('jwtToken');
    const getUserId = () => {
      if (token) {
        const decode = jwtDecode(token);
        return decode.userId;
      }
      return null;
    };
    const userId = getUserId();

    
    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${url_develope}/upload/photo/${userId}`);
            const dataImageUrl = response.data.map((item) => ({
                ...item,
                src: `http://localhost:3001/${item.fileLocation[0].src}`
            }));
            setData(dataImageUrl);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId, fetchData]);

    
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
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg m-5'>
                <div className='flex  justify-end m-4'>
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
                                data.map((item, index) => (
                                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.photoTittle}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.categories.map((category, index) => (
                                                <span key={index}>
                                                    {category.nameCategory}
                                                    {index !== item.categories.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{
                                            <img
                                            src={item.src}
                                            alt={item.photoTittle}
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
            </div>
        </>
    );
}

export default Photos;
