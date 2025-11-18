import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./features/studentApi";
import { teacherApi } from "./features/teacherApi";

export const store = configureStore({
    reducer: {
        [studentApi.reducerPath]: studentApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            studentApi.middleware,
            teacherApi.middleware
        ),
});
