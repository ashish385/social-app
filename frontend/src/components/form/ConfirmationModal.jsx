import React from "react";

const ConfirmationModal = ({ title, setOpenModal, handleSubmit }) => {
  function handleClose() {
    setOpenModal(false);
    }
    
    function  onConfirm(){
        handleSubmit();
        handleClose();
    }
  return (
    <div className="  fixed top-0 left-0 flex justify-center items-center w-full h-screen z-50  bg-black bg-opacity-50 ">
      <div className="w-11/12 mx-auto lg:w-1/2 flex  justify-center items-center rounded-lg bg-white shadow-xl text-black px-5 py-5">
        <div className=" w-full px-3 md:px-5">
          <div className=" flex justify-between border-b border-b-pure-greys-100 pb-2">
            <div className=" "></div>
            <div className=" cursor-pointer" onClick={handleClose}>
              close
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center w-full">
            <h1 className=" text-xl py-3 text-pink-500">
              {/* Are you sure want to delete your Post? */}
              {title}
            </h1>
            <div className=" w-full flex justify-end gap-5 py-4 ">
              <button
                onClick={handleClose}
                className=" border rounded-md px-3 py-1 bg-pink-400 hover:bg-pink-600 text-white"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="border rounded-md px-3 py-1 bg-richblue-400 hover:bg-richblue-500  text-white"
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
