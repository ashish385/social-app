import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { postRequests } from "../apis";

const {
  CREATEPOST_API,
  GETALLPOST_API,
  POSTLIKE_API,
  POSTCOMMENTS_API,
  ALLCOMMENTS_API,
  DELETEPOST_API,
  EDITPOST_API,
} = postRequests;

// create post
export function createPost(postData, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", CREATEPOST_API, postData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      // console.log("CREATEPOST API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        throw new Error(response.data.message);
      }
      toast.dismiss(toastId);
      toast.success("Post Created Successfully!");
    } catch (error) {
      // console.log("CREATEPOST API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }

    toast.dismiss(toastId);
  };
}

// edit post
export function editPost(postId, postData, token) {
  return async (dispatch) => {
    // let userToken = { token: token };
    try {
      const response = await apiConnector(
        "PUT",
        EDITPOST_API + `${postId}`,
        postData,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("EDITPOST_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (error) {
      // console.log("EDITPOST_API API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }
  };
}

// delete post
export function deletePost(postId, token) {
  return async (dispatch) => {
    let userToken = { token: token };
    try {
      const response = await apiConnector(
        "DELETE",
        DELETEPOST_API + `${postId}`,
        userToken
      );
      console.log("DELETEPOST_API API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(response.data.message);
    } catch (error) {
      // console.log("DELETEPOST_API API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }
  };
}

//  get all post
export function getAllPost(token, setPosts) {
  return async (dispatch) => {
    let dummydata = { token: token };
    let result = [];
    // const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector("POST", GETALLPOST_API, dummydata);

      // console.log("GETALLPOST API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        throw new Error(response.data.message);
      }
      // toast.dismiss(toastId);
      // toast.success("Data Loaded Successfully!");
      // toast.success("Post Created Successfully!");
      result = response.data.data;
      // console.log("result", result);
      setPosts(result);
    } catch (error) {
      // console.log("GETALLPOST API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }

    // toast.dismiss(toastId);
    return result;
  };
}

// like unlike
export function likePost(postID, token, setSinglepost) {
  return async (dispatch) => {
    let userToken = { token: token };
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        POSTLIKE_API + `${postID}`,
        userToken
      );

      // console.log("LIKEPOST API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        throw new Error(response.data.message);
      }

      toast.success(response?.data?.message);
      setSinglepost(response.data.data);
    } catch (error) {
      // console.log("GETALLPOST API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }

    toast.dismiss(toastId);
  };
}

// all  post comments
export function postComments(postID, token, setComments) {
  return async (dispatch) => {
    let userToken = { token: token };
    // const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector(
        "GET",
        ALLCOMMENTS_API + `${postID}`,
        userToken
      );

      // console.log("POSTCOMMENTS API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        // throw new Error(response.data.message);
      }

      // toast.success(response?.data?.message);
      setComments(response?.data?.data);
    } catch (error) {
      // console.log("POSTCOMMENTS API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }

    // toast.dismiss(toastId);
  };
}

//   add comment
export function addComments(postID, commentdata, token, setComments) {
  return async (dispatch) => {
    // let userToken = { token: token };
    const toastId = toast.loading("Loading");
    try {
      const response = await apiConnector(
        "POST",
        POSTCOMMENTS_API + `${postID}`,
        commentdata,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      // console.log("POSTCOMMENTS API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        throw new Error(response.data.message);
      }

      toast.success(response?.data?.message);
      setComments(response?.data?.data);
    } catch (error) {
      console.log("POSTCOMMENTS API ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong!");
    }

    toast.dismiss(toastId);
  };
}
// export function createPost {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading");
//         try {

//         } catch (error) {

//         }

//         toast.dismiss(toastId);
//     }
// }
