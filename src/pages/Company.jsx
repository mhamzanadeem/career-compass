import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LuGlobe, LuBriefcase, LuBuilding2, LuArrowLeft, LuSearchX } from "react-icons/lu";
import { API_BASE_URL, API_KEY } from "../utils/constants";
import { getInitials } from "../utils/helpers";
import CompanyCard from "../components/CompanyCard";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";

function useCompanyData(id) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: null });
    const endpoint = id ? `${API_BASE_URL}/companies/${id}` : `${API_BASE_URL}/companies`;

    fetch(endpoint, { headers: { "X-API-Key": API_KEY } })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((err) => active && setState({ data: null, loading: false, error: err.message }));

    return () => {
      active = false;
    };
  }, [id]);

  return state;
}

function CompaniesList() {
  const { data, loading, error } = useCompanyData(null);
  const companies = data?.companies || data?.data || data?.results || [];

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted text-sm mt-1">Explore teams hiring on Career Compass.</p>
      </div>

      {loading && <Loader label="Loading companies" />}

      {!loading && error && (
        <div className="card-surface flex flex-col items-center gap-2 py-16 text-center">
          <p className="font-semibold">Couldn't load companies</p>
          <p className="text-sm text-muted">{error}</p>
        </div>
      )}

      {!loading && !error && companies.length === 0 && (
        <div className="card-surface flex flex-col items-center gap-2 py-16 text-center">
          <LuSearchX className="text-muted" size={28} />
          <p className="font-semibold">No companies to show yet</p>
        </div>
      )}

      {!loading && !error && companies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {companies.map((company) => (
            <CompanyCard key={company.id || company.domain} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}

function CompanyDetail({ id }) {
  const navigate = useNavigate();
  const { data, loading, error } = useCompanyData(id);
  const company = data?.company || data;
  const jobs = data?.jobs || company?.jobs || [];

  if (loading) return <Loader label="Loading company profile" />;

  if (error || !company) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-3">
        <p className="font-semibold">Company profile unavailable</p>
        <p className="text-sm text-muted">{error}</p>
        <button onClick={() => navigate("/companies")} className="btn-gradient rounded-lg px-5 py-2 text-sm">
          Back to companies
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      <button
        onClick={() => navigate("/companies")}
        className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink dark:hover:text-white w-fit"
      >
        <LuArrowLeft size={16} /> Back to companies
      </button>

      <div className="card-surface p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="h-16 w-16 rounded-2xl bg-grad-primary flex items-center justify-center text-white font-bold text-xl shrink-0">
          {getInitials(company.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight">{company.name}</h1>
          <p className="text-muted mt-1">{company.industry || "Technology"}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <LuBriefcase size={14} /> {company.open_positions ?? jobs.length} open roles
            </span>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <LuGlobe size={14} /> Visit website
              </a>
            )}
          </div>
        </div>
      </div>

      <section className="card-surface p-6">
        <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <LuBuilding2 className="text-primary" size={18} /> About
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          {company.description || "No company description available yet."}
        </p>
      </section>

      {jobs.length > 0 && (
        <section>
          <h2 className="font-semibold text-lg mb-3">Open positions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function Company() {
  const { id } = useParams();
  return id ? <CompanyDetail id={id} /> : <CompaniesList />;
}
