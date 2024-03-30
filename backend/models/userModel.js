const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      //   required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      //   required: [true, "Last Name is Required!"],
    },
    username: {
      type: String,
      required: [true, " Username is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    user_posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    location: { type: String },
    profileUrl: { type: String },
    profession: { type: String },
    // friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
    account_type:{type:String,enum:['User','Admin']}
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
