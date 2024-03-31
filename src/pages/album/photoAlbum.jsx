import React, {useEffect, useState, useCallback} from 'react'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import { url_develope } from '../../const'
import axios from 'axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { PhotoAlbum } from 'react-photo-album'
import { jwtDecode } from 'jwt-decode'
import { swalConfirm, swalSucces } from '../../components/alert'

function ViewAlbum() {
  const [albumImage, setAlbumImage] = useState([])
  const {albumId} = useParams()
  const location = useLocation();
  const { userId } = location.state;
  const navigate = useNavigate()

  const token = localStorage.getItem('jwtToken');
  const getUserId = () => {
    if (token) {
      const decode = jwtDecode(token);
      return decode.userId;
    }
    return null;
  };
  const userID = getUserId();


  const fetchAlbumData = useCallback(async () => {
    try {
      const response = await axios.get(`${url_develope}/upload/album/${albumId}`);
      const dataImageUrl = response.data.map((item) => ({
        ...item,
        src: `http://localhost:3001/${item.fileLocation[0].src}`,
        width: item.fileLocation[0].width,
        height: item.fileLocation[0].height,
   
      }));  

      setAlbumImage(dataImageUrl);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, [albumId]); 


  const handleDeleteFromAlbum = async (photoId) => {
    swalConfirm("Are you sure?", "Are you sure you want to delete this!", "warning", "Yes, Delete it")
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.put(`${url_develope}/upload/updatePhoto/${photoId}`, {
              albumId: ''
            });
            fetchAlbumData()
            swalSucces('Success', "Add photo to album successfully", "success");
          } catch (error) {
            console.error('Failed to send changes to the server:', error);
          }
        }
      })
      .catch((error) => {
        console.error('Failed to delete photo:', error);
      });
  };
  


  useEffect(() =>{
    fetchAlbumData()
  }, [fetchAlbumData])
  
  return (
    <div>
        <div>
            <Nav/>
        </div>
        <div className='relative p-4 mt-8 mx-5 my-auto shadow-2xl rounded-md'>
        {albumImage.length > 0 ?(
      <PhotoAlbum
        layout="rows"
        photos={albumImage}
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
                {userId === userID && (
                  <li onClick={() => handleDeleteFromAlbum(photo.photoId)} ><a><i className="ri-delete-bin-6-line"></i>Delete from album</a></li>
                )}
              </ul>
            </div>
          </div>
        </div>
 
            </>
        )}
    />
    ):(
      <p className='text-center'>There are no images available for this Albums.</p>
    )}
      </div>
        <div>
            <Footer/>
        </div>
    </div>
  )
}

export default ViewAlbum