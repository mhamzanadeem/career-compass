import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { setSearchParam, setCurrentPage, searchJobs } from "../redux/features/jobs/jobSlice";
import { classNames } from "../utils/helpers";

export default function SearchBar({
  size = "md",
  placeholder = "Search AI roles, skills, or companies…",
  className,
}) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    globalThis.console.info("[Job Search] User searched a keyword", { keyword: value });
    dispatch(setSearchParam({ key: "q", value }));
    dispatch(setCurrentPage(1));
    dispatch(searchJobs());
    navigate("/jobs");
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={classNames(
        "group flex items-center gap-2 rounded-xl2 border border-line dark:border-slate-700 bg-white dark:bg-bg-card shadow-soft focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/40 transition-all",
        size === "lg" ? "px-5 py-4" : "px-4 py-2.5",
        className
      )}
    >
      <LuSearch
        className="text-muted group-focus-within:text-primary transition-colors shrink-0"
        size={size === "lg" ? 22 : 18}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search jobs"
        className={classNames(
          "flex-1 bg-transparent outline-none placeholder:text-muted text-ink dark:text-slate-100",
          size === "lg" ? "text-lg" : "text-sm"
        )}
      />
      <button
        type="submit"
        className={classNames(
          "btn-gradient rounded-lg shrink-0",
          size === "lg" ? "px-5 py-2.5 text-sm" : "px-4 py-1.5 text-xs"
        )}
      >
        Search
      </button>
    </form>
  );
}
