export function CompassSpinner({ size = 48 }) {
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 rounded-full border-2 border-line dark:border-slate-700" />
      <div className="absolute inset-0 animate-sweep">
        <div className="h-1/2 w-full origin-bottom bg-grad-primary rounded-t-full opacity-70" />
      </div>
      <div className="absolute inset-[6px] rounded-full bg-bg-light dark:bg-bg-dark" />
      <div className="h-2 w-2 rounded-full bg-primary" />
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="card-surface p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-11 w-11 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3.5 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-5/6 rounded" />
      <div className="flex gap-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-9 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function JobGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Loader({ label = "Loading results" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted">
      <CompassSpinner />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
