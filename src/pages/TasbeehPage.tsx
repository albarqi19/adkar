import { useMemo } from "react";
import { usePreferences } from "../context/PreferencesContext";
import { useProgress } from "../context/ProgressContext";
import { useVibration } from "../hooks/useVibration";
import { formatGregorian, formatHijri } from "../utils/date";
import { RefreshCcw, Target, Flame } from "lucide-react";

export function TasbeehPage() {
  const { dailyTasbeehGoal } = usePreferences();
  const { tasbeehCount, incrementTasbeeh, resetTasbeeh } = useProgress();
  const vibrate = useVibration();

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
    <section className="px-6 pt-12 pb-12 space-y-6">
      <header className="rounded-3xl bg-dusk/70 p-6 shadow-lg backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-300">اليوم</p>
            <h1 className="text-2xl font-bold text-white">{gregorian}</h1>
            <p className="text-sm text-slate-400">{hijri}</p>
          </div>
          <button
            type="button"
            onClick={() => resetTasbeeh()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight-soft text-slate-200 shadow-inner shadow-black/40 transition hover:text-brand-200"
            aria-label="إعادة التعيين"
          >
            <RefreshCcw className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-sm font-medium text-slate-200">
            <span>هدف اليوم</span>
            <span>{dailyTasbeehGoal} تسبيحة</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-midnight-soft">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-200 via-brand-300 to-brand-500 transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
          <p className="text-xs text-slate-400">ابدأ الآن، بالاستغفار يفتح الله لك أبواب الرحمة.</p>
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
          <div className="flex items-center gap-3 rounded-2xl bg-dusk/60 p-4">
            <Target className="h-5 w-5 text-brand-200" />
            <div>
              <p className="text-xs text-slate-400">المتبقي على الهدف</p>
              <p className="text-lg font-semibold text-white">{remaining} ذكر</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-dusk/60 p-4">
            <Flame className="h-5 w-5 text-brand-200" />
            <div>
              <p className="text-xs text-slate-400">الإنجاز اليومي</p>
              <p className="text-lg font-semibold text-white">{tasbeehCount} تسبيحة</p>
            </div>
          </div>
        </div>

        <div className="w-full rounded-3xl bg-dusk/70 p-5 text-sm text-slate-300 shadow-inner shadow-black/30">
          <h2 className="mb-2 text-base font-semibold text-white">نصيحة اليوم</h2>
          <p>
            خصص لحظات هادئة في بداية يومك ونهايته للاستغفار، واجعل هذا الموعد ثابتاً ليكون قلبك دائماً متعلقاً بذكر الله.
          </p>
        </div>
      </div>
    </section>
  );
}
