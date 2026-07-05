import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuTrash2, LuMapPin } from "react-icons/lu";
import { removeJob } from "../redux/features/savedjobs/savedJobsSlice";
import { formatSalary, getInitials } from "../utils/helpers";

export default function SavedJobCard({ job }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="card-surface p-5 flex flex-col gap-4"
    >
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-xl bg-grad-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
          {getInitials(job.company_name || job.company || "Company")}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-ink dark:text-white truncate cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            {job.title || "Untitled role"}
          </h3>
          <p className="text-sm text-muted truncate">{job.company_name || job.company}</p>
        </div>
        <button
          onClick={() => dispatch(removeJob(job.id))}
          aria-label="Remove saved job"
          className="h-9 w-9 flex items-center justify-center rounded-lg border border-line dark:border-slate-700 text-muted hover:text-danger hover:border-danger/40 transition-colors shrink-0"
        >
          <LuTrash2 size={16} />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted">
          <LuMapPin size={14} /> {job.location || "Remote"}
        </span>
        <span className="font-mono font-semibold text-ink dark:text-slate-100">
          {formatSalary(job.salary_min, job.salary_max)}
        </span>
      </div>
    </motion.article>
  );
}
