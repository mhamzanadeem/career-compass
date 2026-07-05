import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuSlidersHorizontal, LuSearchX, LuTriangleAlert } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import FilterPanel from "../components/FilterPanel";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import { JobGridSkeleton } from "../components/Loader";
import { setCurrentPage } from "../redux/features/jobs/jobSlice";

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesText(value, query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;
  return normalizeText(value).includes(normalizedQuery);
}

function parseSalary(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function matchesSalary(job, min, max) {
  const filterMin = parseSalary(min);
  const filterMax = parseSalary(max);
  if (filterMin === null && filterMax === null) return true;

  const jobMin = parseSalary(job.salary_min);
  const jobMax = parseSalary(job.salary_max);

  if (filterMin !== null) {
    if (jobMax !== null && jobMax < filterMin) return false;
    if (jobMin !== null && jobMin < filterMin && jobMax === null) return false;
  }

  if (filterMax !== null) {
    if (jobMin !== null && jobMin > filterMax) return false;
    if (jobMax !== null && jobMax > filterMax && jobMin === null) return false;
  }

  return true;
}

export default function Jobs() {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const { jobs, loading, error, params } = useSelector((s) => s.jobs);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (!matchesText(job.location, params.location)) return false;
      if (!matchesText(job.remote_type, params.remote_type)) return false;
      if (!matchesText(job.employment_type, params.employment_type)) return false;
      if (!matchesText(job.seniority || job.level || job.experience_level, params.seniority)) return false;
      if (!matchesSalary(job, params.salary_min, params.salary_max)) return false;
      return true;
    });
  }, [
    jobs,
    params.location,
    params.remote_type,
    params.employment_type,
    params.seniority,
    params.salary_min,
    params.salary_max,
  ]);

  const pageSize = Number(params.per_page) || 20;
  const totalPages = filteredJobs.length > 0 ? Math.ceil(filteredJobs.length / pageSize) : 0;
  const currentPage = totalPages > 0 ? Math.min(params.page, totalPages) : 1;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    globalThis.console.info("[Job Search] Frontend is rendering results from Redux store", {
      loading,
      error,
      storedJobs: jobs.length,
      filteredJobs: filteredJobs.length,
      visibleJobs: visibleJobs.length,
      currentPage,
    });
  }, [loading, error, jobs.length, filteredJobs.length, visibleJobs.length, currentPage]);

  const handlePageChange = (page) => {
    globalThis.console.info("[Job Search] User changed page", { page });
    dispatch(setCurrentPage(page));
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Browse Jobs</h1>
          <p className="text-muted text-sm mt-1">
            {loading ? "Searching…" : `${filteredJobs.length.toLocaleString()} roles match your filters`}
          </p>
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden flex items-center gap-2 rounded-lg border border-line dark:border-slate-700 px-3.5 py-2 text-sm font-medium"
        >
          <LuSlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <div className="hidden lg:block sticky top-20">
          <FilterPanel />
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-end lg:hidden"
              onClick={() => setShowFilters(false)}
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-h-[85vh] overflow-y-auto rounded-t-2xl"
              >
                <FilterPanel onClose={() => setShowFilters(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-6">
          {loading && <JobGridSkeleton />}

          {!loading && error && (
            <div className="card-surface flex flex-col items-center gap-3 py-16 text-center px-6">
              <LuTriangleAlert className="text-danger" size={32} />
              <p className="font-semibold">We couldn't load jobs right now</p>
              <p className="text-sm text-muted max-w-sm">{error}</p>
              <p className="text-sm text-muted">
                Use the search box again to fetch a fresh set of results.
              </p>
            </div>
          )}

          {!loading && !error && filteredJobs.length === 0 && (
            <div className="card-surface flex flex-col items-center gap-3 py-16 text-center px-6">
              <LuSearchX className="text-muted" size={32} />
              <p className="font-semibold">No jobs match your current view</p>
              <p className="text-sm text-muted max-w-sm">
                Try searching first or clearing a few filters.
              </p>
            </div>
          )}

          {!loading && !error && visibleJobs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {visibleJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
