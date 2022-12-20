import { apiSlice } from "../../app/api/apiSlice";

export const managerApiSlice = apiSlice.injectEndpoints({
  providesTags: ["Manager"],
  endpoints: (builder) => ({
    getManagers: builder.query({
      query: () => ({
        url: "/admin/managers/",
        method: "GET",
      }),
      invalidatesTags: ["Manager"],
      providesTags: ["Manager"],
    }),
    addManager: builder.mutation({
      query: (body) => ({
        url: "/admin/managers/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Manager"],
      providesTags: ["Manager"],
    }),
    UpdateManager: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/managers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Manager"],
      providesTags: ["Manager"],
    }),
    DeleteManager: builder.mutation({
      query: (id) => ({
        url: `/admin/managers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Manager"],
      providesTags: ["Manager"],
    }),
  }),
});

export const { useGetManagersQuery, useAddManagerMutation } = managerApiSlice;
