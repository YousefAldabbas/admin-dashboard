import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setCredentials,
  logOut,
  refreshToken,
} from "../../features/auth/authSlice";

import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/v1/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// const refreshQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:1337",
//   method: "POST",
//   body: {
//     refreshToken: localStorage.getItem("refresh"),
//   },
// });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log(args.body)
  if (result?.error?.status === 409 || result?.error?.status === 401) {
    const config = {
      headers: {
        authentication: `Bearer ${localStorage.getItem("refresh")}`,
      },
    };
    let role = localStorage.getItem("role") || "user"
    const refreshResult = await axios.post(
      `http://127.0.0.1:8000/v1/api/${role}/auth/refresh`,
      config
    );
    if (refreshResult?.data) {
      api.dispatch(refreshToken(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut);
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // tagTypes: ["User", "Data", "Todos"],
  endpoints: (builder) => ({}),
});