import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url_develope } from '../../const'
import { jwtDecode } from 'jwt-decode'

function Upload() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [uploadDate, setUploadDate] = useState('')
    const [fileLocation, setFileLocation] = useState(null)
    const [notif, setNotif] = useState('')
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



    const handleUpload = async(e)=>{
        e.preventDefault();

        const data = new FormData();
        data.append('photoTitle', title)
        data.append('description', description)
        data.append('uploadData', uploadDate)
        data.append('fileLocation', fileLocation)
        data.append('userId', userID)

        try{
            const response = await axios.post(`${url_develope}/upload/addPhoto`, data,{
                headers:{
                    'Content-Type':  'multipart/form-data',
                }
            });
            setNotif('upload successfully')
            setTimeout(() => {
                setNotif(null);
              }, 3000);
              navigate('/')
        }catch (error) {
            console.error('Error uploading photo:', error);
            setNotif('Upload failed. Please try again.'); 
          }
        };

  return (

    <div>
         <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
            {notif && (
                <div role="alert" className="alert alert-success mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{notif}</span>
                </div>
              )}
            <div className="form-control">
                <label className="label">
                <span className="label-text">Title</span>
                </label>
                <input 
                type="text"  
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                className="input input-bordered" 
                required />
            </div>

            <div className="form-control">
                <label className="label">
                <span className="label-text">description</span>
                </label>
                <input
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="input input-bordered" 
                required />
            </div>
            
            <div className='form-control'>
            <label htmlFor="">
            <span className="label-text">Choose file</span>
            </label>
            <input 
            type="file" 
            onChange={(e) => setFileLocation(e.target.files[0])}
            className="file-input file-input-bordered file-input-info w-full max-w-xs" 
            />
            </div>


            <div className="form-control">
                <label className="label">
                <span className="label-text">Date</span>
                </label>
                <input
                type="date" 
                value={uploadDate}
                onChange={(e) => setUploadDate(e.target.value)}
                id="uploadDate"
                className="input input-bordered" 
                required />
            </div>

            <div className="form-control mt-6">
                <button onClick={handleUpload} className="btn btn-primary">Upload</button>
            </div>

            </form>
            </div>
    </div>
  )
}

export default Upload