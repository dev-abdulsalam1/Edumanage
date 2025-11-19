import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["students"],
  endpoints: (builder) => ({
    // GET all Student
    getStudent: builder.query({
      query: () => "students",
      providesTags: ["students"],
    }),
    // GET single student
    getSingleStudent: builder.query({
      query: (id) => `students/${id}`,
      providesTags: (result, error, id) => [{ type: "students", id }],
    }),
    // CREATE Student
    addStudent: builder.mutation({
      query: (newStudent) => ({
        url: "students",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["students"],
    }),
    // UPDATE Student
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["students"],
    }),
    // DELETE Student
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["students"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetSingleStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
