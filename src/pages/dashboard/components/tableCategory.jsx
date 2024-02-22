import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { url_develope } from '../../../const';
import Loading from '../../../components/loading';
import CategoryUpdate from './action/categoryUpdate';
import Swal from 'sweetalert2';
import { swalSucces,  swalConfirm} from '../../../components/alert';

function TableCategory() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [categoryName, setCategoryName]= useState('')
    const [editData, setEditData] = useState('')


    useEffect(() => {
        fetchData()
    }, []);
    const fetchData =()=>{
    setIsLoading(true);
        axios.get(`${url_develope}/category/`)
          .then(response => {
            setData(response.data);
            setIsLoading(false); 
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          });
        }
          

    const handleSubmit =(e)=>{
        e.preventDefault();
        setIsLoading(true)
        axios.post(`${url_develope}/category/createCategory`, {
            nameCategory: categoryName,

        })
        
        .then(response => {
            fetchData()
            swalSucces('Success', "Category created successfully", "success")
        })
        .catch(error => {
            console.error('Error adding category:', error);
   
        });
        setCategoryName('');

        handleModalClose();
    };

    const handleDelete = (categoryId) => {
        swalConfirm("Are you sure?","Are you sure you want to delete this!", "warning", "Yess, Delete it")
        .then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                axios.delete(`${url_develope}/category/deleteCategory/${categoryId}`)
                .then(response => {
                    console.log('Category deleted successfully:', response.data);
                    fetchData(); 
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            }
        });
    }

      const handleEdit = async (e, editedData, categoryId) => {
        e.preventDefault();
    
        try {
          const response = await axios.put(`${url_develope}/category/updateCategory/${categoryId}`, editedData);
    
          if (response.status === 200) {
              swalSucces("Success", "successfully updated the data", "success")
              fetchData()
          }
        } catch (error) {
          console.error('Error editing guest:', error);
          setTimeout(() => {}, 3000);
        }
      };


      const handleOpenModal = ()=>{
         document.getElementById('addModal').showModal()
       }
       const handleModalClose = () => {
         document.getElementById('addModal').close();
     };
     
      const handleOpenEditModal = ()=>{
         document.getElementById('editModal').showModal()
         

       }
       const handleModalEditClose = () => {
         document.getElementById('editModal').close();
     };

      


  return (

<div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
                <div className='flex justify-center mb-5'>
            <button className="btn btn-primary" onClick={handleOpenModal}>+ Category</button>
            <dialog id="addModal" className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg mb-3">Add Category</h3>
                        <div className='flex justify-center gap-4'>
                            <input 
                                type="text" 
                                placeholder="Category Name" 
                                value={categoryName}
                                onChange={(e)=> setCategoryName(e.target.value)}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                        </div>
                        <div className='flex justify-end m-4'>
                            <button className="btn btn-primary " type='submit'>Add</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>

        <CategoryUpdate
         handleModalEditClose={handleModalEditClose} 
         handleOpenEditModal={handleOpenEditModal}
         editData={editData}
         handleEdit={handleEdit}/>
   
            {isLoading ? <Loading /> : (
            
           
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    No
                </th>
                <th scope="col" className="px-6 py-3">
                    Category Name
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
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {++index}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white    ">
                        {item.nameCategory}
                    </td>
                    <td className="px-6 py-4 flex  gap-3">
                        <a  onClick={() => {handleOpenEditModal(); setEditData(item)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a  onClick={() => handleDelete(item.categoryId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="5">No data available</td>
            </tr>
        )
       )}
    </tbody>

    </table>
     )}
</div>

  )
}

export default TableCategory