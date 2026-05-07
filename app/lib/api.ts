// lib/api.ts

import axios from "axios";

import toast from "react-hot-toast";

export const api = axios.create({
  baseURL:
    "http://localhost:5000/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type":
      "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status =
      error?.response?.status;

    const message =
      error?.response?.data
        ?.message;

    /**
     * 401
     */

    if (status === 401) {
      toast.error(
        "Session expired. Please login again."
      );

      setTimeout(() => {
        window.location.href =
          "/login";
      }, 1500);

      return Promise.reject(error);
    }

    /**
     * 403
     */

    if (status === 403) {
      toast.error(
        message ||
          "Access denied"
      );

      return Promise.reject(error);
    }

    /**
     * 404
     */

    if (status === 404) {
      toast.error(
        message ||
          "Resource not found"
      );

      return Promise.reject(error);
    }

    /**
     * 500
     */

    if (status >= 500) {
      toast.error(
        "Internal server error"
      );

      return Promise.reject(error);
    }

    /**
     * Network Error
     */

    if (!error?.response) {
      toast.error(
        "Unable to connect to server"
      );
    }

    return Promise.reject(error);
  }
);