const { compareString, createJWT, hashString } = require("../utils/index");
const Users = require("../models/userModel");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({
      success: false,
    message:"All fieleds required!"});
  // Check for existing user with the same username or email

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      // next("Email Address already exists");

      return res.status(409).json({ success:false, message: "Email address is already in use." });
    }

    const hashedPassword = await hashString(password);

    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
      profileUrl:`https://api.dicebear.com/6.x/initials/svg?seed=${username}`
    });

    res.status(200).json({
      success: true,
      data: { username: user.username, id: user._id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @api {post} /auth/login Login
 * @apiName login
 * @apiGroup Auth
 * @apiDescription Logs in an existing user by providing their credentials. If the user is found and the password matches, a JSON Web Token
 **/

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    // find user by email
    const user = await Users.findOne({ email }).select("+password").populate();
  

    if (!user) {
      // next("Invalid email or password");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

  

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      // next("Invalid email or password");
      return res.status(401).json({ success:false, message: "Invalid email or password" });
    }

    user.password = undefined;

    let datafortoken = {
      id: user?._id,
      username: user?.username,
      email:user?.email
    }

    const token = createJWT(datafortoken);

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const sendingData = {...datafortoken, token : token};

   

    res.cookie("token", token, options).status(201).json({
      success: true,
      message: "Login successfully",
      user: sendingData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(402).json({
        success: false,
        message:"Please provide valid email"
      })

  
    }
    const existUser = await Users.findOne({email}).select("-password");
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }

    res.status(200).json({
      success: true,
      user_email :existUser.email
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(402).json({
        success: false,
        message: "Please provide valid email",
      });
    }
    const existUser = await Users.findOne({ email }).select("-password");
    if (!existUser) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }

     const hashedpassword = await hashString(password);
     //update the new password to database
      const user = await Users.findByIdAndUpdate(
        { _id: existUser._id },
        { password: hashedpassword },
        { new: true }
      );



    res.status(200).json({
      success: true,
      message:"Password update successfully! Please login with your new Password.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};