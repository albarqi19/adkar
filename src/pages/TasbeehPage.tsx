import { useMemo } from "react";
import clsx from "clsx";
import { usePreferences } from "../context/PreferencesContext";
import { useProgress } from "../context/ProgressContext";
import { useVibration } from "../hooks/useVibration";
import { formatGregorian, formatHijri } from "../utils/date";
import { RefreshCcw, Target, Flame } from "lucide-react";

export function TasbeehPage() {
  const { dailyTasbeehGoal, theme } = usePreferences();
  const { tasbeehCount, incrementTasbeeh, resetTasbeeh } = useProgress();
  const vibrate = useVibration();
  const isDark = theme === "dark";

  const progress = Math.min(tasbeehCount / dailyTasbeehGoal, 1);
  const remaining = Math.max(dailyTasbeehGoal - tasbeehCount, 0);

  const { gregorian, hijri } = useMemo(() => {
    const now = new Date();
    return {
      gregorian: formatGregorian(now),
      hijri: formatHijri(now),
    };
  }, []);

  const handleTasbeeh = () => {
    incrementTasbeeh(1);
    vibrate([20, 10, 25]);
  };

  return (
    <section className="space-y-6 px-6 pb-12 pt-10">
      <header
        className={clsx(
          "rounded-3xl p-6 shadow-lg backdrop-blur-xl transition-colors",
          isDark
            ? "bg-dusk/70 text-white"
            : "border border-white/70 bg-white/85 text-amber-900 shadow-amber-200/60"
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className={clsx("text-sm", isDark ? "text-slate-300" : "text-amber-800/80")}>اليوم</p>
            <h1 className={clsx("text-2xl font-bold", isDark ? "text-white" : "text-amber-900")}>{gregorian}</h1>
            <p className={clsx("text-sm", isDark ? "text-slate-400" : "text-amber-700/70")}>{hijri}</p>
          </div>
          <button
            type="button"
            onClick={() => resetTasbeeh()}
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-full shadow-inner transition",
              isDark
                ? "bg-midnight-soft text-slate-200 shadow-black/40 hover:text-brand-200"
                : "bg-amber-100 text-amber-800 shadow-amber-300/50 hover:bg-amber-200"
            )}
            aria-label="إعادة التعيين"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div
            className={clsx(
              "flex items-center justify-between text-sm font-medium",
              isDark ? "text-slate-200" : "text-amber-900"
            )}
          >
            <span>هدف اليوم</span>
            <span>{dailyTasbeehGoal} تسبيحة</span>
          </div>
          <div
            className={clsx(
              "h-2 w-full overflow-hidden rounded-full",
              isDark ? "bg-midnight-soft" : "bg-amber-100"
            )}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-200 via-brand-300 to-brand-500 transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <p className={clsx("text-xs", isDark ? "text-slate-400" : "text-amber-700/80")}>
            ابدأ الآن، بالاستغفار يفتح الله لك أبواب الرحمة.
          </p>
        </div>
      </header>

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative flex h-60 w-60 items-center justify-center rounded-full bg-gradient-to-b from-brand-200 via-brand-300 to-brand-500 shadow-glow transition-transform duration-150 active:scale-95">
          <button
            type="button"
            onClick={handleTasbeeh}
            className="flex h-52 w-52 select-none items-center justify-center rounded-full bg-gradient-to-b from-brand-100 via-brand-300 to-brand-500 text-2xl font-semibold text-midnight shadow-inner shadow-brand-700/20 transition-all duration-150 focus:scale-95 focus:outline-none focus:ring-4 focus:ring-brand-200/40 active:scale-95"
          >
            <span className="leading-relaxed">أستغفر الله</span>
          </button>
          <div className="pointer-events-none absolute inset-4 rounded-full border border-white/20 shadow-[0_0_50px_rgba(245,158,11,0.35)]" />
        </div>

        <div className="grid w-full grid-cols-2 gap-3 text-sm">
          <div
            className={clsx(
              "flex items-center gap-3 rounded-2xl p-4 transition-colors",
              isDark ? "bg-dusk/60" : "bg-white/80"
            )}
          >
            <Target className={clsx("h-5 w-5", isDark ? "text-brand-200" : "text-amber-700")} />
            <div>
              <p className={clsx("text-xs", isDark ? "text-slate-400" : "text-amber-700/80")}>المتبقي على الهدف</p>
              <p className={clsx("text-lg font-semibold", isDark ? "text-white" : "text-amber-900")}>
                {remaining} ذكر
              </p>
            </div>
          </div>
          <div
            className={clsx(
              "flex items-center gap-3 rounded-2xl p-4 transition-colors",
              isDark ? "bg-dusk/60" : "bg-white/80"
            )}
          >
            <Flame className={clsx("h-5 w-5", isDark ? "text-brand-200" : "text-amber-700")} />
            <div>
              <p className={clsx("text-xs", isDark ? "text-slate-400" : "text-amber-700/80")}>الإنجاز اليومي</p>
              <p className={clsx("text-lg font-semibold", isDark ? "text-white" : "text-amber-900")}>
                {tasbeehCount} تسبيحة
              </p>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "w-full rounded-3xl p-5 text-sm shadow-inner transition-colors",
            isDark
              ? "bg-dusk/70 text-slate-300 shadow-black/30"
              : "bg-white/85 text-amber-800 shadow-amber-200/40"
          )}
        >
          <h2 className={clsx("mb-2 text-base font-semibold", isDark ? "text-white" : "text-amber-900")}>
            نصيحة اليوم
          </h2>
          <p>
            خصص لحظات هادئة في بداية يومك ونهايته للاستغفار، واجعل هذا الموعد ثابتاً ليكون قلبك دائماً متعلقاً بذكر الله.
          </p>
        </div>
      </div>
    </section>
  );
}
