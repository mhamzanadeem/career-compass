import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobs/jobSlice";
import savedReducer from "./saved/savedSlice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    saved: savedReducer,
  },
});

export default store;
