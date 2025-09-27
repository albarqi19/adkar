import { NavLink, useLocation } from "react-router-dom";
import { Sparkles, Sunrise, BookOpenText, Settings } from "lucide-react";
import clsx from "clsx";

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

  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md px-4 pb-4">
      <div className="grid grid-cols-4 gap-2 rounded-3xl bg-dusk/90 backdrop-blur-xl p-2 shadow-lg">
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
                isActive
                  ? "bg-brand-400/20 text-brand-200 shadow-inner shadow-brand-500/20"
                  : "text-slate-300 hover:text-brand-200"
              )}
            >
              <Icon className={clsx("h-5 w-5 mb-1", isActive ? "text-brand-200" : "text-slate-300")}/>
              <span>{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
