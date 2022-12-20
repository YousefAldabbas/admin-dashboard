import { apiSlice } from "../../app/api/apiSlice";

export const instructionApiSlice = apiSlice.injectEndpoints({
  providesTags: ["Instructions"],
  endpoints: (builder) => ({
    getInstructions: builder.query({
      query: () => ({
        url: "/admin/instructions/",
        method: "GET",
      }),
      invalidatesTags: ["Instructions"],
      providesTags: ["Instructions"],
    }),
    addInstruction: builder.mutation({
      query: (body) => ({
        url: "/admin/instructions/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Instructions"],
      providesTags: ["Instructions"],
    }),
    UpdateInstruction: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/instructions/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Instructions"],
      providesTags: ["Instructions"],
    }),
    DeleteInstruction: builder.mutation({
      query: (id) => ({
        url: `/admin/instructions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Instructions"],
      providesTags: ["Instructions"],
    }),
  }),
});

export const {
  useGetInstructionsQuery,
  useAddInstructionMutation,
  useDeleteInstructionMutation,
  useUpdateInstructionMutation,
} = instructionApiSlice;
