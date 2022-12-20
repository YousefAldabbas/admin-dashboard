import { apiSlice } from "../../app/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  providesTags: ["Dashboard", "Manager", "Instruction"],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      invalidatesTags: ["Dashboard", "Manager", "Instruction"],
      providesTags: ["Dashboard", "Manager", "Instruction"],
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApiSlice;
