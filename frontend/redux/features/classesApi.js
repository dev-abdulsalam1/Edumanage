import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ClassApi = createApi({
  reducerPath: "classApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["classes"],
  endpoints: (builder) => ({
    // GET all Class
    getClass: builder.query({
      query: () => "classes",
      providesTags: ["classes"],
    }),
    // GET single Class
    getSingleClass: builder.query({
      query: (id) => `classes/${id}`,
      providesTags: (result, error, id) => [{ type: "classes", id }],
    }),
    // CREATE Class
    addClass: builder.mutation({
      query: (newClass) => ({
        url: "classes",
        method: "POST",
        body: newClass,
      }),
      invalidatesTags: ["classes"],
    }),
    // UPDATE Class
    updateClass: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `classes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["classes"],
    }),
    // DELETE class
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["classes"],
    }),
  }),
});

export const {
  useGetClassQuery,
  useGetSingleClassQuery,
  useAddClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = ClassApi;
