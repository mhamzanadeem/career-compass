import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuBookmark, LuMapPin, LuBriefcase } from "react-icons/lu";
import { saveJob, removeJob } from "../redux/features/savedJobs/savedJobsSlice";
import { formatSalary, formatRemoteType, getInitials, classNames } from "../utils/helpers";
import { timeAgo } from "../utils/formatDate";
import SkillBadge from "./SkillBadge";

function MatchRing({ score }) {
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-11 w-11 shrink-0" aria-hidden="true">
      <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90">
        <circle cx="20" cy="20" r={radius} className="stroke-line dark:stroke-slate-700" strokeWidth="3" fill="none" />
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="url(#matchGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary dark:text-secondary">
        {score}%
      </span>
    </div>
  );
}

function scoreFor(id) {
  if (!id) return 78;
  const str = String(id);
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) % 100;
  return 65 + (hash % 31);
}

export default function JobCard({ job }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedJobs = useSelector((s) => s.saved.savedJobs);
  const isSaved = savedJobs.some((j) => j.id === job.id);
  const matchScore = job.match_score || scoreFor(job.id);

  const handleSave = (e) => {
    e.stopPropagation();
    isSaved ? dispatch(removeJob(job.id)) : dispatch(saveJob(job));
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="card-surface group p-5 flex flex-col gap-4 cursor-pointer hover:shadow-soft-lg hover:border-primary/30 relative"
    >
      <div className="flex items-start gap-3">
        <div className="h-11 w-11 rounded-xl bg-grad-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
          {getInitials(job.company_name || job.company || "Company")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink dark:text-white truncate group-hover:text-primary transition-colors">
            {job.title || "Untitled role"}
          </h3>
          <p className="text-sm text-muted truncate">
            {job.company_name || job.company || "Unknown company"}
          </p>
        </div>
        <MatchRing score={matchScore} />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <LuMapPin size={14} /> {job.location || formatRemoteType(job.remote_type)}
        </span>
        <span className="flex items-center gap-1">
          <LuBriefcase size={14} /> {job.employment_type?.replace("_", " ") || "Full-time"}
        </span>
        <span>{timeAgo(job.posted_at)}</span>
      </div>

      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <SkillBadge key={skill} label={skill} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-line dark:border-slate-700/60">
        <span className="font-mono text-sm font-semibold text-ink dark:text-slate-100">
          {formatSalary(job.salary_min, job.salary_max)}
        </span>
        <button
          onClick={handleSave}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          className={classNames(
            "h-9 w-9 flex items-center justify-center rounded-lg border transition-colors",
            isSaved
              ? "bg-primary/10 border-primary/30 text-primary"
              : "border-line dark:border-slate-700 text-muted hover:text-primary hover:border-primary/40"
          )}
        >
          <LuBookmark size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
    </motion.article>
  );
}
