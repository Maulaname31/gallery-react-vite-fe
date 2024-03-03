import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { url_develope } from '../../const';
import { jwtDecode } from 'jwt-decode';
import { swalConfirm } from '../../components/alert';

function ViewImage() {
  const {photoId} = useParams()
  const [photoData, setPhotoData] = useState([])
  const [imageSrc, setImageSrc]= useState('')
  const [ categories, setCategories] = useState ([])
  const [userData, setUserData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [contentComment, setcontentComment] = useState('')
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [likes, setLikes] = useState(0)
  const [userLiked, setUserLiked] = useState(false)
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
  
    const fetchImage = async () => {
    try {
        const response = await axios.get(`${url_develope}/upload/${photoId}`);
        const photoData = response.data
        const categoryData = photoData.categories
        const dataImageUrl = `http://localhost:3001/${photoData.fileLocation[0].src}`;
          setImageSrc(dataImageUrl)
          setCategories(categoryData)
          setPhotoData(photoData);
          fetchUser(photoData.userId); 
        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchComment = async () => {
      try {
        const response = await axios.get(`${url_develope}/comment/${photoId}`);
        const commentData = response.data;
        const uniqueUserIds = [...new Set(commentData.map(comment => comment.userId))];
        const userDataPromises = uniqueUserIds.map(async userId => {
          const userResponse = await axios.get(`${url_develope}/account/auth/${userId}`);
          return userResponse.data;
        });
    
        const userDataArray = await Promise.all(userDataPromises);
        const commentsWithUserNames = commentData.map(comment => {
          const userData = userDataArray.find(user => user.userId === comment.userId);
          return { ...comment, userName: userData ? userData.username : 'Unknown' };
        });
        setCommentData(commentsWithUserNames);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(`${url_develope}/account/auth/${userId}`);
        const userData = response.data;
        setUserData(userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
   
    const fetchLike = async ()=>{
      try{
        const response = await axios.get(`${url_develope}/like/likePhoto/${photoId}`)
        const likeData = response.data
        setLikes(likeData.length)

        if (likeData.some(like => like.userId === userID)) {
          setUserLiked(true);
        }
      } catch (error) {
        console.error('Error fetching Like data:', error);
      }
    };


    
    const handleSendComment =(e)=>{
      e.preventDefault()
      axios.post(`${url_develope}/comment/createComment`,{
        contentComment: contentComment,
        photoId: photoId,
        userId: userID,
      })
      .then(response =>{
      setcontentComment('')
      fetchComment()
    })
    .catch(error =>{
      console.error(error)
    })

    }

    const handleValidate =() =>{
      if(!userID){
      swalConfirm("login is required!","Login first before like or comment", "warning", "Login")
      .then((result) =>{
        if(result.isConfirmed){
          navigate('/login')
        }
      })
    }

    }
    
    const handleToggleDropdown = (index) => {
      setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    };

    const handleDelete = (commentId) => {
      swalConfirm("Are you sure?","Are you sure you want to delete this!", "warning", "Yess, Delete it")
      .then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${url_develope}/comment/deleteComment/${commentId}`)
            .then(response => {
                fetchComment(); 
                setOpenDropdownIndex(null)
            })
            .catch(error => {
              console.error('Error deleting category:', error);
            })
        }
    });
    };

    const handleEdit = () => {
    
    };

    const isCurrentUser = (userId) => {
      return userId === userID
    };

    //like handle
    const handleLike = async (e) => {
      try {
        if (!userID) {
          handleValidate(); // Panggil handleValidate jika userID tidak ada
          return; // Hentikan eksekusi lebih lanjut
        }
        if (userLiked) {
          await axios.delete(`${url_develope}/like/unlike/${userID}`);
          setLikes(likes - 1); 
          setUserLiked(false); 
        } else if (userID) {
          await axios.post(`${url_develope}/like/addLike`, { 
            photoId: photoId,
            userId: userID
          });
          setLikes(likes + 1); 
          setUserLiked(true); 
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  useEffect(() => {  
    fetchLike()
    fetchComment()
    fetchImage(photoId);
  }, [photoId]);

    
  return (
    <div className="container mx-auto px-4 py-8">
    <a href='/' className="block mb-4 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(13,169,242,1)">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
      </svg>
    </a>
    <div className="max-w-5xl mx-auto m-3">
     
        <div className="bg-[#7077A1] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 m-7 ">
            <img src={imageSrc} alt="Gambar" className="w-full h-auto rounded-xl" />
          </div>
          <div className="md:w-1/2">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{photoData.photoTittle}</h2>
              <p className="text-gray-800 ">{photoData.description}</p>
              <p>
              {categories.map((item, index) => (
                <span key={index}>
                  #{item.nameCategory} {index !== categories.length - 1 && ' '}
                </span>
              ))}
            </p>
              <p className="text-gray-400 mb-4">{new Date(photoData.uploadDate).toLocaleDateString('id-ID')}</p>
              <div className="text-gray-700 flex justify-between items-center mb-4">
              <p className="mr-2">Uploader: {userData.username}</p>
               <div className='flex items-center flex-col'>
                  <label className="swap swap-flip ">
                    <input   type="checkbox" onChange={handleLike} checked={userLiked} />
                    <svg  className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>            
                    <svg className="swap-on fill-current w-10 h-10 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(242,32,32,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>            
                  </label>
                <p className=''>{likes}</p>
              </div>
            </div>
              <hr/>
            </div>

            {/* Comment section */}
            {commentData.map((item, index) =>(
              <div key={index} className="rounded-lg p-4 relative">
              <div className="flex items-start">
                <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800">{item.userName}</span>
                  <p className="text-sm text-gray-800">{item.contentComment}</p>
                </div>
                <div className="ml-auto">
                  
                {isCurrentUser(item.userId) && (
                <button onClick={() => handleToggleDropdown(index)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4zm-2 2a2 2 0 114 0 2 2 0 01-4 0zm2 6a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
              {openDropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                          <div className="py-1">
                            <button onClick={handleEdit} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">Edit</button>
                            <button onClick={()=> handleDelete(item.commentId)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">Delete</button>
                          </div>
                        </div>
                      )}
                </div>
              </div>
            </div>
            ))}
  
            <form className='m-3' onSubmit={handleSendComment}>
             <label htmlFor="chat" className="sr-only">Your message</label>
               <div className="flex items-center px-3 py-2 rounded-lg  top-52  ">
              <textarea 
              onClick={handleValidate}
              id="chat" 
              rows="1" 
              value={contentComment}
              onChange={(e)=> setcontentComment(e.target.value)}
              className="block mx-4 p-2.5 w-full text-sm text-grray bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Your message...">
              </textarea>
              <button disabled={!userID}  type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
          </div>
        </div>
     
    </div>
  </div>
  
  );
}

export default ViewImage;
