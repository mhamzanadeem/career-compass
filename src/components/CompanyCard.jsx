import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuBriefcase, LuGlobe } from "react-icons/lu";
import { getInitials } from "../utils/helpers";

export default function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => navigate(`/companies/${company.id || company.domain}`)}
      className="card-surface group p-6 flex flex-col gap-4 cursor-pointer hover:shadow-soft-lg hover:border-primary/30"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-grad-primary flex items-center justify-center text-white font-bold shrink-0">
          {getInitials(company.name)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-ink dark:text-white truncate group-hover:text-primary transition-colors">
            {company.name}
          </h3>
          <p className="text-sm text-muted truncate">{company.industry || "Technology"}</p>
        </div>
      </div>

      <p className="text-sm text-muted line-clamp-2">
        {company.description || "AI-driven company building the future of work."}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-line dark:border-slate-700/60 text-sm text-muted">
        <span className="flex items-center gap-1">
          <LuBriefcase size={14} /> {company.open_positions ?? 0} open roles
        </span>
        {company.website && (
          <span className="flex items-center gap-1 text-primary">
            <LuGlobe size={14} /> Website
          </span>
        )}
      </div>
    </motion.article>
  );
}
