import React from "react";
import { AiOutlineInteraction } from "react-icons/ai";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { TbSocial } from "react-icons/tb";
import { Link } from "react-router-dom";
import RegisterForm from "../components/form/RegisterForm";
import {BgImage} from "../assets/index";

const Signup = () => {
  
  return (
    <>
      <div className="bg-richblack-50 w-full h-[100vh] flex items-center justify-center p-6">
        <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl bg-white">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center ">
            <div className="w-full flex gap-2 items-center mb-6">
              <div className="p-2 bg-[#065ad8] rounded text-white">
                <TbSocial />
              </div>
              <span className="text-2xl text-[#065ad8] " font-semibold>
                ShareFun
              </span>
            </div>

            <p className="text-ascent-1 text-base font-semibold">
              Create your account
            </p>

            <RegisterForm />

            <p className="text-ascent-2 text-sm text-center">
              Already has an account?{" "}
              <Link
                to="/login"
                className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
          {/* RIGHT */}
          <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-richblue-400">
            <div className="relative w-full flex items-center justify-center">
              <img
                src={BgImage}
                alt="Bg Image"
                className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
              />

              <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
                <BsShare size={14} />
                <span className="text-xs font-medium">Share</span>
              </div>

              <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
                <ImConnection />
                <span className="text-xs font-medium">Connect</span>
              </div>

              <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
                <AiOutlineInteraction />
                <span className="text-xs font-medium">Interact</span>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-white text-base">
                Connect with friedns & have share for fun
              </p>
              <span className="text-sm text-white/80">
                Share memories with friends and the world.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
