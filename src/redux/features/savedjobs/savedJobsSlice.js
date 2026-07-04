import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    savedJobs: []
}

const savedJobsSlice = createSlice({
    name: 'savedJobs',
    initialState,
    reducers: {
        // Save a job (prevents duplicates by job.id)
        saveJob: (state, action) => {
            const job = action.payload;
            const exists = state.savedJobs.some((j) => j.id === job.id);
            if (!exists) {
                state.savedJobs.push(job);
            }
        },
        // Remove a job by its id
        removeJob: (state, action) => {
            const jobId = action.payload;
            state.savedJobs = state.savedJobs.filter((j) => j.id !== jobId);
        },
        // Clear all saved jobs
        clearSavedJobs: (state) => {
            state.savedJobs = [];
        },

    }
})

export const { saveJob, removeJob, clearSavedJobs } = savedJobsSlice.actions;

export default savedJobsSlice.reducer;
