import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuSlidersHorizontal, LuSearchX, LuTriangleAlert } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import FilterPanel from "../components/FilterPanel";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import { JobGridSkeleton } from "../components/Loader";
import { searchJobs, setCurrentPage } from "../redux/features/jobs/jobSlice";

export default function Jobs() {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const { jobs, loading, error, params, totalPages, totalJobs } = useSelector(
    (s) => s.jobs
  );

  useEffect(() => {
    dispatch(searchJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(searchJobs());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Browse Jobs</h1>
          <p className="text-muted text-sm mt-1">
            {loading ? "Searching…" : `${totalJobs.toLocaleString()} roles match your search`}
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
              <button
                onClick={() => dispatch(searchJobs())}
                className="btn-gradient rounded-lg px-5 py-2 text-sm mt-2"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="card-surface flex flex-col items-center gap-3 py-16 text-center px-6">
              <LuSearchX className="text-muted" size={32} />
              <p className="font-semibold">No jobs match your filters</p>
              <p className="text-sm text-muted max-w-sm">
                Try widening your search or clearing a few filters.
              </p>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              <Pagination
                currentPage={params.page}
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
