// import { refreshAccessToken } from "@/hooks/useSignIn";
import { API_METHOD } from "@/constants/apiType";
import axios from "axios";
import { toast } from "sonner";

export const Base_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://[::1]:9000/api/v1/";

export default async function APICall(
  Url: string,
  Method: keyof typeof API_METHOD,
  Data?: any,
  isFormData = false,
  timeoutOverride?: number | null,
  silent?: boolean
) {
  const authToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  axios.defaults.headers.common["Content-Type"] = isFormData
    ? "multipart/form-data"
    : `application/json`;
  axios.defaults.headers.common["cor"] = "no-cors";
  // }

  axios.interceptors.response.use(
    (response) => {
      if (response?.data?.authorization) {
        localStorage.setItem("accessToken", response.data.authorization);
      }
      return response;
    },
    (error) => {
      console.log(error, "THE ERROR");
      return error.response;
    }
  );

  let baseUrl = Base_URL;
  if (!baseUrl.endsWith("/")) {
    baseUrl = baseUrl + "/";
  }

  if (Url.startsWith("/")) {
    Url = Url.substring(1);
  }

  const response = await axios({
    method: Method,
    url: baseUrl + Url,
    data: Data,
    // timeout: timeoutOverride || process.env.REACT_APP_REQUEST_TIMEOUT,
  });

  if (response) {
    if (!response.status) {
      if (!silent)
        toast.error("Please check your network connection and try again");
      return null;
    }

    if (response.status >= 400 && response.status < 500) {
      if (response.status === 401) {
        // localStorage.clear();
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          // TODO: THIS WILL BE IMPLEMENTED LATER
          // const res = await refreshAccessToken();
          // if (res) {
          //   window.location.reload();
          // }
        }
        //IMPLEMENT REFRESH TOKEN LOGIC HERE
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/settings"
        ) {
          return (window.location.href = "/login");
        }
      }
      toast.error(
        response?.data?.message ||
          response?.data?.responseMessage ||
          response?.data
      );
      return null;
    }

    if (response.status >= 500) {
      let message =
        "Sorry your request cannot be processed at this moment please try again later";
      if (response.data.message) {
        message = `${response.data.message}`;
      }
      if (!silent) toast.error(message);
      return null;
    }
    //
  } else {
    toast.error("Server error, please try again");
  }

  return !response
    ? null
    : response.data
    ? response.data
    : { status: "success" };
}
