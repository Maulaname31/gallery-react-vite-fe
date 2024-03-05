import React, {useState, useEffect} from 'react'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { url_develope } from '../../const'
import { useNavigate } from 'react-router-dom'

function AlbumPage() {
  const [dataAlbum, setDataAlbum] = useState([])
  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate()
  const getUserId = () => {
    if (token) {
      const decode = jwtDecode(token);
      return decode.userId;
    }
    return null;
  };
  const userId = getUserId();

  const fetchData =()=>{
    axios.get(`${url_develope}/album/user/${userId}`)
    .then(response => {
        setDataAlbum(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    const handleViewAlbum = ({ albumId, userId }) => {
      navigate(`/viewAlbum/photo/${albumId}`, { state: { userId: userId } });
    };

    useEffect (() =>{
      fetchData()
    }, [])

  return (
    <div>
      <div>
        <Nav/>
      </div>
<div className=' p-4 mt-8 mx-auto max-w-4xl shadow-xl'>
  <div className="flex flex-wrap justify-center gap-6">
    {dataAlbum.map((album, index) => (
      <div 
            key={index} 
            className="card lg:card w-72 bg-base-100 shadow-xl image-full cursor-pointer hover:shadow-2xl"
            onClick={() => handleViewAlbum({ albumId: album.albumId, userId: album.userId })}>
                <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
              <div className="card-body">
                <h2 className="card-title">{album.albumName}</h2>
                <p>{album.description}</p>
              </div>
        </div>
    ))}
  </div>
</div>

    <div>
      <Footer/>
    </div>
  </div>
  )
}

export default AlbumPage