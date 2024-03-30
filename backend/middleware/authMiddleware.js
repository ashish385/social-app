const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization || req.body.token; // get the header if it exists
  // const {token} = req.body;
  // let key =Object.keys(token)[0];
  // console.log("token", authHeader);

  const token = authHeader?.startsWith("Bearer")
    ? authHeader?.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Missing or malformatted authentication token.",
    });
  }

  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

module.exports = userAuth;
