import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../components/common/TextInput";
import Loading from "../components/common/Loading";
import CustomButton from "../components/common/CustomButton";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import ResetPAssword from "./ResetPAssword";

const ForgotPassword = () => {
  const [isUser, setIsUser] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usermail, setUsermail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const checkuser = async (data) => {
    const email = data;
    setUsermail(data.email);
    dispatch(
      forgotPassword(email, setErrMsg, setIsSubmitting, navigate, setIsUser)
    );
    
  };

  return (
    <div className="w-full h-[100vh] bg-bgColor flex items-center justify-center p-6 bg-richblack-50">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg bg-white">
        <p className="text-ascent-1 text-lg font-semibold">Email Address</p>

        <span className="text-sm text-ascent-2">
          Enter email address used during registration
        </span>

        {!isUser && (
          <>
            <form
              onSubmit={handleSubmit(checkuser)}
              className="py-4 flex flex-col gap-5"
            >
              <TextInput
                name="email"
                placeholder="email@example.com"
                type="email"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                styles="w-full rounded-lg"
                labelStyle="ml-2"
                error={errors.email ? errors.email.message : ""}
              />
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              {isSubmitting ? (
                <Loading />
              ) : (
                <CustomButton
                  type="submit"
                  containerStyles={`inline-flex justify-center rounded-md bg-richblue-400 px-8 py-3 text-sm font-medium text-white outline-none`}
                  title="Submit"
                />
              )}
            </form>
          </>
        )}

        {isUser && <>
        <ResetPAssword usermail={usermail} /></>}
      </div>
    </div>
  );
};

export default ForgotPassword;
