const { createAsyncThunk } = require("@reduxjs/toolkit");
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
    totalJobs: 0
}

const jobsSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: () => {

        },
        setCurrentPage: () => {

        },
        clearJobs: () => { },

    }
})







const searchJobs = createAsyncThunk('jobs/search', async () => {
    try {
        const response = await fetch('https://api.jobdatalake.com/v1/jobs?q=backend+engineer&remote_type=fully_remote&salary_min=150&per_page=5" \
  -H "X-API-Key: YOUR_API_KEY')
        return response.json()
    } catch (error) {
        throw error
    }
})
