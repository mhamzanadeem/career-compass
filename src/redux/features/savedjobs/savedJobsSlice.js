import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    savedJobs: []
}

const savedjobsSlice = createSlice({
    name: 'savedJobs',
    initialState,
    reducers: {
        saveJob: () => {

        },
        removeJob: () => {

        },
        clearSavedJobs: () => { },

    }
})


