import React, { useContext } from "react";
import { PostContext } from "../context/MyContext";
import { Link } from "react-router-dom";
import CustomButton from "./common/CustomButton";
import { BsPersonFillAdd } from "react-icons/bs";

const RightSide = () => {
  const { friendRequest, NoProfile, suggestedFriends } =
    useContext(PostContext);
  return (
    <>
      <div className=" w-full h-full lg:flex flex-col gap-8 overflow-y-auto feed-scrollbar ">
        {/* FRIEND REQUEST */}
        <div className="  w-full bg-primary shadow-sm rounded-lg px-6 py-5">
          <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
            <span> Friend Request</span>
            <span>{friendRequest?.length}</span>
          </div>

          <div className="w-full flex flex-col gap-4 pt-4">
            {friendRequest?.map(({ _id, requestFrom: from }) => (
              <div key={_id} className="flex items-center justify-between">
                <Link
                  to={"/profile/" + from._id}
                  className="w-full flex gap-4 items-center cursor-pointer"
                >
                  <img
                    src={from?.profileUrl ?? NoProfile}
                    alt={from?.firstName}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-base font-medium text-ascent-1">
                      {from?.firstName} {from?.lastName}
                    </p>
                    <span className="text-sm text-ascent-2">
                      {from?.profession ?? "No Profession"}
                    </span>
                  </div>
                </Link>

                <div className="flex gap-1 ">
                  <CustomButton
                    title="Accept"
                    containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1  rounded-full"
                  />
                  <CustomButton
                    title="Deny"
                    containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* SUGGESTED FRIENDS */}
        <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
          <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
            <span>Friend Suggestion</span>
          </div>
          <div className="w-full flex flex-col gap-4 pt-4">
            {suggestedFriends?.map((friend) => (
              <div
                className="flex items-center justify-between"
                key={friend._id}
              >
                <Link
                  to={"/profile/" + friend?._id}
                  key={friend?._id}
                  className="w-full flex gap-4 items-center cursor-pointer"
                >
                  <img
                    src={friend?.profileUrl ?? NoProfile}
                    alt={friend?.firstName}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div className="flex-1 ">
                    <p className="text-base font-medium text-ascent-1">
                      {friend?.firstName} {friend?.lastName}
                    </p>
                    <span className="text-sm text-ascent-2">
                      {friend?.profession ?? "No Profession"}
                    </span>
                  </div>
                </Link>

                <div className="flex gap-1">
                  <button
                    className="bg-[#0444a430] text-sm text-white p-1 rounded"
                    onClick={() => {}}
                  >
                    <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
