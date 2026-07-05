import { Link } from "react-router-dom";
import { LuCompass } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="h-16 w-16 rounded-2xl bg-grad-primary flex items-center justify-center text-white animate-sweep">
        <LuCompass size={28} />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
      <p className="text-muted max-w-sm">
        This page drifted off the map. Let's get you back on course.
      </p>
      <Link to="/" className="btn-gradient rounded-lg px-5 py-2.5 text-sm mt-2">
        Back to dashboard
      </Link>
    </div>
  );
}
