import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { url_develope } from '../../../../const'
import { jwtDecode } from 'jwt-decode'
import { swalSucces } from '../../../../components/alert'


function UpdatePhoto() {
    const {photoId} = useParams()
    const [data, setData] = useState([]);
    const [tittle, setTittle] = useState('');
    const [description, setDescription] = useState('');
    const [fileLocation, setFileLocation] = useState({
      src:'',
      width:'',
      height:''
    });
    const [c, setC] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [notif, setNotif] = useState('');
    const [previewUrl, setPreviewUrl] = useState('')
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const getUserInfo = () => {
        if (token) {
          const decodedToken = jwtDecode(token);
          return {
            userID: decodedToken.userId,
            role: decodedToken.role
          };
        }
        return null;
      };
      const userInfo = getUserInfo();

    useEffect(() => {
        axios.get(`${url_develope}/upload/${photoId}`)
            .then(response => {
                const photoData = response.data;
                setTittle(photoData.photoTittle);
                setDescription(photoData.description);
                setSelectedCategories(photoData.categories);
                if (photoData.fileLocation && photoData.fileLocation.length > 0) {
                    const dataImageUrl = `http://localhost:3001/${photoData.fileLocation[0].src}`

                    setFileLocation({
                        src: photoData.fileLocation[0].src,
                    });
                    setPreviewUrl(dataImageUrl)
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
            

       axios.get(`${url_develope}/category/`)
            .then(response => {
                const dataCategory = response.data
                setData(dataCategory);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [photoId]);
      
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
        data.append('src', fileLocation);
        if (userInfo.role !== 'admin') {
            data.append('userId', userInfo.userID);
        }
        const categoriesData = selectedCategories.map(category => ({
            categoryId: category.categoryId,
            nameCategory: category.nameCategory
        }));
        categoriesData.forEach((category, index) => {
            for (let key in category) {
                data.append(`categories[${index}][${key}]`, category[key]);
            }
        });

        try {
            const response = await axios.put(`${url_develope}/upload/updatePhoto/${photoId}`, data, {
                headers:{
                    'Content-Type':  'multipart/form-data',
                }
            });
            swalSucces('Success',"update Photo successfully", "success")
            navigate('/photo');
        } catch (error) {
            console.error('Error uploading photo:', error);
            setNotif('Upload failed. Please try again.'); 
        }

    };


    const handleCategoryChange = (e) => {
        const selected = e.currentTarget.value;
        console.log(selected)
        if (selected.length > 0 && !selectedCategories.find(v => v.categoryId == selected)) {
            const selectedCategory = data.find(v => v.categoryId == selected);
            setSelectedCategories([...selectedCategories, selectedCategory]);
            setC("");
        }
    };

    const handleCategoryRemoval = (categoryIdToRemove) => {
        setSelectedCategories(selectedCategories.filter(category => category.categoryId !== categoryIdToRemove));
    };

    return (
        <div>
            <a href='/photo' className="block mb-4 text-center text-xl my-5 mx-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(13,169,242,1)">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
            </svg>
            </a>
         <div className="flex justify-center items-center h-auto">
            <div className="card flex flex-col justify-center items-center  max-w-7xl shadow-2xl bg-base-100">
                <form className="card-body">
                    {notif && (
                        <div role="alert" className="alert alert-error mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{notif}</span>
                        </div>
                    )}
                    <div className="flex">
                        <div className="form-control flex-1 mr-2">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input 
                                type="text"  
                                value={tittle || ''}
                                onChange={(e) => setTittle(e.target.value)}
                                id="title"
                                className="input input-bordered" 
                                required 
                            />
                        </div>

                        <div className="form-control flex-1 ml-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input
                                type="text" 
                                value={description|| ''}
                                onChange={(e) => setDescription(e.target.value)}
                                id="description"
                                className="input input-bordered" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center w-full">
                            {!previewUrl ? (
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input 
                            id="dropzone-file" 
                            type="file" 
                            onChange={handleFileChange}
                            className="hidden" />
                        </label>
                                ) : (
                                <img
                                    src={previewUrl || ''}
                                    alt="Preview"
                                    className="max-w-full h-auto max-h-72 object-cover mx-auto"
                                />
                                )}
                    </div>

                     <div>
                        <select value={c} onChange={handleCategoryChange} className="select select-bordered select-xs w-full max-w-xs">
                            <option disabled value=''>Select Category</option>
                            {data.map((item, index) => (
                                <option key={index} value={item.categoryId}>{item.nameCategory}</option>
                            ))}
                        </select>
                      <div className="mt-2">
                        {selectedCategories && selectedCategories.map((category, index) => (
                        <div key={index} className="flex items-center">
                            <span className="mr-2">{category.nameCategory}</span>
                            <i  onClick={() => handleCategoryRemoval(category.categoryId)} className="ri-delete-bin-fill cursor-pointer text-red-600 "></i>
                        </div>
                    ))}
                    </div>
                 </div>

                    <div className="form-control mt-6">
                        <button onClick={handleUpload} className="btn btn-primary">Upload</button>
                    </div>

                </form>
            </div>
        </div>
        </div>
    );
}

export default UpdatePhoto  ;