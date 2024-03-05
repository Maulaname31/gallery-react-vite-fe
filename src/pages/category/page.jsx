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
    const [showDropdown, setShowDropdown] = useState(false)
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
        layout="rows"
        photos={categoryImage}
        breakpoints={[300, 600, 1200]}
        onClick={(e) => {navigate(`/view/${e.photo.photoId}`)}}
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
        <div className='transition duration-300 transform relative' style={{ ...wrapperStyle }}>
          <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50'>
            <div className="absolute top-0 right-0 mr-2 mt-2 text-white" onClick={() => setShowDropdown(!showDropdown)}>
              <div className=" p-2 rounded-full hover:bg-zinc-700">
              <i className="ri-more-fill"></i>
          </div>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg">
           
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 1</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 2</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 3</a>
              </div>
            </div>
          )}
        </div>
      </div>
            {renderDefaultPhoto({ wrapped: true })}
            {photo.tittle && (
              <div
                className='hover:shadow-lg'
                style={{
                  position: "absolute",
                  overflow: "hidden",
                  backgroundColor: "rgba(255 255 255 / .6)",
                  inset: "auto 0 0 0",
                  padding: 8,
                }}
              >
                {photo.tittle}
              </div>
            )}
          </div>
        )}
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