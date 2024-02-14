import React, { useState, useEffect, useCallback } from 'react';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { url_develope } from '../const';
import axios from 'axios';
import Lightbox from "yet-another-react-lightbox";
import { PhotoAlbum } from 'react-photo-album';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

function Home() {
  const [post, setPost] = useState([]);
  const [index, setIndex] = useState(-1)


  const fetchPostData = useCallback(async () => {
    try {
      const response = await axios.get(`${url_develope}/upload/`);
      const dataImageUrl = response.data.map((item) => ({
        ...item,
        src: `http://localhost:3001/${item.fileLocation[0].src}`,
        width: item.fileLocation[0].width,
        height: item.fileLocation[0].height,
   
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
      <Nav />

      <div className='p-4 mt-8 mx-auto my-auto shadow-md'>
        <PhotoAlbum
          className='rounded-lg'
          layout="rows"
          photos={post}
          targetRowHeight={150}
          onClick={({ index }) => setIndex(index)} 
        />
        </div>

         <Lightbox
        slides={post}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom,Captions]}
        
      /> 




        <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;