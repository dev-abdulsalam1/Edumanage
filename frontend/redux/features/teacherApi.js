import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
    reducerPath: "teacherApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    tagTypes: ["Teachers"],
    endpoints: (builder) => ({
        getTeacher: builder.query({
            query: () => "teachers",
            providesTags: ["Teachers"],
        }),

        addTeacher: builder.mutation({
            query: (newteachers) => ({
                url: "teachers",
                method: "POST",
                body: newteachers,
            }),
            invalidatesTags: ["Teachers"],
        }),

        updateTeacher: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `teachers/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Teachers"],
        }),

        deleteTeacher: builder.mutation({
            query: (id) => ({
                url: `teachers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Teachers"],
        }),
    }),
});

export const {
    useGetTeacherQuery,
    useAddTeacherMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
} = teacherApi;
