import { apiSlice } from "../../app/api/apiSlice";

export const managerApiSlice = apiSlice.injectEndpoints({
  providesTags: ["Clinic", "Clinic_Patient"],
  endpoints: (builder) => ({
    findPatient: builder.query({
      query: (id) => ({
        url: `/clinic/patients/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Clinic_Patient"],
      providesTags: ["Clinic_Patient"],
    }),
    addRecord: builder.mutation({
      query: (body) => ({
        url: "/clinic/records/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clinic_Patient"],
      providesTags: ["Clinic_Patient"],
    }),
    updateRecord: builder.mutation({
      query: (body) => ({
        url: "/clinic/records/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Clinic_Patient"],
      providesTags: ["Clinic_Patient"],
    }),
    showRecordHistory: builder.query({
      query: () => ({
        url: "/clinic/records/",
        method: "GET",
      }),
      invalidatesTags: ["Clinic_Patient"],
      providesTags: ["Clinic_Patient"],
    }),
    addMedicine: builder.mutation({
      query: (body) => ({
        url: "/clinic/medicine/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clinic_Patient"],
      providesTags: ["Clinic_Patient"],
    }),
    showMedicineHistory: builder.query({
      query: () => ({
        url: "/clinic/medicine/",
        method: "GET",
      }),
      invalidatesTags: ["Clinic_Patient"],
      providesTags: ["Clinic_Patient"],
    }),
  }),
});

export const {
  useFindPatientQuery,
  useAddRecordMutation,
  useAddMedicineMutation,
  useShowMedicineHistoryQuery,
  useShowRecordHistoryQuery,
} = apiSlice;
