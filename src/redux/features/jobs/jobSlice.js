const { createAsyncThunk } = require("@reduxjs/toolkit");











const searchJobs = createAsyncThunk('jobs/search', async() =>{
    try {
        const response = await fetch('https://api.jobdatalake.com/v1/jobs?q=backend+engineer&remote_type=fully_remote&salary_min=150&per_page=5" \
  -H "X-API-Key: YOUR_API_KEY')
        return response.json()
    } catch (error) {
        throw error
    }
})
