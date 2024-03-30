import React from "react";
import Navbar from "../components/common/Navbar";
import ProfileCard from "../components/ProfileCard";
import FriendsCards from "../components/FriendsCards";
import CreatePoast from "../components/CreatePost";
import RightSide from "../components/RightSide";
import Feed from "../components/Feed";
import EditProfile from "../components/form/EditProfile";
import { useSelector } from "react-redux";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  return (
    <>
      <div className=" z-30">
        {" "}
        <Navbar />
      </div>
      <div className=" relative w-full">
        <div className="  w-full px-0 lg:px-10  2xl:px-40 bg-bgColor lg:rounded-lg h-[90vh] overflow-hidden relative ">
          <div className="w-full flex mb-10  h-full">
            {/* Left -> profile and friends */}
            <div className="hidden w-1/3 pt-4 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto feed-scrollbar">
              <ProfileCard user={user} />
              <FriendsCards />
            </div>
            {/* center */}
            <div className="flex-1 h-full p-4 flex flex-col gap-6 overflow-y-auto bg-richblack-50   feed-scrollbar ">
              <CreatePoast />
              <Feed />
            </div>
            {/* right */}
            <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 feed-scrollbar  mt-5">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </>
  );
};

export default Home;
