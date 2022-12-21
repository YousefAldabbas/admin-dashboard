import { apiSlice } from "../../app/api/apiSlice";

export const managerApiSlice = apiSlice.injectEndpoints({
  providesTags: ["Manager", "Manager_Clinic"],
  endpoints: (builder) => ({
    getManagerClinicInfo: builder.query({
      query: () => ({
        url: "/user/manager/clinic",
        method: "GET",
      }),
      invalidatesTags: ["Manager_Clinic"],
      providesTags: ["Manager_Clinic"],
    }),
    updateManagerClinicInfo: builder.mutation({
      query: (body) => ({
        url: "/user/manager/clinic",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Manager_Clinic"],
      providesTags: ["Manager_Clinic"],
    }),
    addDoctor: builder.mutation({
      query: (body) => ({
        url: "/user/manager/clinic/doctor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Manager_Clinic"],
      providesTags: ["Manager_Clinic"],
    }),
    updateDoctor: builder.mutation({
      query: (body) => ({
        url: "/user/manager/clinic/doctor",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Manager_Clinic"],
      providesTags: ["Manager_Clinic"],
    }),
    deleteDoctor: builder.mutation({
      query: (body) => ({
        url: "/user/manager/clinic/doctor",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Manager_Clinic"],
      providesTags: ["Manager_Clinic"],
    }),
    getManagerHealthInfo: builder.query({
      query: () => ({
        url: "/user/information",
        method: "GET",
      }),
      invalidatesTags: ["User_Health"],
      providesTags: ["User_Health"],
    }),
  }),
});

export const {
  useGetManagerClinicInfoQuery,
  useUpdateManagerClinicInfoMutation,
  useAddDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation,
  useGetManagerHealthInfoQuery,
} = apiSlice;
