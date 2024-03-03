import React, { useState, useEffect, useCallback } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { url_develope } from '../const';
import axios from 'axios';
import { PhotoAlbum } from 'react-photo-album';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [post, setPost] = useState([]);
  const [show, setShow] = useState(false)
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
  useEffect(() => {
    fetchPostData();  
  }, [fetchPostData]); 


  return (
    <div className='h-auto'>
      <div>
      <Nav />
      </div>

      <div className='p-4 mt-8 mx-5 my-auto shadow-2xl rounded-md'>
        <PhotoAlbum
          className='rounded-xl'
          layout="rows"
          photos={post}
          targetRowHeight={150}
          onClick={(e) => {navigate(`/view/${e.photo.photoId}`)}}
          />
        </div>

        <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;