import React, { useState, useEffect } from 'react';

function UpdateAlbum({ handleModalEditClose, editData, handleEdit }) {
    const [editedData, setEditedData] = useState({ ...editData });
    const [image, setImage] = useState(null);

    useEffect(() => {
        setEditedData(editData);
    }, [editData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file instanceof Blob) {
                const reader = new FileReader();
                setImage([file]); 
                reader.readAsDataURL(file);
            } else {
                console.error("Invalid file format");
            }
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('albumName', editedData.albumName);
            formData.append('description', editedData.description);
            if (image) {
                formData.append('coverPhoto', image[0]);
            }
            await handleEdit(formData, editData.albumId);
            handleModalEditClose();
        } catch (error) {
            console.error('Error editing album:', error);
        }
    };

    return (
        <div className='flex justify-center mb-5'>
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalEditClose}>✕</button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg mb-3">Edit Album</h3>
                        <div className='flex justify-center my-5'>
                            <input
                                type="text"
                                name="albumName"
                                value={editedData.albumName || ''}
                                onChange={handleInputChange}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                        </div>

                        <div className='flex justify-center'>
                            <textarea
                                type="text"
                                name="description"
                                value={editedData.description || ''}
                                onChange={handleInputChange}
                                className="input input-bordered input-info w-full max-w-xs"
                            />
                        </div>
                        
                        <div className='flex justify-center'>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                         
                            />
                        </div>

                        <div className='flex justify-end m-4'>
                            <button className="btn btn-primary" type='submit'>Update</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default UpdateAlbum;
