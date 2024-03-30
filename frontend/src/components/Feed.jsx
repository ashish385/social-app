import React, { useContext, useEffect, useState } from "react";
import Loading from "./common/Loading";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../services/operations/postAPI";
import { PostContext } from "../context/MyContext";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const {posts, setPosts} = useContext(PostContext)

  const dispatch = useDispatch();
  // console.log("allposts", allposts);

  // Fetching the data for feed page when first time loading or refreshing
  useEffect(() => {
    setLoading(true);
    dispatch(getAllPost(user.token, setPosts));
    setLoading(false);
  }, [dispatch, user.token, posts,loading]);

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : posts?.length > 0 ? (
        posts?.map((post) => (
          <PostCard
            key={post?._id}
            post={post}
            user={user}
            deletePost={() => {}}
            likePost={() => {}}
          />
        ))
      ) : (
        <>
          <div className="flex w-full h-full items-center justify-center">
            <p className="text-lg text-ascent-2">No Post Available</p>
          </div>
        </>
      )}
    </>
  );
};

export default Feed;
