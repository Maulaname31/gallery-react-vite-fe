import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url_develope } from '../../../const';
import Loading from '../../../components/loading';
import { swalConfirm, swalSucces } from '../../../components/alert';
import { Result } from 'postcss';

function TableAccount() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${url_develope}/account/auth/`)
          .then(response => {
            setData(response.data);
            setIsLoading(false); 
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          });
          
    }, []);
    
    const handleSelectRole = (value, userId) => {
        setSelectedRole(value);
        const updatedData = data.map(item => {
            if (item.userId === userId) {
                return { ...item, role: value };
            }
            return item;
        });
        setData(updatedData); 
    };

      const handleChangeRole = (userId) =>{
        axios.put(`${url_develope}/account/auth/changeRole/${userId}`, {newRole: selectedRole})
        .then((response)=>{
            console.log('change role succsess')

            const updateData = data.map(item =>{
                if(item.userId === userId){
                    return{...item, role: selectedRole}
                }
                return item
          });
          setData(updateData)
          swalSucces("Success", "successfully updated the data", "success")
        })
        .catch((error) => {
            console.error('Terjadi kesalahan:', error);
            setIsLoading(false);
          });
      };


    const handleDelete = (userId) => {

        swalConfirm("Are you sure?","Are you sure you want to delete this!", "warning")
        .then((Result) =>{
        if (Result.isConfirmed) {
            axios.delete(`${url_develope}/account/auth/deleteUser/${userId}`)
            .then(response => {
              const updatedData = data.filter(item => item.userId !== userId);
              setData(updatedData);
            })
            .catch(error => {
              console.error('Error deleting data:', error);
            });
        } else {
      
          console.log('Penghapusan dibatalkan');
        }
    })
      };

    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
            {isLoading && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 w-full'>
                <Loading/>
            </div>
            )}
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
                                    <td className="border-r p-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.username}</td>
                                    <td className="border-r p-2">{item.email}</td>
                                    <td className=" p-2">
                                        <select
                                            className="select select-accent w-full select-xs"
                                            value={item.role} 
                                            onChange={(event) => handleSelectRole(event.target.value, item.userId)}
                                        >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </td>


                                    <td className='border-r p-2'>
                                        <>
                                        <button
                                        onClick={() => handleChangeRole(item.userId)}
                                        className="btn btn-primary btn-sm"
                                        >   
                                        {isLoading ? 'Changing Role...' : 'Change Role'}
                                        </button>
                                      </>
                                    </td>
                                    <td className="border-r p-2 flex justify-center gap-3">
                                        <>
                                        <button
                                        className="bg-indigo-500 text-white rounded-full p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110"
                                        onClick={() => navigate(`/updateAcc/${item.userId}`, {replace:true})}
                                        >
                                        <i className="ri-edit-line" />
                                        </button>

                                        <button
                                        onClick={() => handleDelete(item.userId)}
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

export default TableAccount;
