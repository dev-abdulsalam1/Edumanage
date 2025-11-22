import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./features/studentApi";
import { teacherApi } from "./features/teacherApi";
import { ClassApi } from "./features/classesApi";

export const store = configureStore({
    reducer: {
        [studentApi.reducerPath]: studentApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer,
        [ClassApi.reducerPath]: ClassApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            studentApi.middleware,
            teacherApi.middleware,
            ClassApi.middleware
        ),
});
