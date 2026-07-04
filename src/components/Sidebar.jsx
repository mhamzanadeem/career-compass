import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuLayoutDashboard,
  LuBriefcase,
  LuBookmark,
  LuBuilding2,
  LuSettings,
  LuX,
  LuCompass,
} from "react-icons/lu";
import { classNames } from "../utils/helpers";

const ICONS = {
  LuLayoutDashboard,
  LuBriefcase,
  LuBookmark,
  LuBuilding2,
  LuSettings,
};

const ITEMS = [
  { label: "Dashboard", path: "/", icon: "LuLayoutDashboard" },
  { label: "Jobs", path: "/jobs", icon: "LuBriefcase" },
  { label: "Saved Jobs", path: "/saved-jobs", icon: "LuBookmark" },
  { label: "Companies", path: "/companies", icon: "LuBuilding2" },
  { label: "Settings", path: "/settings", icon: "LuSettings" },
];

function SidebarLinks({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              classNames(
                "relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "text-primary dark:text-secondary"
                  : "text-muted hover:text-ink dark:hover:text-white hover:bg-primary/5"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/15"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={18} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-line dark:border-slate-700/60 sticky top-0 h-screen py-6">
      <div className="flex items-center gap-2 px-6 pb-8">
        <span className="h-9 w-9 rounded-lg bg-grad-primary flex items-center justify-center text-white">
          <LuCompass size={18} />
        </span>
        <span className="font-extrabold text-lg tracking-tight">
          Career<span className="text-primary">Compass</span>
        </span>
      </div>
      <SidebarLinks />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed left-0 top-0 h-full w-64 bg-bg-light dark:bg-bg-dark z-50 py-6 lg:hidden shadow-soft-lg"
          >
            <div className="flex items-center justify-between px-6 pb-8">
              <span className="font-extrabold text-lg tracking-tight">
                Career<span className="text-primary">Compass</span>
              </span>
              <button onClick={onClose} aria-label="Close menu" className="text-muted">
                <LuX size={20} />
              </button>
            </div>
            <SidebarLinks onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
