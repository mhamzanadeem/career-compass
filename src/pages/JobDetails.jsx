import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LuMapPin,
  LuBriefcase,
  LuArrowLeft,
  LuBookmark,
  LuExternalLink,
  LuBuilding2,
} from "react-icons/lu";
import { saveJob, removeJob } from "../redux/features/savedjobs/savedJobsSlice";
import { formatSalary, formatRemoteType, getInitials } from "../utils/helpers";
import { formatDate } from "../utils/formatDate";
import { API_BASE_URL, API_KEY } from "../utils/constants";
import SkillBadge from "../components/SkillBadge";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allJobs = useSelector((s) => s.jobs.jobs);
  const savedJobs = useSelector((s) => s.saved.savedJobs);

  const cached = allJobs.find((j) => String(j.id) === String(id));
  const [job, setJob] = useState(cached || null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cached) return;
    let active = true;
    setLoading(true);
    fetch(`${API_BASE_URL}/jobs/${id}`, { headers: { "X-API-Key": API_KEY } })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => active && setJob(data.job || data))
      .catch((err) => active && setError(err.message || "Failed to load job"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loader label="Loading job details" />;

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-3">
        <p className="font-semibold">This job couldn't be found</p>
        <p className="text-sm text-muted">{error}</p>
        <button onClick={() => navigate("/jobs")} className="btn-gradient rounded-lg px-5 py-2 text-sm mt-2">
          Back to jobs
        </button>
      </div>
    );
  }

  const isSaved = savedJobs.some((j) => j.id === job.id);
  const related = allJobs.filter((j) => j.id !== job.id).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink dark:hover:text-white w-fit"
      >
        <LuArrowLeft size={16} /> Back
      </button>

      <div className="rounded-2xl bg-bg-dark text-white p-8 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grad-radial-compass opacity-60" />
        <div className="relative h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-xl shrink-0">
          {getInitials(job.company_name || job.company || "Co")}
        </div>
        <div className="relative flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{job.title}</h1>
          <p className="text-slate-300 mt-1">{job.company_name || job.company}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <LuMapPin size={14} /> {job.location || formatRemoteType(job.remote_type)}
            </span>
            <span className="flex items-center gap-1.5">
              <LuBriefcase size={14} /> {job.employment_type?.replace("_", " ") || "Full-time"}
            </span>
            <span className="font-mono">{formatSalary(job.salary_min, job.salary_max)}</span>
          </div>
        </div>
        <div className="relative flex gap-2 shrink-0">
          <button
            onClick={() => (isSaved ? dispatch(removeJob(job.id)) : dispatch(saveJob(job)))}
            className="h-11 w-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Save job"
          >
            <LuBookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <a
            href={job.apply_url || "#"}
            target="_blank"
            rel="noreferrer"
            className="btn-gradient rounded-lg px-5 py-2.5 text-sm flex items-center gap-2"
          >
            Apply now <LuExternalLink size={15} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="flex flex-col gap-6">
          <section className="card-surface p-6">
            <h2 className="font-semibold text-lg mb-3">About this role</h2>
            <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
              {job.description ||
                "This company hasn't published a detailed description yet. Check the apply link for the full listing."}
            </p>
          </section>

          {job.skills?.length > 0 && (
            <section className="card-surface p-6">
              <h2 className="font-semibold text-lg mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} size="md" />
                ))}
              </div>
            </section>
          )}

          {job.requirements?.length > 0 && (
            <section className="card-surface p-6">
              <h2 className="font-semibold text-lg mb-3">Requirements</h2>
              <ul className="list-disc list-inside text-sm text-muted space-y-1.5">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          {job.benefits?.length > 0 && (
            <section className="card-surface p-6">
              <h2 className="font-semibold text-lg mb-3">Benefits</h2>
              <ul className="list-disc list-inside text-sm text-muted space-y-1.5">
                {job.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg mb-3">Related jobs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <JobCard key={r.id} job={r} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="card-surface p-6 flex flex-col gap-4 sticky top-20">
          <div className="flex items-center gap-2 font-semibold">
            <LuBuilding2 className="text-primary" size={18} /> Company
          </div>
          <p className="text-sm text-muted">{job.company_name || job.company}</p>
          {job.company_domain && (
            <Link
              to={`/companies/${job.company_domain}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              View company profile
            </Link>
          )}
          <div className="border-t border-line dark:border-slate-700/60 pt-4 text-sm text-muted">
            Posted {formatDate(job.posted_at)}
          </div>
        </aside>
      </div>
    </div>
  );
}
