import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiComment } from "react-icons/bi";
import Comments from "./Comments";
import { PostContext } from "../context/MyContext";
import Like from "./Like";
import { useDispatch } from "react-redux";
import { deletePost, postComments } from "../services/operations/postAPI";
import ConfirmationModal from "./form/ConfirmationModal";
import EditPost from "./EditPost";

const PostCard = ({ post, user }) => {
  const [comments, setComments] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingPost, setEditingPost] = useState(false);
  const { showAll, setShowAll, showComments, setShowComments } =
    useContext(PostContext);
  // console.log("post",post);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // console.log("delete post", post._id);
    dispatch(deletePost(post._id, user.token));
  };

  useEffect(() => {
    dispatch(postComments(post?._id, user?.token, setComments));
  }, [dispatch, post?._id, comments]);

  // console.log("comments", comments);

  return (
    <>
      <div className="mb-2 bg-primary p-4 rounded-xl bg-white ">
        <div className="flex gap-3 items-center mb-2 border-b border-pure-greys-50 pb-1">
          <Link
            to={"/profile/" + post?.userId?._id}
            className="w-14 h-14 rounded-full object-cover "
          >
            <img
              src={post?.userId?.profileUrl ?? NoProfile}
              alt={post?.userId?.firstName}
              className="w-13 h-13 aspect-square object-cover rounded-full"
            />
          </Link>
          <div className="w-full flex justify-between">
            <div className="">
              <Link to={"/profile/" + post?.userId?._id}>
                <p className="font-medium text-lg text-ascent-1 capitalize">
                  {post?.userId?.username}
                  {post?.userId?.lastName}
                </p>
              </Link>
              <span className="text-ascent-2">{post?.userId?.location}</span>
            </div>
            <span className="text-ascent-2 flex gap-2 relative">
              <span>{moment(post?.createdAt ?? "2023-05-25").fromNow()}</span>
              {/* delete post */}
              {user?.id === post?.userId?._id && (
                <span
                  onClick={() => setOpenDelete(!openDelete)}
                  className=" cursor-pointer rotate-90 text-xl font-bold"
                >
                  ...
                </span>
              )}

              {openDelete && (
                <div className=" absolute top-6 right-2 w-[100px] bg-pink-5 z-20 shadow-md rounded-md px-2 py-2">
                  <div
                    onClick={() => {
                      setOpenModal(true);
                      setOpenDelete(false);
                    }}
                    className=" cursor-pointer"
                  >
                    Delete Post
                  </div>
                  <div
                    className=" cursor-pointer"
                    onClick={() => setEditingPost(!editingPost)}
                  >
                    Edit Post
                  </div>
                  {editingPost && (
                    <EditPost
                      post={post}
                      setEditingPost={setEditingPost}
                      setOpenDelete={setOpenDelete}
                    />
                  )}
                </div>
              )}
            </span>
          </div>
        </div>

        {/* image */}
        <div>
          <p className="text-ascent-2">
            {showAll === post?._id
              ? post?.description
              : post?.description.slice(0, 300)}
            {/* or */}
            {post?.description?.length > 301 &&
              (showAll === post?._id ? (
                <span
                  className="text-blue ml-2 font-mediu cursor-pointer"
                  onClick={() => setShowAll(0)}
                >
                  Show Less
                </span>
              ) : (
                <span
                  className="text-blue ml-2 font-medium cursor-pointer"
                  onClick={() => setShowAll(post?._id)}
                >
                  Show More
                </span>
              ))}
          </p>

          {post?.image && (
            <img
              src={post?.image}
              alt="post"
              className="w-full mt-2 rounded-lg"
            />
          )}
        </div>

        {/* like share comment */}
        <div
          className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]"
        >
          {/* Like */}
          <Like post={post} user={user} />

          {/* comment */}
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              setShowComments(showComments === post._id ? null : post._id);
              // getComments(post?._id);
            }}
          >
            <BiComment size={20} />
            {post?.comments?.length} Comments
          </p>
        </div>
        <Comments comments={comments} post={post} user={user} />
      </div>

      {/* confirmation modal */}
      {openModal && (
        <ConfirmationModal
          title={"Are you sure want to delete your Post?"}
          setOpenModal={setOpenModal}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default PostCard;
