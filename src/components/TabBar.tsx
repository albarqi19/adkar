import { NavLink, useLocation } from "react-router-dom";
import { Sparkles, Sunrise, BookOpenText, Settings } from "lucide-react";
import clsx from "clsx";
import { usePreferences } from "../context/PreferencesContext";

const tabs = [
  {
    to: "/",
    label: "استغفار",
    icon: Sparkles,
  },
  {
    to: "/adhkar",
    label: "الصباح والمساء",
    icon: Sunrise,
  },
  {
    to: "/duas",
    label: "أدعية",
    icon: BookOpenText,
  },
  {
    to: "/settings",
    label: "الإعدادات",
    icon: Settings,
  },
];

export function TabBar() {
  const location = useLocation();
  const { theme } = usePreferences();
  const isDark = theme === "dark";

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md px-4 pb-4">
      <div
        className={clsx(
          "grid grid-cols-4 gap-2 rounded-3xl border backdrop-blur-xl p-2 shadow-lg transition-colors",
          isDark
            ? "border-white/10 bg-dusk/90 text-slate-200"
            : "border-amber-200/60 bg-white/90 text-amber-800 shadow-amber-200/60"
        )}
      >
        {tabs.map(({ to, label, icon: Icon }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname === to || location.pathname.startsWith(`${to}/`);
          return (
            <NavLink
              key={to}
              to={to}
              className={clsx(
                "flex flex-col items-center rounded-2xl py-3 text-xs font-semibold transition-all",
                isDark
                  ? isActive
                    ? "bg-brand-400/20 text-brand-200 shadow-inner shadow-brand-500/20"
                    : "text-slate-300 hover:text-brand-200"
                  : isActive
                    ? "bg-amber-200/40 text-amber-800 shadow-inner shadow-amber-300/40"
                    : "text-amber-700/70 hover:text-amber-800"
              )}
            >
              <Icon
                className={clsx(
                  "mb-1 h-5 w-5",
                  isDark
                    ? isActive
                      ? "text-brand-200"
                      : "text-slate-300"
                    : isActive
                      ? "text-amber-700"
                      : "text-amber-700/70"
                )}
              />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
