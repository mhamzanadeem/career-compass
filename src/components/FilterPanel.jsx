import { useDispatch, useSelector } from "react-redux";
import { LuSlidersHorizontal, LuX } from "react-icons/lu";
import {
  setSearchParams,
  resetSearchParams,
  setCurrentPage,
  searchJobs,
} from "../redux/features/jobs/jobSlice";
import { REMOTE_TYPES, EMPLOYMENT_TYPES, SENIORITY_LEVELS } from "../utils/constants";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted uppercase tracking-wide">
        {label}
      </span>
      {children}
    </label>
  );
}

const selectClasses =
  "rounded-lg border border-line dark:border-slate-700 bg-white dark:bg-bg-dark px-3 py-2 text-sm text-ink dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";

export default function FilterPanel({ onClose }) {
  const dispatch = useDispatch();
  const params = useSelector((s) => s.jobs.params);

  const apply = (patch) => {
    dispatch(setSearchParams(patch));
  };

  const runSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(searchJobs());
  };

  return (
    <div className="card-surface p-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <LuSlidersHorizontal className="text-primary" size={18} />
          Filters
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-muted hover:text-ink dark:hover:text-white"
            aria-label="Close filters"
          >
            <LuX size={18} />
          </button>
        )}
      </div>

      <Field label="Location">
        <input
          type="text"
          value={params.location}
          onChange={(e) => apply({ location: e.target.value })}
          placeholder="City, state, or country"
          className={selectClasses}
        />
      </Field>

      <Field label="Remote type">
        <select
          value={params.remote_type}
          onChange={(e) => apply({ remote_type: e.target.value })}
          className={selectClasses}
        >
          {REMOTE_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Employment type">
        <select
          value={params.employment_type}
          onChange={(e) => apply({ employment_type: e.target.value })}
          className={selectClasses}
        >
          {EMPLOYMENT_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Seniority">
        <select
          value={params.seniority}
          onChange={(e) => apply({ seniority: e.target.value })}
          className={selectClasses}
        >
          <option value="">Any</option>
          {SENIORITY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Salary range (k USD)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={params.salary_min}
            onChange={(e) => apply({ salary_min: e.target.value })}
            placeholder="Min"
            className={`${selectClasses} w-full`}
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            value={params.salary_max}
            onChange={(e) => apply({ salary_max: e.target.value })}
            placeholder="Max"
            className={`${selectClasses} w-full`}
          />
        </div>
      </Field>

      <div className="flex gap-2 pt-1">
        <button onClick={runSearch} className="btn-gradient flex-1 rounded-lg py-2.5 text-sm">
          Apply filters
        </button>
        <button
          onClick={() => {
            dispatch(resetSearchParams());
            dispatch(searchJobs());
          }}
          className="rounded-lg py-2.5 px-4 text-sm font-semibold text-muted border border-line dark:border-slate-700 hover:text-ink dark:hover:text-white hover:border-primary/40 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
