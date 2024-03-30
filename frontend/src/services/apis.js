const BASE_URL = "http://localhost:8800/api";

// AUTH ENDPOINTS
export const endpoints = {
  //   SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
  FORGOTPASSWORD_API: BASE_URL + "/auth/forgot-password",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// POST ENDPOINTS
export const postRequests = {
  CREATEPOST_API: BASE_URL + "/post/create-post",
  EDITPOST_API:BASE_URL + "/post/edit-post/",
  DELETEPOST_API: BASE_URL + "/post/delete/",
  GETALLPOST_API: BASE_URL + "/post/get-all-post",
  POSTLIKE_API: BASE_URL + "/post/like/",
  ALLCOMMENTS_API: BASE_URL + "/post/comments/",
  POSTCOMMENTS_API: BASE_URL + "/post/comments/",
};
