import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url_develope } from '../../const';
import Loading from '../../components/loading';
import { swalConfirm, swalSucces } from '../../components/alert';
import Sidebar from './components/sidebar';
import Pagination from './components/pagination';

function TableAccount() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('')
    const [countAdmins, setCountAdmins] = useState('')
    const [countUsers, setCountUsers]= useState('')
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] =useState(1);
    const recordsPerPage = 5;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${url_develope}/account/auth/`)
          .then(response => {
            const accounts = response.data
            setData(accounts);
            setIsLoading(false); 

            const countAdmins = accounts.filter(account => account.role === 'admin').length;
            const countUsers = accounts.filter(account => account.role === 'user').length;
            setCountAdmins(countAdmins)
            setCountUsers(countUsers)
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
        <>
        <Sidebar/>
      <div className='relative overflow-x-auto bg-gray-800 shadow-md sm:rounded-lg m-5'>
        <div className='m-3 '> 
        <p className='text-xl md:text-2xl'>Account List</p>
        <p className='text-base text-start mt-2 '>Account total: {data.length}(User:{countUsers}, Admin:{countAdmins})</p>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow-md sm:rounded-lg m-5">
            {isLoading && (
                <tbody>
                    <tr><td colSpan="5">Loading...</td></tr>
                </tbody>
            )}
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
                {!isLoading && data.length > 0 ? (
                    currentRecords.map((item, index) => (
                        <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className=" p-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {(currentPage - 1) * recordsPerPage + index + 1}</td>
                            <td className=" p-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.username}</td>
                            <td className=" p-2">{item.email}</td>
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
    
    
                            <td className=' p-2'>
                                <>
                                <button
                                onClick={() => handleChangeRole(item.userId)}
                                className="btn btn-primary btn-sm"
                                >   
                                {isLoading ? 'Changing Role...' : 'Change Role'}
                                </button>
                              </>
                            </td>
                            <td className=" p-2 whitespace-nowrap">
                                <>
                                <button
                                className="bg-indigo-500 text-white rounded-md mr-3 p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110"
                                onClick={() => navigate(`/updateAcc/${item.userId}`, {replace:true})}>
                                <i className="ri-edit-line" />
                                </button>

                                <button
                                onClick={() => handleDelete(item.userId)}
                                className="bg-red-500 text-white rounded-md p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110">
                                <i className="ri-delete-bin-line" />
                                </button>
                              </>
    
                             </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="5">No data available</td></tr>
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

export default TableAccount;
