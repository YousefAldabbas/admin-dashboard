import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({role,credentials}) => ({
        url: `/${role}/auth/login`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Admin"],
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/admin/auth/refresh",
        method: "POST",
        body: {
          refreshToken: localStorage.getItem("refresh"),
        },
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;