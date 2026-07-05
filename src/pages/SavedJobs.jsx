import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { LuBookmarkX, LuSearch, LuTrash2 } from "react-icons/lu";
import SavedJobCard from "../components/SavedJobCard";
import { clearSavedJobs } from "../redux/features/savedjobs/savedJobsSlice";

const SORT_OPTIONS = [
  { label: "Recently saved", value: "recent" },
  { label: "Title A–Z", value: "title" },
  { label: "Highest salary", value: "salary" },
];

export default function SavedJobs() {
  const dispatch = useDispatch();
  const savedJobs = useSelector((s) => s.saved.savedJobs);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recent");

  const visibleJobs = useMemo(() => {
    let list = savedJobs.filter((job) =>
      `${job.title} ${job.company_name || job.company}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    if (sort === "title") {
      list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sort === "salary") {
      list = [...list].sort(
        (a, b) => (b.salary_max || b.salary_min || 0) - (a.salary_max || a.salary_min || 0)
      );
    }
    return list;
  }, [savedJobs, query, sort]);

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Saved Jobs</h1>
          <p className="text-muted text-sm mt-1">{savedJobs.length} roles bookmarked</p>
        </div>
        {savedJobs.length > 0 && (
          <button
            onClick={() => dispatch(clearSavedJobs())}
            className="flex items-center gap-1.5 text-sm font-medium text-danger hover:opacity-80 w-fit"
          >
            <LuTrash2 size={16} /> Clear all
          </button>
        )}
      </div>

      {savedJobs.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-line dark:border-slate-700 bg-white dark:bg-bg-card px-3.5 py-2.5">
            <LuSearch className="text-muted shrink-0" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search saved jobs"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-line dark:border-slate-700 bg-white dark:bg-bg-card px-3.5 py-2.5 text-sm outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {savedJobs.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-20 text-center px-6">
          <div className="h-16 w-16 rounded-2xl bg-primary/8 flex items-center justify-center">
            <LuBookmarkX className="text-primary" size={28} />
          </div>
          <p className="font-semibold">No saved jobs yet</p>
          <p className="text-sm text-muted max-w-sm">
            Bookmark roles while browsing to keep track of the ones you like.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence>
            {visibleJobs.map((job) => (
              <SavedJobCard key={job.id} job={job} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
