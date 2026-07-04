import { classNames } from "../utils/helpers";

const TONES = {
  default:
    "bg-primary/8 text-primary dark:bg-primary/15 dark:text-secondary border-primary/15",
  accent:
    "bg-accent/8 text-accent dark:bg-accent/15 border-accent/20",
  success:
    "bg-success/10 text-success border-success/20",
  warning:
    "bg-warning/10 text-warning border-warning/20",
  neutral:
    "bg-muted/10 text-muted border-muted/20",
};

export default function SkillBadge({ label, tone = "default", size = "sm" }) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full border font-medium whitespace-nowrap",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
        TONES[tone] || TONES.default
      )}
    >
      {label}
    </span>
  );
}
