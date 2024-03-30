import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";
import { posts } from "../assets/data";
import Navbar from "../components/common/Navbar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCards";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setUserInfo(user);
    setLoading(false)
  };
  const handleLikePost = () => {};

  return (
    <>
      <Navbar />
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden bg-richblack-50 ">
        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 h-full   ">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto feed-scrollbar bg-white rounded-lg">
            <ProfileCard user={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          {/* CENTER */}
          <div className=" flex-1 h-full bg-orimary px-4 flex flex-col gap-6 overflow-y-auto feed-scrollbar  rounded-lg">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto feed-scrollbar bg-white rounded-lg">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
