import React, { useState, useEffect } from 'react';

function EditComment({ handleModalEditClose, editComment, handleEdit }) {
    const [editedData, setEditedData] = useState({ ...editComment });


    useEffect(() => {
        setEditedData(editComment);
    }, [editComment]);
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedData({ ...editedData, [name] : value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await handleEdit(e, editedData, editComment.commentId);
              
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
                        <h3 className="font-bold text-lg mb-3">Edit Comment</h3>
                        <div className='flex justify-center gap-4'>
                            <input
                                type="text"
                                name="contentComment" 
                                value={editedData.contentComment || ''}
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

export default EditComment;
