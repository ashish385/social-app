import React, { useContext, useState } from "react";
import Loading from "../common/Loading";
import CustomButton from "../common/CustomButton";
import TextInput from "../common/TextInput";
import { useForm } from "react-hook-form";
import { NoProfile } from "../../assets/index";
import { useDispatch } from "react-redux";
import { addComments } from "../../services/operations/postAPI";
import { PostContext } from "../../context/MyContext";

const CommentForm = ({ user, id, replyAt, getComments }) => {
  const [loading, setLoading] = useState(false);

  const {setComments} = useContext(PostContext)

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    let commentdata= {comment:data.comment,from:user.username}
    // console.log("data", commentdata);
    dispatch(addComments(id, commentdata, user.token, setComments));

    reset();
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666645]"
    >
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="User profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
          register={register("comment", {
            required: "Comment can not be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />
      </div>


      <div className="flex items-end justify-end pb-2">
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            title="Submit"
            type="submit"
            containerStyles="bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm"
          />
        )}
      </div>
    </form>
  );
};

export default CommentForm;
