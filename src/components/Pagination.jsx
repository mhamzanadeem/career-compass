import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { classNames } from "../utils/helpers";

function getPageList(current, total) {
  const pages = [];
  const window = 1;
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - window && i <= current + window)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }
  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = getPageList(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 pt-4"
    >
      <button
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 w-9 flex items-center justify-center rounded-lg border border-line dark:border-slate-700 text-muted hover:text-ink dark:hover:text-white hover:border-primary/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <LuChevronLeft size={16} />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-muted text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={classNames(
              "h-9 w-9 rounded-lg text-sm font-semibold transition-colors",
              page === currentPage
                ? "bg-grad-primary text-white shadow-glow-primary"
                : "text-muted hover:text-ink dark:hover:text-white border border-transparent hover:border-line dark:hover:border-slate-700"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-9 w-9 flex items-center justify-center rounded-lg border border-line dark:border-slate-700 text-muted hover:text-ink dark:hover:text-white hover:border-primary/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <LuChevronRight size={16} />
      </button>
    </nav>
  );
}
