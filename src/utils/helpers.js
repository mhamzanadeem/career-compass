export function formatSalary(min, max, currency = "USD") {
  if (!min && !max) return "Not disclosed";
  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      notation: "compact",
    }).format(n);
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  return fmt(min || max);
}

export function formatRemoteType(type) {
  const map = {
    fully_remote: "Remote",
    hybrid: "Hybrid",
    on_site: "On-site",
  };
  return map[type] || type || "Unspecified";
}

export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function truncate(text, length = 140) {
  if (!text) return "";
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function debounce(fn, delay = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
