import React, { useState, useEffect, useCallback } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { url_develope } from '../const';
import axios from 'axios';
import { PhotoAlbum } from 'react-photo-album';
import { useNavigate } from 'react-router-dom';
import { swalSucces } from '../components/alert';
import { jwtDecode } from 'jwt-decode';
import { swalConfirm } from '../components/alert';
import Search from '../components/search';



function Home() {
  const [post, setPost] = useState([]);
  const [originalPost, setOriginalPost] =useState([])
  const [dataAlbum, setDataAlbum] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [selectedPhotoId, setSelectedPhotoId] = useState('')
  const [albumName, setAlbumName] = useState('')
  const [description, setDescription] = useState('')
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

  const fetchPostData = useCallback(async () => {
    try {
      const response = await axios.get(`${url_develope}/upload/`);
      const dataImageUrl = response.data.map((item) => ({
        ...item,
        src: `http://localhost:3001/${item.fileLocation[0].src}`,
        width: item.fileLocation[0].width,
        height: item.fileLocation[0].height,
        photoId: item.photoId
   
      }));  
      setPost(dataImageUrl);
      setOriginalPost(dataImageUrl)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, []); 


  const fetchAlbum =()=>{

    axios.get(`${url_develope}/album/user/${userId}`)
    .then(response => {
      const data = response.data
        setDataAlbum(data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);

      });
    }
   const fetchCategory = () =>{
    axios.get(`${url_develope}/category/`)
    .then(response => {
      const data = response.data
        setDataCategory(data);

      })
      .catch(error => {
        console.error('Error fetching Category data:', error);

      });
   }
   const handleCategoryClick = (categoryId) =>{
    navigate(`/categoryPage/${categoryId}`)
  }

    const handleDelete = (photoId) => {
      swalConfirm("Are you sure?","Are you sure you want to delete this!", "warning", "Yess, Delete it")
      .then((result) => {
          if (result.isConfirmed) {
 
              axios.delete(`${url_develope}/upload/deletePhoto/${photoId}`)
              .then(response => {
                  fetchPostData(); 
              })
              .catch(error => {
                  console.error('Error deleting category:', error);
              })

              axios.delete(`${url_develope}/comment/deleteCommentPhoto/${photoId}`)
              .then(response => {
                  fetchPostData(); 
              })
              .catch(error => {
                  console.error('Error deleting photo:', error);
              })

              axios.delete(`${url_develope}/like/deleteLikePhoto/${photoId}`)
              .then(response => {
                  fetchPostData(); 
              })
              .catch(error => {
                  console.error('Error deleting Like:', error);
              })
              .finally(() => {
              });
          }
      });
  }

  const showModal = (photoId) =>{
    setSelectedPhotoId(photoId)
    document.getElementById('my_modal_3').showModal()
  }
    

  const handleAddphotoAlbum = async(albumId) =>{
    try {
      const response = await axios.put(`${url_develope}/upload/updatePhoto/${selectedPhotoId}`, {
        albumId: albumId
      });
      swalSucces('Success',"Add photo to album successfully", "success")
      document.getElementById('my_modal_3').close()
  } catch (error) {
  
      console.error('Gagal mengirim perubahan ke server:', error);
  }
};

const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post(`${url_develope}/album/createAlbum`, {
      albumName: albumName,
      description: description,
      userId: userId
  })
  
  .then(response => {
      swalSucces('Success', "Category created successfully", "success")
  })
  .catch(error => {
      console.error('Error adding category:', error);

  });
  setAlbumName('');
  setDescription('');
  handleModalClose();
  fetchAlbum()
};
  
const handleOpenModal = ()=>{
  document.getElementById('addModal').showModal()
}
const handleModalClose = () => {
  document.getElementById('addModal').close();
};

const searchPosts = (searchTerm) => {

  if (!searchTerm.trim()) {
    setPost(originalPost); 
    return;
  }
  const filteredPosts = post.filter((item) => {
    const lowercaseTitle = item.photoTittle ? item.photoTittle.toLowerCase() : '';
    const lowercaseDescription = item.description ? item.description.toLowerCase() : '';
  
    
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return (
      lowercaseTitle.includes(lowercaseSearchTerm) ||
      lowercaseDescription.includes(lowercaseSearchTerm)


    );
  });


  setPost(filteredPosts);
};


  
  useEffect(() => {
    fetchAlbum()
    fetchCategory()
    fetchPostData();  
  }, [fetchPostData]); 


  return (
    <div className='h-auto'>
      <div>
      <Nav />
      </div>
        <div className='flex justify-center'>
        <Search posts={post} onSearch={searchPosts} />
        </div>
        <div className="flex overflow-x-auto rounded-xl justify-center my-3 mx-4 md:mx-10 lg:mx-20">

      {dataCategory.map((item, index) => (        
        <a key={index} className="btn btn-outline mx-1 min-w-20 p-1 border text-center rounded-full lg:min-w-20 "
        onClick={() => handleCategoryClick(item.categoryId)}>
      {item.nameCategory}
    </a>

      ))}
    </div>

      <div className='relative p-4  mx-5 my-auto shadow-2xl rounded-md'>
      <PhotoAlbum
        layout="rows"
        photos={post}
        onClick={(e) => {navigate(`/view/${e.photo.photoId}`)}}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <>
          <div className="relative transition duration-300 transform inset-0 group hover:scale-95 " style={{ ...wrapperStyle }}>
              {renderDefaultPhoto({ wrapped: true })}
                <div className="absolute top-0 right-0 mr-2 mt-2 text-white">
               
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button" className="p-2 rounded-full transition duration-300 hover:scale-150 opacity-0 group-hover:opacity-100 ">
                          <i className="ri-more-fill"></i>  
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a><i className="ri-download-2-line"></i>Download</a></li>
                            <li onClick={() => {navigate(`/view/${photo.photoId}`);}}><a><i className="ri-eye-line"></i>View</a></li>
                          {token && ( 
                             <li onClick={() => showModal(photo.photoId)}><a><i className="ri-play-list-add-line"></i>Save to album</a></li>
                             )}
                            {photo.userId === userId && (
                                <li onClick={() => handleDelete(photo.photoId)} ><a><i className="ri-delete-bin-6-line"></i>Delete</a></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            </>
        )}
    />
    
    <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
                <h3 className="font-bold text-lg">Save to album</h3>
                <hr className='my-3 fill-black'/>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <p className="py-4 font-semibold">All albums: {dataAlbum.length}</p>
                <div className="overflow-auto max-h-80"> 
                    {dataAlbum.map((album, index) => (
                          <div  
                          key={index} 
                          className="my-2 block max-w-full p-4 bg-red-300 border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                          onClick={() => handleAddphotoAlbum(album.albumId)}>                       
                           <p className='text-lg'>{album.albumName}</p>
                          <p className='text-gray-300'> </p>
                        </div>
                    ))}
                </div>
            </form>
            <button onClick={handleOpenModal} className='btn right-2 float-end hidden sm:block'>Create new album</button> 
        </div>
    </dialog>
      </div>

      <div className='flex justify-end'>
            <dialog id="addModal" className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg mb-3">Add Album</h3>

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

        <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;