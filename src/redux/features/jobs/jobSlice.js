import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// ---------- Initial Search Parameters ----------
const initialParams = {
    q: '',                     // keyword search
    semantic_query: '',        // AI semantic search
    page: 1,                   // current page
    per_page: 20,              // results per page (max 100)
    sort_by: 'posted_at:desc', // sort order
    remote_type: '',           // fully_remote | hybrid | on_site
    countries: '',             // comma-separated ISO codes
    states: '',                // comma-separated US state codes
    job_function: '',          // eng | data | design | ...
    seniority: '',             // comma-separated: Entry, Mid Level, ...
    employment_type: '',       // full_time | part_time | contract | internship
    salary_min: '',            // minimum salary in thousands USD
    salary_max: '',            // maximum salary in thousands USD
    skills: '',                // comma-separated required skills (AND)
    domain: '',                // filter by company domain
    location: '',              // free-text location
    posted_after: '',          // Unix timestamp (ms)
    facets: '',                // comma-separated facet fields
};


const initialState = {
    jobs: [],
    loading: false,
    error: null,
    params: initialParams,
    totalPages: 0,
    totalJobs: 0
}

const jobsSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // Update a single parameter
        setSearchParam: (state, action) => {
            const { key, value } = action.payload;
            state.params[key] = value;
        },
        // Update multiple parameters at once (e.g., from a form)
        setSearchParams: (state, action) => {
            state.params = { ...state.params, ...action.payload };
        },
        // Reset all parameters to initial values
        resetSearchParams: (state) => {
            state.params = initialParams;
        },
        // Convenience action to change page
        setCurrentPage: (state, action) => {
            state.params.page = action.payload;
        },
        // Clear the job list (e.g., before a new search)
        clearJobs: (state) => {
            state.items = [];
            state.totalJobs = 0;
            state.totalPages = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchJobs.fulfilled, (state, action) => {
                state.loading = false;
                // Adjust response fields to match your API structure.
                // Common patterns: data, jobs, results, total, total_count
                const response = action.payload;
                state.items = response.jobs || response.data || response.results || [];
                state.totalJobs = response.total || response.total_count || 0;
                state.totalPages = Math.ceil(state.totalJobs / state.params.per_page) || 0;
                state.error = null;
            })
            .addCase(searchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'An error occurred';
                state.items = [];
            });
    },
})







// ---------- Async Thunk: Search Jobs ----------
export const searchJobs = createAsyncThunk(
    'jobs/search',
    async (_, { getState, rejectWithValue }) => {
        const params = getState().jobs.params;

        const queryParams = {};
        Object.keys(params).forEach((key) => {
            const value = params[key];
            if (value !== '' && value !== null && value !== undefined) {
                queryParams[key] = value;
            }
        });
        if (!queryParams.page) queryParams.page = 1;

        const url = new URL(API_BASE_URL);
        Object.keys(queryParams).forEach((key) =>
            url.searchParams.append(key, queryParams[key])
        );

        try {
            const response = await fetch(url.toString(), {
                headers: {
                    'X-API-Key': API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch jobs');
        }
    }
);


export const {
  setSearchParam,
  setSearchParams,
  resetSearchParams,
  setCurrentPage,
  clearJobs,
} = jobsSlice.actions;

export default jobsSlice.reducer;
