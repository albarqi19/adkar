import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle2, Repeat2 } from "lucide-react";
import { morningAdhkar, eveningAdhkar } from "../data/adhkar";
import { useAdhkarSession } from "../hooks/useAdhkarSession";
import { useProgress } from "../context/ProgressContext";
import { useVibration } from "../hooks/useVibration";

const titles = {
  morning: {
    heading: "أذكار الصباح",
    subheading: "اتبع الخطوات حتى تختم وردك الصباحي.",
  },
  evening: {
    heading: "أذكار المساء",
    subheading: "هدئ روحك قبل النوم بذكر الله.",
  },
};

type AdhkarFlowPageProps = {
  mode: "morning" | "evening";
};

export function AdhkarFlowPage({ mode }: AdhkarFlowPageProps) {
  const navigate = useNavigate();
  const sequences = useMemo(() => (mode === "morning" ? morningAdhkar : eveningAdhkar), [mode]);
  const { markAdhkarComplete, clearAdhkarCompletion } = useProgress();
  const vibrate = useVibration();

  const session = useAdhkarSession(mode, sequences, () => {
    markAdhkarComplete(mode);
    vibrate([40, 20, 40]);
  });

  const { currentItem, repeatRemaining, advance, reset, stepIndex, isComplete, percentage } = session;

  const totalSteps = sequences.length;
  const titleContent = titles[mode];

  const handleAdvance = () => {
    if (isComplete) return;
    advance();
    vibrate(20);
  };

  const handleReset = () => {
    reset();
    clearAdhkarCompletion(mode);
  };

  return (
    <section className="flex min-h-screen flex-col px-6 pt-12 pb-24">
      <header className="rounded-3xl bg-dusk/70 p-6 shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">التقدم</p>
            <h1 className="text-2xl font-semibold text-white">{titleContent.heading}</h1>
            <p className="mt-1 text-sm text-slate-400">{titleContent.subheading}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight-soft text-slate-200 shadow-inner shadow-black/40 transition hover:text-brand-200"
            aria-label="رجوع"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5">
          <div className="h-2 w-full overflow-hidden rounded-full bg-midnight-soft">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-brand-200 via-brand-300 to-brand-500 transition-all duration-500"
              style={{ width: `${percentage * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {isComplete
              ? "أحسنت! أديت الورد كامل اليوم."
              : `الخطوة ${stepIndex + 1} من ${totalSteps}`}
          </p>
        </div>
      </header>

      <main className="mt-6 flex flex-1 flex-col gap-5">
        <article className="relative flex flex-1 flex-col justify-between rounded-3xl bg-dusk/80 p-6 text-right shadow-xl">
          {isComplete ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center text-white">
              <CheckCircle2 className="mb-4 h-16 w-16 text-emerald-300" />
              <h2 className="text-2xl font-bold">تم إتمام الورد اليوم</h2>
              <p className="mt-2 text-sm text-slate-300">
                استمر على هذا النور، وسيُكتب لك الأجر بإذن الله. يمكنك إعادة القراءة إن رغبت.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-6 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                إعادة البدء من جديد
              </button>
            </div>
          ) : currentItem ? (
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs text-white">
                  <Repeat2 className="h-4 w-4" />
                  يحتاج إلى {currentItem.repeat} مرة
                </span>
                <p className="text-lg leading-loose text-white">{currentItem.text}</p>
                {currentItem.virtue ? (
                  <p className="rounded-2xl bg-white/5 p-3 text-xs text-slate-200">
                    فضل الذكر: {currentItem.virtue}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={handleAdvance}
                className="relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-brand-200 via-brand-400 to-brand-500 py-10 text-center text-midnight shadow-glow transition active:scale-95"
              >
                <span className="text-sm font-medium">اضغط للتقدم</span>
                <span className="text-4xl font-bold">{repeatRemaining}</span>
                <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-midnight/70">
                  Tap to count
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-white">
              <p>لا توجد أذكار محددة حالياً.</p>
            </div>
          )}
        </article>
      </main>
    </section>
  );
}
