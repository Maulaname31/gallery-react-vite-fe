import React,{useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { url_develope } from '../../const'
import { PhotoAlbum } from 'react-photo-album'
import Nav from '../../components/nav'
import Footer from '../../components/footer'



function CategoryPage() {
    const {categoryId} = useParams()
    const [categoryImage, setCategoryImage] = useState([])
    const navigate = useNavigate()

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
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, [categoryId]); 

  useEffect(() => {
    fetchCategoryData();  
  }, [fetchCategoryData]); 

  return (
    <div className='h-auto'>
    <Nav />

    <div className='p-4 mt-8 mx-auto my-auto shadow-md'>
        {categoryImage.length > 0 ?(
      <PhotoAlbum
        className='rounded-lg'
        layout="rows"
        photos={categoryImage}
        targetRowHeight={150}
        onClick={(e) => {navigate(`/view/${e.photo.photoId}`)}}
        />
      ):(
        <p className='text-center'>There are no images available for this category.</p>
      )}
      </div>

      <div>
      <Footer />
    </div>
  </div>
  )
}

export default CategoryPage