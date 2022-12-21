import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ role, body }) => ({
        url: `/${role}/auth/login`,
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
