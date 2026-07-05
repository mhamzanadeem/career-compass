import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LuMenu, LuBookmark, LuMoon, LuSun, LuCompass } from "react-icons/lu";
import SearchBar from "./SearchBar";
import useTheme from "../hooks/useTheme";
import { classNames } from "../utils/helpers";

export default function Navbar({ onMenuClick }) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const savedCount = useSelector((s) => s.saved.savedJobs.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={classNames(
        "sticky top-0 z-40 transition-shadow duration-300 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md",
        scrolled && "shadow-soft"
      )}
    >
      <div className="flex items-center gap-4 px-4 lg:px-8 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-muted hover:text-ink dark:hover:text-white"
          aria-label="Open menu"
        >
          <LuMenu size={20} />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="h-9 w-9 rounded-lg bg-grad-primary flex items-center justify-center text-white">
            <LuCompass size={18} />
          </span>
          <span className="font-extrabold text-lg tracking-tight hidden sm:block">
            Career<span className="text-primary">Compass</span>
          </span>
        </Link>

        <div className="flex-1 hidden md:block max-w-xl">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Link
            to="/saved-jobs"
            aria-label="Saved jobs"
            className="relative h-10 w-10 flex items-center justify-center rounded-lg text-muted hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <LuBookmark size={19} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4.5 min-w-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="h-10 w-10 flex items-center justify-center rounded-lg text-muted hover:text-primary hover:bg-primary/5 transition-colors"
          >
            {theme === "dark" ? <LuSun size={19} /> : <LuMoon size={19} />}
          </button>

          {/* <div className="h-9 w-9 rounded-full bg-grad-primary flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
            AC
          </div> */}
        </div>
      </div>
    </header>
  );
}
