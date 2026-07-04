import { LuCompass, LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="border-t border-line dark:border-slate-700/60 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-grad-primary flex items-center justify-center text-white">
            <LuCompass size={16} />
          </span>
          <span className="font-bold">
            Career<span className="text-primary">Compass</span>
          </span>
        </div>

        <p className="text-sm text-muted text-center">
          © {new Date().getFullYear()} Career Compass. Navigate your AI career with confidence.
        </p>

        <div className="flex items-center gap-3 text-muted">
          <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors">
            <LuGithub size={18} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <LuLinkedin size={18} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-primary transition-colors">
            <LuTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
