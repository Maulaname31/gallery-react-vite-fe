import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { url_develope } from '../../const';
import { jwtDecode } from 'jwt-decode';
import { swalConfirm } from '../../components/alert';



function ViewImage() {
  const {photoId} = useParams()
  const [photoData, setPhotoData] = useState([])
  const [userData, setUserData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [contentComment, setcontentComment] = useState('')
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

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
        const dataImageUrl = response.data.map((item) => ({
          ...item,
          src: `http://localhost:3001/${item.fileLocation[0].src}`,
          userId: item.userId
        }));

        setPhotoData(dataImageUrl);
        fetchUser(dataImageUrl[0].userId); 
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
   
    useEffect(() => {  
      fetchComment()
      fetchImage(photoId);
    }, [photoId]);
    
    const handleSendComment =(e)=>{
      e.preventDefault()
      axios.post(`${url_develope}/comment/createComment`,{
        contentComment: contentComment,
        photoId: photoId,
        userId: userID,
      })
      .then(response =>{
      fetchComment()
    })
    .catch(error =>{
      console.error(error)
    })
    setcontentComment('')

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
    
  return (
    <div className="container mx-auto px-4 py-8">
    <a href='/' className="block mb-4 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(13,169,242,1)">
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
      </svg>
    </a>
    <div className="max-w-5xl mx-auto m-3">
      {photoData.map((item, index) => (
        <div key={index} className="bg-slate-300 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 m-7 ">
            <img src={item.src} alt="Gambar" className="w-full h-auto rounded-xl" />
          </div>
          <div className="md:w-1/2">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.photoTittle}</h2>
              <p className="text-gray-700 ">{item.description}</p>
              <p className="text-gray-400 mb-4">{new Date(item.uploadDate).toLocaleDateString('id-ID')}</p>
              
              <div className="text-gray-700 flex justify-between items-center mb-4">
              <p className="mr-2">Author: {userData.username}</p>
              <i className="ri-heart-fill text-red-600 text-xl"></i>
            </div>

              <hr/>
            </div>
            {/* Comment section */}
            {commentData.map((item, index) =>(
              <div key={index} className="rounded-lg p-4 relative">
              <div className="flex items-start">
                <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
                <div className="flex flex-col">
                  <span className="font-bold">{item.userName}</span>
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
               <div className="flex items-center px-3 py-2 rounded-lg ">
              <textarea 
              disabled={!userID}
              id="chat" 
              rows="1" 
              onChange={(e)=> setcontentComment(e.target.value)}
              className="block mx-4 p-2.5 w-full text-sm text-grray bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Your message...">
              </textarea>
              <button  type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default ViewImage;