import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LuBriefcase,
  LuBuilding2,
  LuGlobe,
} from "react-icons/lu";
import SearchBar from "../components/SearchBar";
import { searchJobs, setSearchParam, setCurrentPage } from "../redux/features/jobs/jobSlice";
import { POPULAR_TAGS } from "../utils/constants";

const STATS = [
  { label: "Jobs Found", value: "12,400+", icon: LuBriefcase },
  { label: "Companies", value: "860+", icon: LuBuilding2 },
  { label: "Remote Jobs", value: "68%", icon: LuGlobe },
];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTag = (tag) => {
    globalThis.console.info("[Job Search] Home tag selected", { tag });
    dispatch(setSearchParam({ key: "q", value: tag }));
    dispatch(setCurrentPage(1));
    dispatch(searchJobs());
    navigate("/jobs");
  };

  return (
    <div className="flex flex-col gap-20 pb-10">
      <section className="relative overflow-hidden rounded-b-3xl lg:rounded-3xl mx-0 lg:mx-6 mt-0 lg:mt-6 bg-bg-dark text-white px-6 py-20 lg:py-28">
        <div className="absolute inset-0 bg-grad-radial-compass" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10 animate-sweep opacity-40" />
        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]"
          >
            Discover Your Next <span className="text-transparent bg-clip-text bg-grad-primary">Job</span>
          </motion.h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Search thousands of developer and AI roles, save the ones you love, and explore the companies building what's next.
          </p>
          <div className="w-full max-w-xl">
            <SearchBar size="lg" />
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTag(tag)}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10 hover:border-white/25 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto grid grid-cols-3 gap-4 pt-16">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl2 border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-5 flex flex-col items-center gap-1.5 text-center"
            >
              <Icon className="text-cyan-300" size={20} />
              <span className="font-mono text-2xl font-bold">{value}</span>
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="max-w-6xl mx-auto w-full px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Trending AI skills</h2>
            <p className="text-muted text-sm mt-1">What hiring teams are asking for this month.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TRENDING_SKILLS.map((skill) => (
            <button
              key={skill}
              onClick={() => handleTag(skill)}
              className="rounded-full border border-line dark:border-slate-700 px-4 py-2 text-sm font-medium text-ink dark:text-slate-100 hover:border-primary/40 hover:text-primary transition-colors"
            >
              {skill}
            </button>
          ))}
        </div>
      </section> */}

      {/* <section className="max-w-6xl mx-auto w-full px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Latest jobs</h2>
            <p className="text-muted text-sm mt-1">Freshly posted roles, updated in real time.</p>
          </div>
          <button
            onClick={() => navigate("/jobs")}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
          >
            View all <LuArrowRight size={16} />
          </button>
        </div>

        {loading ? (
          <JobGridSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section> */}

      {/* <section className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="card-surface p-6 flex flex-col gap-2">
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{feature.body}</p>
          </div>
        ))}
      </section> */}
    </div>
  );
}
