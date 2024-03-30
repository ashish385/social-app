import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../redux/authSlice";
import { Logout, UserLogin } from "../../redux/userSlice";

const { SIGNUP_API, LOGIN_API, FORGOTPASSWORD_API, RESETPASSWORD_API } =
  endpoints;

export function signup(signupData, setErrMsg, setIsSubmitting, navigate) {
  return async (dispatch) => {
    // dispatch(setIsSubmitting(true));
    const toastId = toast.loading("Loading...");
    setIsSubmitting(true);
    try {
      const response = await apiConnector("POST", SIGNUP_API, signupData);
      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        throw new Error(response.data.message);
      }
      navigate("/login");
      toast.success("Signup Successful");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error.response.data);
      toast.error(error.response.data.message || "Something went wrong!");
    }
    // dispatch(setIsSubmitting(false));
    setIsSubmitting(false);
    toast.dismiss(toastId);
  };
}

export function login(data, setErrMsg, setIsSubmitting, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    setIsSubmitting(true);
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, data);

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      console.log(response.data);
      dispatch(UserLogin(response.data?.user));
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    setIsSubmitting(false);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    // dispatch(setUser(null));
    dispatch(Logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
  };
}

export function forgotPassword(
  email,
  setErrMsg,
  setIsSubmitting,
  navigate,
  setIsUser
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading..");
    setIsSubmitting(true);
    try {
      const response = await apiConnector("POST", FORGOTPASSWORD_API, email);
      console.log("FORGOTPASSWORD API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        throw new Error(response.data.message);
      }
      setIsUser(true);
    } catch (error) {
      console.log("FORGOTPASSWORD API ERROR............", error.response.data);
      toast.error(error.response.data.message || "Something went wrong!");
    }

    toast.dismiss(toastId);
    setIsSubmitting(false);
  };
}

export function resetPassword(resetdata, setIsSubmitting, navigate) {
  return async (dispatch) => {
    // dispatch(setIsSubmitting(true));
    const toastId = toast.loading("Loading...");
    setIsSubmitting(true);
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, resetdata);
      console.log("RESETPASSWORD_API API RESPONSE............", response);

      if (!response.data.success) {
        // setErrMsg(response.data);
        toast.error("Error in password update.");
      }
      navigate("/login");
      toast.dismiss(toastId);
      toast.success("Password upadate Successful");
    } catch (error) {
      console.log("RESETPASSWORD_API API ERROR............", error);
      toast.error("Something went wrong!");
    }
    // dispatch(setIsSubmitting(false));
    setTimeout(() => {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }, 5000);
  };
}
