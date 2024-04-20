import React, { useState } from "react";

// import usePosts from '../hooks/usePosts';

const DeleteButton = ({ postId, deletePost }) => {
  // const { deletePost } = usePosts();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    deletePost(postId);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className=" bg-red-200 px-4 py-2 size-fit mx-auto relative">
      <button 
        onClick={handleDelete} className=''>
          Delete
      </button>
      {showModal && (
        <div className='modal bg-red-400 absolute w-[328px] h-[120px] 
        -top-8 -right-32 mx-auto text-white'>
          <div className='modal-content flex flex-col gap-4 my-6'>
            <p className="text-white mx-auto">
              Are you sure you want to delete this post?
            </p>
            <div className="flex flex-row justify-between mx-4 ">
              <button 
              onClick={handleConfirm}
              className="bg-[cornflowerblue] size-fit py-2 px-4"
              >
                Yes
              </button>
              <button 
              onClick={handleCancel}
              className="bg-[cornflowerblue] size-fit py-2 px-4"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteButton;