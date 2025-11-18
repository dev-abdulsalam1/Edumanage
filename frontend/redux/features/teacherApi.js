import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
    reducerPath: "teacherApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    tagTypes: ["Teachers"],
    endpoints: (builder) => ({
        // GET all teachers
        getteachers: builder.query({
            query: () => "teachers",
            providesTags: ["Teachers"],
        }),
        // CREATE teachers
        addteachers: builder.mutation({
            query: (newteachers) => ({
                url: "teachers",
                method: "POST",
                body: newteachers,
            }),
            invalidatesTags: ["Teachers"],
        }),
        // UPDATE teachers
        updateteachers: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `teachers/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Teachers"],
        }),
        // DELETE teachers
        deleteteachers: builder.mutation({
            query: (id) => ({
                url: `teachers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Teachers"],
        }),
    }),
});

export const {
    useGetteachersQuery,
    useAddteachersMutation,
    useUpdateteachersMutation,
    useDeleteteachersMutation,
} = teacherApi;
