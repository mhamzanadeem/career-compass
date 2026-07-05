import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../components/Loader";

const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const JobDetails = lazy(() => import("../pages/JobDetails"));
const Company = lazy(() => import("../pages/Company"));
const SavedJobs = lazy(() => import("../pages/SavedJobs"));
const NotFound = lazy(() => import("../pages/NotFound"));

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader label="Loading page" />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
          <Route path="/jobs/:id" element={<PageTransition><JobDetails /></PageTransition>} />
          <Route path="/companies" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/companies/:id" element={<PageTransition><Company /></PageTransition>} />
          <Route path="/saved-jobs" element={<PageTransition><SavedJobs /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
