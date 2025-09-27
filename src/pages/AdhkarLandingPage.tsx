import { useNavigate } from "react-router-dom";
import { Sun, Moon, CheckCircle2 } from "lucide-react";
import { useProgress } from "../context/ProgressContext";
import { useAdhkarSession } from "../hooks/useAdhkarSession";
import { morningAdhkar, eveningAdhkar } from "../data/adhkar";

export function AdhkarLandingPage() {
  const navigate = useNavigate();
  const { getAdhkarCompletion } = useProgress();
  const morningSession = useAdhkarSession("morning", morningAdhkar);
  const eveningSession = useAdhkarSession("evening", eveningAdhkar);

  const cards = [
    {
      mode: "morning" as const,
      title: "أذكار الصباح",
      description: "ابدأ نهارك بحصن من الذكر يجلب الطمأنينة.",
      icon: Sun,
      gradient: "from-cyan-300 via-sky-400 to-indigo-500",
      session: morningSession,
    },
    {
      mode: "evening" as const,
      title: "أذكار المساء",
      description: "اختم يومك بخشوع وطمأنينة قبل النوم.",
      icon: Moon,
      gradient: "from-violet-300 via-purple-400 to-indigo-500",
      session: eveningSession,
    },
  ];

  return (
    <section className="space-y-6 px-6 pt-12 pb-24" dir="rtl">
      <header className="rounded-3xl bg-dusk/70 p-6 shadow-lg backdrop-blur-xl">
        <p className="text-sm text-slate-300 text-right">الوِرد اليومي</p>
        <h1 className="mt-2 text-2xl font-bold text-white text-right">أذكار الصباح والمساء</h1>
        <p className="mt-2 text-sm text-slate-400 text-right">
          اتبع الخطوات البسيطة لإتمام وردك اليومي. كل ذكر يظهر مع عدد التكرارات المطلوبة، فقط المس الشاشة ليحسب لك.
        </p>
      </header>

      <div className="space-y-5">
        {cards.map(({ mode, title, description, icon: Icon, gradient, session }) => {
          const completed = session.isComplete || !!getAdhkarCompletion(mode);

          return (
            <button
              key={mode}
              type="button"
              onClick={() => navigate(`/adhkar/${mode}`)}
              className="relative w-full overflow-hidden rounded-3xl bg-dusk/60 p-6 text-right shadow-lg transition focus:outline-none focus:ring-4 focus:ring-brand-200/40 active:scale-[0.99]"
            >
              <div
                className={`absolute inset-0 opacity-70 blur-xl bg-gradient-to-br ${gradient}`}
                aria-hidden
              />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-row-reverse items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                      <Icon className="h-7 w-7 text-white" />
                    </span>
                    <div className="text-right">
                      <h2 className="text-xl font-semibold text-white">{title}</h2>
                      <p className="text-sm text-white/80">{description}</p>
                    </div>
                  </div>
                  {completed ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-300" />
                  ) : (
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white">{`${session.stepIndex + 1} خطوة`}</span>
                  )}
                </div>
                <p className="text-xs text-white/70">
                  {completed ? "أُنْجِزَ اليوم - جزاك الله خيراً" : "اضغط للبدء وتتبع التكرار تلقائياً"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
