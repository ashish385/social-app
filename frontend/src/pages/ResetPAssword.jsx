import React, { useState } from "react";
import Loading from "../components/common/Loading";
import CustomButton from "../components/common/CustomButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../services/operations/authAPI";
import TextInput from "../components/common/TextInput";

const ResetPAssword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const resetdata = { ...data };
    // setIsSubmitting(true);

    dispatch(resetPassword(resetdata, setIsSubmitting, navigate));
    // setIsSubmitting(false);
  };
  return (
    <>
      <form
        className="py-8 flex flex-col gap-5"
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
          styles="w-full"
          error={errors.email ? errors.email.message : ""}
        />

        <div className="w-full flex flex-col lg:flex-row gap-1 md:gap-2">
          <TextInput
            name="password"
            label="New Password"
            placeholder=" New Password"
            type="password"
            styles="w-full"
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password?.message : ""}
          />

          <TextInput
            label="Confirm New Password"
            placeholder="Confirm New Password"
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

export default ResetPAssword;
