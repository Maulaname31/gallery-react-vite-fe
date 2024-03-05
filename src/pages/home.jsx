import React, { useState, useEffect, useCallback } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { url_develope } from '../const';
import axios from 'axios';
import { PhotoAlbum } from 'react-photo-album';
import { useNavigate } from 'react-router-dom';
import { swalSucces } from '../components/alert';



function Home() {
  const [post, setPost] = useState([]);
  const [dataAlbum, setDataAlbum] = useState([])
  const [selectedPhotoId, setSelectedPhotoId] = useState('')
  const navigate = useNavigate()


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
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, []); 


  const fetchAlbum =()=>{

    axios.get(`${url_develope}/album/`)
    .then(response => {
      const data = response.data
        setDataAlbum(data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);

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
  


  
  useEffect(() => {
    fetchAlbum()
    fetchPostData();  
  }, [fetchPostData]); 


  return (
    <div className='h-auto'>
      <div>
      <Nav />
      </div>
      <div>

      </div>

      <div className='p-4 mt-8 mx-5 my-auto shadow-2xl rounded-md'>
      <PhotoAlbum
        layout="rows"
        photos={post}
        onClick={(e) => {navigate(`/view/${e.photo.photoId}`)}}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
            <div className='transition duration-300 transform relative inset-0 hover:scale-95 ' style={{ ...wrapperStyle }}>
                <div className="absolute top-0 right-0 mr-2 mt-2 text-white">
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button" className=" p-2 rounded-full hover:bg-zinc-700"><i className="ri-more-fill"></i></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Download</a></li>
                            <li onClick={() => {navigate(`/view/${photo.photoId}`);}}><a>View</a></li>
                            <li onClick={() => showModal(photo.photoId)}><a>Save to album</a></li>
                        </ul>
                    </div>
                </div>
                {renderDefaultPhoto({ wrapped: true })}
            </div>
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
                        <div key={index} className="my-2 block max-w-full p-4 bg-red-300 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <p className='text-lg'>{album.albumName}</p>
                            <p className='text-gray-300'>{album.description}</p>
                        </div>
                    ))}
                </div>
            </form>
            <button className='btn right-2 float-end hidden sm:block'>+ Album</button> 
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