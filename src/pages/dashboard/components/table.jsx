import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url_develope } from '../../../const';

function Table() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Definisikan setIsLoading
    const [selectedRole, setSelectedRole] = useState('')

    useEffect(() => {
        setIsLoading(true); // Set isLoading menjadi true saat memuat data
        axios.get(`${url_develope}/account/auth/`)
          .then(response => {
            setData(response.data);
            setIsLoading(false); // Set isLoading menjadi false saat data sudah dimuat
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          });
          
    }, []);
    
    const handleSelectRole = (value, index) => {
        
    }

    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr><td colSpan="5">Loading...</td></tr>
                    ) : (
                        data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <td className="border-r p-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{++index}</td>
                                    <td className="border-r p-2">{item.username}</td>
                                    <td className="border-r p-2">{item.email}</td>
                                    <td className="border-r p-2">
                                        <select
                                        className="select select-accent w-full max-w-xs"
                                        label={item.role}
                                        value={item.selectedRole} 
                                        defaultValue={item.role}
                                            onChange={(value) => handleSelectRole(value, index)}
                                        >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                        </select></td>
                                    <td className="border-r p-2 flex justify-center gap-2">
                                           <>
                                            <button
                                            className="bg-indigo-500 text-white rounded-full p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110"
                                            onClick={() => navigate(`/updateAccount/${item.company_code}`, {replace:true})}
                                            >
                                            <i className="ri-edit-line" />
                                            </button>

                                            <button
                                            onClick={() => handleDelete(item.company_code)}
                                            className="bg-red-500 text-white rounded-full p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110"
                                            >
                                            <i className="ri-delete-bin-line" />
                                            </button>
                                        </>

                                     </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No data available</td></tr>
                        )
                    )}  
                </tbody>
            </table>
        </div>
    );
}

export default Table;
