import React,{useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { url_develope } from '../../const'
import { PhotoAlbum } from 'react-photo-album'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { jwtDecode } from 'jwt-decode'
import { swalSucces } from '../../components/alert'
import Search from '../../components/search'



function CategoryPage() {
    const {categoryId} = useParams()
    const [categoryImage, setCategoryImage] = useState([])
    const [originalPost, setOriginalPost] =useState([])
    const [dataCategory, setDataCategory] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState('')
    const [dataAlbum, setDataAlbum] = useState([])
    const [albumName, setAlbumName]= useState('')
    const [description, setDescription] = useState('')
    const [selectedPhotoId, setSelectedPhotoId] = useState('')
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

  const fetchCategoryData = useCallback(async () => {
    try {
      const response = await axios.get(`${url_develope}/upload/${categoryId}/image`);
      const dataImageUrl = response.data.map((item) => ({
        ...item,
        src: `http://localhost:3001/${item.fileLocation[0].src}`,
        width: item.fileLocation[0].width,
        height: item.fileLocation[0].height,
   
      }));  
      setCategoryImage(dataImageUrl);
      setOriginalPost(dataImageUrl)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, [categoryId]); 

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
          console.error('Error fetching data Category:', error);
  
        });
    }
    const handleCategoryClick = (categoryId) =>{
      navigate(`/categoryPage/${categoryId}`)
      setSelectedCategoryId(categoryId)
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
      setCategoryImage(originalPost); 
      return;
    }
    const filteredPosts = categoryImage.filter((item) => {
      const lowercaseTitle = item.photoTittle ? item.photoTittle.toLowerCase() : '';
      const lowercaseDescription = item.description ? item.description.toLowerCase() : '';
    
      
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      return (
        lowercaseTitle.includes(lowercaseSearchTerm) ||
        lowercaseDescription.includes(lowercaseSearchTerm)
  
  
      );
    });
  
  
    setCategoryImage(filteredPosts);
  };

  useEffect(() => {
    fetchCategoryData();  
    fetchCategory()
    fetchAlbum()
  }, [fetchCategoryData]); 

  return (
    <div className='h-auto'>
      <div>
      <Nav />
      </div>
      <div className='flex justify-center'>
        <Search posts={categoryImage} onSearch={searchPosts} />
        </div>
      <div className="flex overflow-x-auto rounded-xl justify-center my-6">
      {dataCategory.map((item, index) => (        
        <a key={index} className={`btn btn-outline mx-1 min-w-20 p-1 border text-center rounded-full ${selectedCategoryId === item.categoryId ? 'bg-gray-400 text-black' : ''} lg:min-w-20  `}
        onClick={() => handleCategoryClick(item.categoryId)}>
      {item.nameCategory}
    </a>

      ))}
    </div>


    <div className='p-4 mt-8 mx-auto my-auto shadow-md'>
        {categoryImage.length > 0 ?(
        <PhotoAlbum
        layout="rows"
        photos={categoryImage}
        breakpoints={[300, 600, 1200]}
        onClick={(e) => {navigate(`/view/${e.photo.photoId}`)}}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <>
          <div className='relative transition duration-300 transform inset-0 hover:scale-95 ' style={{ ...wrapperStyle }}>
              {renderDefaultPhoto({ wrapped: true })}
                <div className="absolute top-0 right-0 mr-2 mt-2 text-white">
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button" className=" p-2 rounded-full hover:bg-zinc-700"><i className="ri-more-fill"></i></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a><i className="ri-download-2-line"></i>Download</a></li>
                            <li onClick={() => {navigate(`/view/${photo.photoId}`);}}><a><i className="ri-eye-line"></i>View</a></li>
                            <li onClick={() => showModal(photo.photoId)}><a><i className="ri-play-list-add-line"></i>Save to album</a></li>
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
      ):(
        <p className='text-center'>There are no images available for this category.</p>
      )}
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
      </div>

      <div>
      <Footer />
    </div>
  </div>
  )
}

export default CategoryPage