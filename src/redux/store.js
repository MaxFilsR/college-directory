import { configureStore } from "@reduxjs/toolkit";
import campusReducer from "./campusSlice";
import studentReducer from "./studentSlice";

export const store = configureStore({
  reducer: {
    campuses: campusReducer,
    students: studentReducer,
  },
});
