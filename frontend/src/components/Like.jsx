import React, { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { likePost } from "../services/operations/postAPI";

const Like = ({ post, user }) => {
    const dispatch = useDispatch();
  const [singlepost, setSinglepost] = useState(post)
  // console.log("userid",user);

  

  const handleLike = () => {
      console.log("postid",  post?._id,user.token);
      dispatch(likePost(post?._id, user.token, setSinglepost));
  };
  return (
    <>
      <p
        className="flex gap-2 items-center text-base cursor-pointer"
        onClick={handleLike}
      >
        {singlepost?.likes?.includes(user?.id) ? (
          <BiSolidLike size={20} color="blue" />
        ) : (
          <BiLike size={20} />
        )}
        {singlepost?.likes?.length} Likes
      </p>
    </>
  );
};

export default Like;
