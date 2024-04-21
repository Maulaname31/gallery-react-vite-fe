import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Sidebar from './components/sidebar';
import { url_develope } from '../../const';
import Loading from '../../components/loading';
import { swalConfirm,swalSucces } from '../../components/alert';
import UpdateAlbum from './components/action/albumUpdate';
import { jwtDecode } from 'jwt-decode';
import Pagination from './components/pagination';



function Album() {
    const [data, setData] = useState([])
    const [albumName, setAlbumName] = useState('')
    const [description, setDescription] = useState('')
    const [coverPhoto, setCoverPhoto] = useState('')
    const [previewUrl, setPreviewUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [albumType , setAlbumType] = useState('public')
    const [editData, setEditData] = useState('')
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
            
            if (albumType === 'own') {
                response = await axios.get(`${url_develope}/album/`);
            } else if (albumType === 'public') {
    
                response = await axios.get(`${url_develope}/album/user/${userInfo.userID}`);
            }
            const dataImageUrl = response.data.reverse().map((item) => ({
                ...item,
                src: `http://localhost:3001/${item.coverPhoto}`
            }));
            setData(dataImageUrl);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [userInfo.userID, albumType]);


        const handleAlbumTypeChange = (e) =>{
            setAlbumType(e.target.value)
        }
      

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setPreviewUrl(event.target.result);
                };
                setCoverPhoto([file]); 
                reader.readAsDataURL(file);
                console.log(file)
            } else {
                console.error("Invalid file format");
            }
        }

          
        const handleSubmit = (e) => {
            e.preventDefault();
            setIsLoading(true);
        
            const formData = new FormData();
            formData.append('albumName', albumName);
            formData.append('description', description);
            if (coverPhoto && coverPhoto.length > 0) {
                formData.append('coverPhoto', coverPhoto[0]); 
            } else {
                formData.append('coverPhoto', '');
            }
            formData.append('userId', userInfo.userID);
        
            axios.post(`${url_develope}/album/createAlbum`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                fetchData();
                swalSucces('Success', "Category created successfully", "success");
                console.log()
            })
            .catch(error => {
                console.error('Error adding category:', error);
            });
        
            setAlbumName('');
            setDescription('');
            handleModalClose();
        };
        

        useEffect(() => {
            fetchData()
        },[fetchData])

        const handleDelete = (albumId) => {
            swalConfirm("Are you sure?","Are you sure you want to delete this!", "warning", "Yess, Delete it")
            .then((result) => {
                if (result.isConfirmed) {
                    setIsLoading(true);
                    axios.delete(`${url_develope}/album/deleteAlbum/${albumId}`)
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
        const handleEdit = async (formData, albumId) => {
            try {
                const response = await axios.put(`${url_develope}/album/updateAlbum/${albumId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
        
                if (response.status === 200) {
                    swalSucces("Success", "successfully updated the data", "success")
                    fetchData()
                }
            } catch (error) {
                console.error('Error editing album:', error);
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
    <>
    <Sidebar/>
    <div className="relative overflow-x-auto bg-gray-800 shadow-md sm:rounded-lg m-5">
      <div className='m-3   '> 
        <p className='text-xl md:text-2xl'>Albums List</p>
        <p className='text-base text-start mt-2 '>Albums total: {data.length}</p>
        </div>
            <div className='flex justify-end'>
            {userInfo.role === 'admin' && (
                <select className="select select-bordered w-full max-w-48 mx-3" value={albumType} onChange={handleAlbumTypeChange}>
                    <option value="public">Own Gallery</option>
                    <option value="own">Public Gallery</option>
                </select>
            )}
            <button className="btn btn-primary" onClick={handleOpenModal}>+ Album</button>
            <dialog id="addModal" className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg mb-3">Add Album</h3>

                        <div className="flex items-center justify-center w-2/2">
                            {!previewUrl ? (
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload cover</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input 
                                    id="dropzone-file" 
                                    type="file" 
                                    onChange={handleFileChange}
                                    className="hidden" />
                                </label>
                                ) : (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-w-full h-auto max-h-72 object-cover mx-auto"
                                />
                                )}
                     </div>
                                    
                        <div className='flex justify-center my-5'>
                            <input 
                                type="text" 
                                placeholder="Album Name" 
                                value={albumName}
                                onChange={(e)=> setAlbumName(e.target.value)}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                        </div>
                        <div className='flex justify-center '>
                            <textarea 
                                type="text" 
                                placeholder="(Optional)" 
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}
                                className="textarea-sm input input-bordered input-info w-full max-w-xs"
                            />
                        </div>
                        <div className='flex justify-end m-4'>
                            <button className="btn btn-primary " type='submit'>Add</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
        <UpdateAlbum
         handleModalEditClose={handleModalEditClose} 
         handleOpenEditModal={handleOpenEditModal}
         editData={editData}
         handleEdit={handleEdit}/>
   
            
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    No
                </th>
                <th scope="col" className="px-6 py-3">
                    Album Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Cover Photo
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
    {isLoading ? (
       <Loading/>
    ) : (
        data.length > 0 ? (
            currentRecords.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {(currentPage - 1) * recordsPerPage + index + 1}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white    ">
                        {item.albumName}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white    ">
                        {item.description}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.src ? (
                        <img
                            src={item.src}
                       
                            className="object-cover w-24 h-24 rounded-md"
                        />
                    ) : (
                        <span>No Cover</span>
                    )}
                </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                        <button  onClick={() => {handleOpenEditModal(); setEditData(item)}} className="bg-blue-500 text-white rounded-md p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110" >
                            <i className="ri-edit-line"></i>
                        </button>

                        <button onClick={() => handleDelete(item.albumId)} className="ml-3 bg-red-500 text-white rounded-md p-3 inline-flex items-center justify-center focus:outline-none transform transition duration-300 hover:scale-110" >
                            <i className="ri-delete-bin-line"></i>      
                        </button>   
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
     {data.length > 0 && (
    <Pagination
    nPages={nPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
        />
        )}
</div>
</>
  )
}

export default Album