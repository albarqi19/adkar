import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  BookCopy,
  ChevronDown,
  Repeat2,
  Volume2,
  Loader2,
  Square,
} from "lucide-react";
import { adhkarCategories, DhikrItem } from "../data/adhkar";
import { usePreferences } from "../context/PreferencesContext";
import { useDhikrAudio } from "../hooks/useDhikrAudio";

export function DuaCategoriesPage() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const { theme } = usePreferences();
  const { state: audioState, isPlaying, play, stop } = useDhikrAudio();
  const isDark = theme === "dark";

  const categories = useMemo(() => adhkarCategories, []);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategory((current) => (current === categoryId ? null : categoryId));
  };

  const handleAudioToggle = useCallback(
    async (item: DhikrItem) => {
      if (!item.audio) {
        return;
      }

      const isCurrent = activeAudioId === item.id;

      if (isCurrent && isPlaying) {
        stop();
        setActiveAudioId(null);
        return;
      }

      try {
        await play(item);
        setActiveAudioId(item.id);
      } catch (error) {
        console.error(error);
        setActiveAudioId(null);
      }
    },
    [activeAudioId, isPlaying, play, stop]
  );

  useEffect(() => {
    if (!isPlaying && audioState !== "loading") {
      setActiveAudioId(null);
    }
  }, [audioState, isPlaying]);

  const getAudioStateForItem = (item: DhikrItem) => {
    const isCurrent = activeAudioId === item.id;
    return {
      isCurrent,
      isLoading: isCurrent && audioState === "loading",
      isActivePlaying: isCurrent && isPlaying,
    };
  };

  return (
    <section className="space-y-6 px-6 pt-12 pb-28" dir="rtl">
      <header className="rounded-3xl bg-dusk/70 p-6 text-right shadow-lg backdrop-blur-xl">
        <p className="text-sm text-slate-300">أدعية منوعة</p>
        <h1 className="mt-2 text-2xl font-bold text-white">مكتبة الدعاء</h1>
        <p className="mt-3 text-sm text-slate-400">
          اختر القسم المناسب لحالتك، وافتحه لتجد مجموعة مختارة من الأدعية القصيرة مع تكرارها إن وجد.
        </p>
      </header>

      <div className="space-y-4">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          const totalItems = category.items.length;
          const description = `${totalItems} ذكر`;

          return (
            <article
              key={category.id}
              className={clsx(
                "overflow-hidden rounded-3xl border shadow-lg transition",
                isDark
                  ? "border-white/10 bg-dusk/80 text-white"
                  : "border-amber-200/70 bg-white/90 text-amber-900 shadow-amber-200/70"
              )}
            >
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={clsx(
                  "flex w-full items-center justify-between px-5 py-4 text-right transition",
                  isDark ? "text-white" : "text-amber-900"
                )}
              >
                <span className="flex items-center gap-3 text-start">
                  <span
                    className={clsx(
                      "flex h-10 w-10 items-center justify-center rounded-2xl border",
                      isDark
                        ? "border-white/15 bg-white/10 text-white"
                        : "border-amber-200/70 bg-white/80 text-amber-800"
                    )}
                  >
                    <BookCopy className="h-5 w-5" />
                  </span>
                  <span>
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    <p
                      className={clsx(
                        "text-xs",
                        isDark ? "text-white/70" : "text-amber-800/70"
                      )}
                    >
                      {description}
                    </p>
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 transition ${isExpanded ? "rotate-180" : "rotate-0"}`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div
                  className={clsx(
                    "overflow-hidden px-5 pb-5",
                    isDark ? "text-white" : "text-amber-900"
                  )}
                >
                  <ul className="space-y-4 text-right text-sm">
                    {category.items.map((item) => {
                      const { isCurrent, isLoading, isActivePlaying } = getAudioStateForItem(item);

                      return (
                        <li
                          key={item.id}
                          className={clsx(
                            "rounded-3xl border px-4 py-4 shadow-inner transition",
                            isDark
                              ? "border-white/10 bg-white/5 text-white"
                              : "border-amber-200/70 bg-white text-amber-900 shadow-amber-100"
                          )}
                        >
                          <div className="flex flex-row-reverse items-center justify-between gap-3 text-xs">
                            <span
                              className={clsx(
                                "inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium",
                                isDark
                                  ? "bg-white/10 text-white"
                                  : "bg-amber-100 text-amber-800"
                              )}
                            >
                              <Repeat2 className="h-3.5 w-3.5" />
                              <span>التكرار: {item.repeat}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAudioToggle(item)}
                              disabled={!item.audio}
                              className={clsx(
                                "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
                                !item.audio && "cursor-not-allowed opacity-40",
                                isDark
                                  ? "border-white/20 bg-white/10 hover:bg-white/15"
                                  : "border-amber-200/70 bg-amber-50 hover:bg-amber-100"
                              )}
                              aria-label="تشغيل الصوت"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : isActivePlaying ? (
                                <Square className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                              <span>
                                {!item.audio
                                  ? "لا يتوفر صوت"
                                  : isActivePlaying
                                    ? "إيقاف الصوت"
                                    : isLoading
                                      ? "جاري التحميل"
                                      : isCurrent
                                        ? "تشغيل مجددًا"
                                        : "تشغيل الصوت"}
                              </span>
                            </button>
                          </div>
                          <p className="mt-3 whitespace-pre-line leading-relaxed">
                            {item.text}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
