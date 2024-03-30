import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import Loading from "./common/Loading";
import CustomButton from "./common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { NoProfile } from "../assets/index";
import toast from "react-hot-toast";
import { editPost } from "../services/operations/postAPI";

const EditPost = ({ post, setEditingPost, setOpenDelete }) => {
  const { user } = useSelector((state) => state.user);
  const [posting, setPosting] = useState(false);
  const [description, setDescription] = useState(post.description || "");
  const [image, setImage] = useState(post?.image || "");
  const [previewSource, setPreviewSource] = useState(post?.image || "");

  // console.log("edit post",post);
  const [video, setVideo] = useState(null);
  const dispatch = useDispatch();

  // const inputfileRef = useRef(null);
  function handleClose() {
    setEditingPost(false);
  }

  const handleTitleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageDrop = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      setImage(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleVideoDrop = (acceptedFiles) => {
    setVideo(acceptedFiles[0]);
    console.log(video);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);
    if (!description) {
      toast.error("Please enter a description for your post.");
      return;
    }
    const postData = new FormData();
    postData.append("description", description);
    if (image) postData.append("image", image);
    // if (video) postData.append("video", video);

    console.log("postdata", postData);

    dispatch(editPost(post._id, postData, user.token));
    setPosting(false);
    setOpenDelete(false);
    setEditingPost(false);
  };

  return (
    <>
      <div className="  fixed top-0 left-0 flex justify-center items-center w-full h-screen z-50  bg-black bg-opacity-50 ">
        <div className="w-11/12 mx-auto lg:w-1/2 flex  justify-center items-center rounded-lg bg-white shadow-xl text-black px-5 py-5">
          <div className=" w-full px-3 md:px-5">
            <div className=" flex justify-between border-b border-b-pure-greys-100 pb-2">
              <div className=" ">Edit Your Post</div>
              <div className=" cursor-pointer" onClick={handleClose}>
                close
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-primary px-4 rounded-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User "
                  className="w-14 h-14 rounded-full object-cover"
                />

                <input
                  placeholder="What's on your mind...."
                  className="w-full rounded-full  bg-secondary  border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666]"
                  type="text"
                  id="description"
                  value={description}
                  onChange={handleTitleChange}
                />
              </div>

              {previewSource && (
                <div>
                  <img
                    src={previewSource}
                    alt={`profile-${user?.username}`}
                    className=" w-full mt-2 rounded-lg "
                  />
                </div>
              )}

              <div className="flex items-center justify-between py-4 ">
                <label
                  htmlFor="image"
                  className="dropzone flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 text-blue-500  cursor-pointer"
                >
                  <input
                    id="image"
                    type="file"
                    onChange={handleImageDrop}
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>
                {/*  for video */}
                <Dropzone onDrop={handleVideoDrop} accept="video/*">
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="dropzone flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 text-blue-500  cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <BiSolidVideo />
                      <span>Video</span>
                    </div>
                  )}
                </Dropzone>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
