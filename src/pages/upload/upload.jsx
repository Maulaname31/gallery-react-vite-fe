import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url_develope } from '../../const';
import { jwtDecode } from 'jwt-decode';


function Upload() {
    const [data, setData] = useState([]);
    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [uploadDate, setUploadDate] = useState('');
    const [fileLocation, setFileLocation] = useState({
      src:'',
      width:'',
      height:''
    });
    const [c, setC] = useState("");
    const [categories, setCategories] = useState({
        categoryId:'',
        nameCategory:''
    })
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [notif, setNotif] = useState('');
    const [previewUrl, setPreviewUrl] = useState('')
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const getUserId = () => {
      if (token) {
        const decode = jwtDecode(token);
        return decode.userId;
      }
      return null;
    };
    const userID = getUserId();

      
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file instanceof Blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewUrl(event.target.result);
            };
            setFileLocation(file)
            reader.readAsDataURL(file);
        } else {
            console.error("Invalid file format");
        }
    }

    const handleUpload = async(e) => {
        e.preventDefault();

        const data = new FormData();    
        data.append('photoTittle', tittle);
        data.append('description', description);
        data.append('uploadData', uploadDate);
        data.append('src', fileLocation);
        data.append('userId', userID);
        data.append('selectedCategories', JSON.stringify(selectedCategories));

        try {
            const response = await axios.post(`${url_develope}/upload/addPhoto`, data, {
                headers:{
                    'Content-Type':  'multipart/form-data',
                }
            });
            setNotif('upload successfully');
            setTimeout(() => {
                setNotif(null);
            }, 3000);
            navigate('/');
        } catch (error) {
            console.error('Error uploading photo:', error);
            setNotif('Upload failed. Please try again.'); 
        }
    };

    useEffect(() => {
        axios.get(`${url_develope}/category/`)
            .then(response => {

                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    // console.log(selectedCategories)

    return (
        <div className="flex justify-center items-center h-auto">
            <div className="card flex flex-col justify-center items-center  max-w-7xl shadow-2xl bg-base-100">
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
                            <span className="label-text">Tittle</span>
                        </label>
                        <input 
                            type="text"  
                            value={tittle}
                            onChange={(e) => setTittle(e.target.value)}
                            id="title"
                            className="input input-bordered" 
                            required 
                        />
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
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className='label'>Photo</label>
                        <div className="max-w-sm p-6 mb-4 bg-slate-200 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                            <input
                                id="upload"
                                type="file"
                                className='opacity-0'
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {!previewUrl ? (
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                    <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-gray-600">2mb</b></p>
                                    <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                                    <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                </div>
                                ) : (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full max-h-72 mx-auto"
                                />
                                )}
                        </div>
                    </div>

                     <div>
                        <select value={c} onChange={(e) => {
                            const selected = e.currentTarget.value;
                            if (selected.length > 0 && !selectedCategories.find(v => v.categoryId == selected)){
                                setSelectedCategories([...selectedCategories, data.find(v => v.categoryId == selected)]);
                                setC("");
                            } 
                          }} className="select select-bordered select-xs w-full max-w-xs">
                            <option disabled value=''>Select Category</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.categoryId}>{item.nameCategory}</option>
                            ))}
                        </select>
                        <span>{selectedCategories.map(v => v.nameCategory).join(", ")}</span>
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
                            required 
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button onClick={handleUpload} className="btn btn-primary">Upload</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Upload;
