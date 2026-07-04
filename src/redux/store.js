import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./features/jobs/jobSlice";
import savedReducer from "./features/savedjobs/savedJobsSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    saved: savedReducer,
  },
});

export default store;
