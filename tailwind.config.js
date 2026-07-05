/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#3B82F6",
        accent: "#06B6D4",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        "bg-dark": "#0F172A",
        "bg-card": "#1E293B",
        "bg-light": "#F8FAFC",
        ink: "#111827",
        muted: "#6B7280",
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.10)",
        "soft-lg": "0 4px 12px rgba(15, 23, 42, 0.06), 0 20px 40px -16px rgba(15, 23, 42, 0.18)",
        "glow-primary": "0 0 0 1px rgba(37,99,235,0.15), 0 8px 30px -6px rgba(37,99,235,0.35)",
      },
      backgroundImage: {
        "grad-primary": "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
        "grad-radial-compass": "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.25), transparent 60%), radial-gradient(circle at 70% 70%, rgba(37,99,235,0.35), transparent 55%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-468px 0" },
          "100%": { backgroundPosition: "468px 0" },
        },
        sweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        sweep: "sweep 6s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
