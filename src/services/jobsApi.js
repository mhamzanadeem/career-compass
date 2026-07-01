import axios from "axios";

const jobsApi = axios.create({
  baseURL: "https://api.example.com/jobs",
});

export default jobsApi;
