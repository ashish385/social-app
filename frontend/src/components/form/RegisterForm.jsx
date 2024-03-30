import React, { useState } from "react";
import Loading from "../common/Loading";
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const account_type = "User";

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const signupData = { ...data, account_type };

    dispatch(signup(signupData, setErrMsg, setIsSubmitting, navigate));
  };

  return (
    <>
      <form
        className="py-8 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
          <TextInput
            name="username"
            label="Username"
            placeholder="Usernmae"
            type="text"
            styles="w-full"
            register={register("username", {
              required: "Username is required!",
            })}
            error={errors.username ? errors.username?.message : ""}
          />
        </div>

        <TextInput
          name="email"
          placeholder="email@example.com"
          label="Email Address"
          type="email"
          register={register("email", {
            required: "Email Address is required",
          })}
          styles="w-full"
          error={errors.email ? errors.email.message : ""}
        />

        <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            styles="w-full"
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password?.message : ""}
          />

          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            styles="w-full"
            register={register("confirmPassword", {
              validate: (value) => {
                const { password } = getValues();

                if (password !== value) {
                  return "Passwords do no match";
                }
              },
            })}
            error={
              errors.confirmPassword &&
              errors.confirmPassword.type === "validate"
                ? errors.confirmPassword?.message
                : ""
            }
          />
        </div>

        {errMsg?.message && (
          <span
            className={`text-sm ${
              errMsg?.status === false
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
            title="Create Account"
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </form>
    </>
  );
};

export default RegisterForm;
