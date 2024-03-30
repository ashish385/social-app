import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../common/TextInput";
import Loading from "../common/Loading";
import CustomButton from "../common/CustomButton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/authAPI";

const LoginForm = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form validation using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const loginData = {...data};
    // console.log("log data", loginData);
     dispatch(
      login(loginData, setErrMsg, setIsSubmitting, navigate)
    );
  };

  return (
    <>
      <form
        className="py-8 flex flex-col gap-5="
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          name="email"
          placeholder="email@example.com"
          label="Email Address"
          type="email"
          register={register("email", {
            required: "Email Address is required",
          })}
          styles="w-full rounded-full"
          labelStyle="ml-2"
          error={errors.email ? errors.email.message : ""}
        />

        <TextInput
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          styles="w-full rounded-full"
          labelStyle="ml-2"
          register={register("password", {
            required: "Password is required!",
          })}
          error={errors.password ? errors.password?.message : ""}
        />

        <Link
          to="/reset-password"
          className="text-sm text-right text-blue font-semibold"
        >
          Forgot Password ?
        </Link>

        {errMsg?.message && (
          <span
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
            containerStyles={`inline-flex justify-center rounded-md bg-richblue-400  px-8 py-3 text-sm font-medium text-white outline-none`}
            title="Login"
          />
        )}
      </form>
    </>
  );
};

export default LoginForm;
