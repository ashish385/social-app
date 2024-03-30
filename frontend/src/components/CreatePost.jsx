import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "./common/CustomButton";
import { NoProfile } from "../assets/index";
import Loading from "./common/Loading";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { createPost } from "../services/operations/postAPI";

const CreatePoast = () => {
  const { user } = useSelector((state) => state.user);

  const [previewSource, setPreviewSource] = useState(null);

  const [posting, setPosting] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleTitleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageDrop = (e) => {
    // setImage(acceptedFiles[0]);
    const file = e.target.files[0];
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
    console.log("video", video);
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

    // console.log(postData, user.token);
    dispatch(createPost(postData, user.token));
    setPosting(false);
    fileInputRef(null);
    setDescription("");
    setImage("");
  };

  return (
    <div className=" bg-white rounded-md">
      <form onSubmit={handleSubmit} className="bg-primary px-4 rounded-lg">
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
              ref={fileInputRef}
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
                <div id>
                  <BiSolidVideo />
                  <span>Video</span>
                </div>
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
  );
};

export default CreatePoast;
