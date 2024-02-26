import React, { useState, useEffect } from 'react';

function UpdateCategory({ handleModalEditClose, editData, handleEdit }) {
    const [editedData, setEditedData] = useState({ ...editData });


    useEffect(() => {
        setEditedData(editData);
    }, [editData]);
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedData({ ...editedData, [name] : value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await handleEdit(e, editedData, editData.categoryId);
              
                handleModalEditClose(); 
  

        } catch (error) {
            console.error('Error editing guest:', error);
        }
    };
        

    return (
        <div className='flex justify-center mb-5'>
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalEditClose}>✕</button>
                    <form method="dialog" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg mb-3">Edit Category</h3>
                        <div className='flex justify-center gap-4'>
                            <input
                                type="text"
                                name="nameCategory" 
                                value={editedData.nameCategory || ''}
                                onChange={handleInputChange}
                                className="input input-bordered input-info w-full max-w-xs"
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

export default UpdateCategory;
