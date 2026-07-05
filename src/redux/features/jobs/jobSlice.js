import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL, API_KEY } from '../../../utils/constants';

const debugJobSearch = (step, details) => {
    globalThis.console.info(`[Job Search] ${step}`, details || "");
};


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
            state.jobs = [];
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
                const response = action.payload;
                const jobs = response.jobs || response.data || response.results || [];
                const totalJobs = response.total || response.total_count || 0;

                state.loading = false;
                state.jobs = jobs;
                state.totalJobs = totalJobs;
                state.totalPages = Math.ceil(state.totalJobs / state.params.per_page) || 0;
                state.error = null;
            })
            .addCase(searchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'An error occurred';
                state.jobs = [];
            });
    },
})







// ---------- Async Thunk: Search Jobs ----------
export const searchJobs = createAsyncThunk(
    'jobs/search',
    async (_, { getState, rejectWithValue }) => {
        const params = getState().jobs.params;

        const queryParams = {};
        if (params.q !== '' && params.q !== null && params.q !== undefined) {
            queryParams.q = params.q;
        }

        const url = new globalThis.URL(API_BASE_URL);
        Object.keys(queryParams).forEach((key) => {
            url.searchParams.append(key, queryParams[key]);
        });

        debugJobSearch("Preparing API request", {
            keyword: queryParams.q || "",
            url: url.toString(),
        });

        try {
            debugJobSearch("Calling jobs API", {
                endpoint: url.toString(),
                hasApiKey: Boolean(API_KEY),
            });

            const response = await globalThis.fetch(url.toString(), {
                headers: {
                    'X-API-Key': API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            debugJobSearch("API response received", {
                ok: response.ok,
                status: response.status,
                jobs: data.jobs?.length || data.data?.length || data.results?.length || 0,
            });
            return data;
        } catch (error) {
            debugJobSearch("API call threw an error", { error: error.message });
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
