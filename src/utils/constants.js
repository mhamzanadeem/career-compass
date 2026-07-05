export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.jobdatalake.com";

export const API_KEY = import.meta.env.VITE_API_KEY || "";

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: "LuLayoutDashboard" },
  { label: "Jobs", path: "/jobs", icon: "LuBriefcase" },
  { label: "Saved Jobs", path: "/saved-jobs", icon: "LuBookmark" },
  { label: "Companies", path: "/companies", icon: "LuBuilding2" },
  { label: "Settings", path: "/settings", icon: "LuSettings" },
];

export const REMOTE_TYPES = [
  { label: "Any", value: "" },
  { label: "Fully Remote", value: "fully_remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "On-site", value: "on_site" },
];

export const EMPLOYMENT_TYPES = [
  { label: "Any", value: "" },
  { label: "Full-time", value: "full_time" },
  { label: "Part-time", value: "part_time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

export const SENIORITY_LEVELS = [
  "Entry",
  "Mid Level",
  "Senior",
  "Lead",
  "Staff",
];

export const TRENDING_SKILLS = [
  "LLM Engineering",
  "PyTorch",
  "LangChain",
  "Vector Databases",
  "RAG Pipelines",
  "Python",
  "TypeScript",
  "Kubernetes",
  "Prompt Engineering",
  "Computer Vision",
];

export const POPULAR_TAGS = [
  "AI Engineer",
  "Machine Learning",
  "Frontend",
  "Backend",
  "Remote",
  "Data Science",
];
