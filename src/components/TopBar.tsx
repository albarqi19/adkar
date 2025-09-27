import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import clsx from "clsx";
import {
  Sparkles,
  Sunrise,
  MoonStar,
  BookOpenText,
  Settings,
  Home,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { usePreferences } from "../context/PreferencesContext";

const baseSubtitle = "حافظ على وردك اليومي بروح مطمئنة.";

type RouteMeta = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
  showBack?: boolean;
  backTo?: string;
};

const routeConfigs: Array<{ match: (path: string) => boolean; meta: RouteMeta }> = [
  {
    match: (path) => path === "/",
    meta: {
      title: "عداد الاستغفار",
      subtitle: "استمر بالاستغفار وراقب تقدمك اليومي.",
      icon: Sparkles,
      gradient: "from-brand-200/35 via-brand-300/20 to-brand-500/15",
    },
  },
  {
    match: (path) => path === "/adhkar",
    meta: {
      title: "الأذكار +",
      subtitle: "ابدأ يومك واختمه بحصنٍ من الذكر.",
      icon: Sunrise,
      gradient: "from-sky-200/40 via-indigo-300/25 to-purple-300/20",
    },
  },
  {
    match: (path) => path.startsWith("/adhkar/morning"),
    meta: {
      title: "أذكار الصباح",
      subtitle: "خطوات متتابعة توقظ القلب مع الفجر.",
      icon: Sunrise,
      gradient: "from-amber-200/40 via-yellow-200/25 to-sky-200/20",
      showBack: true,
      backTo: "/adhkar",
    },
  },
  {
    match: (path) => path.startsWith("/adhkar/evening"),
    meta: {
      title: "أذكار المساء",
      subtitle: "اختم يومك بالسكينة والطمأنينة.",
      icon: MoonStar,
      gradient: "from-indigo-300/35 via-purple-300/20 to-violet-400/15",
      showBack: true,
      backTo: "/adhkar",
    },
  },
  {
    match: (path) => path === "/duas",
    meta: {
      title: "حصن المسلم",
      subtitle: "مجموعة أدعية تغطي مواقفك اليومية.",
      icon: BookOpenText,
      gradient: "from-emerald-200/35 via-teal-300/20 to-cyan-300/15",
    },
  },
  {
    match: (path) => path === "/settings",
    meta: {
      title: "الإعدادات",
      subtitle: "خصص التنبيهات والوضع المفضل لك.",
      icon: Settings,
      gradient: "from-slate-200/40 via-slate-300/25 to-slate-400/15",
    },
  },
];

const defaultMeta: RouteMeta = {
  title: "الأذكار",
  subtitle: baseSubtitle,
  icon: Home,
  gradient: "from-brand-200/30 via-brand-300/15 to-brand-500/10",
};

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = usePreferences();
  const isDark = theme === "dark";

  const meta = useMemo(() => {
    const found = routeConfigs.find(({ match }) => match(location.pathname));
    return found?.meta ?? defaultMeta;
  }, [location.pathname]);

  const IconComponent = meta.icon;

  const handleBack = () => {
    if (meta.backTo) {
      navigate(meta.backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 z-40 px-6 pt-6" dir="rtl">
      <div
        className={clsx(
          "relative overflow-hidden rounded-3xl border px-5 py-4 shadow-lg backdrop-blur-xl transition-colors",
          isDark
            ? "border-white/10 bg-dusk/95 text-white shadow-black/30"
            : "border-amber-200/60 bg-white/90 text-amber-900 shadow-amber-200/70"
        )}
      >
        <div
          className={clsx(
            "absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity",
            meta.gradient
          )}
          aria-hidden
        />
        <div className="relative z-10 flex flex-col gap-4 text-right">
          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <div className="flex flex-row-reverse items-center gap-3">
              <span
                className={clsx(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border",
                  isDark
                    ? "border-white/20 bg-white/15 text-white"
                    : "border-amber-200/70 bg-white/70 text-amber-800"
                )}
              >
                <IconComponent className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-lg font-semibold leading-tight">{meta.title}</h1>
                <p
                  className={clsx(
                    "text-xs",
                    isDark ? "text-slate-200/85" : "text-amber-800/75"
                  )}
                >
                  {meta.subtitle}
                </p>
              </div>
            </div>
            {meta.showBack ? (
              <button
                type="button"
                onClick={handleBack}
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm transition",
                  isDark
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                    : "border-amber-200/70 bg-white/80 text-amber-800 hover:bg-white"
                )}
                aria-label="رجوع"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
