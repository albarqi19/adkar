import { useState } from "react";
import { duaCategories } from "../data/duas";
import { BookCopy, ChevronDown } from "lucide-react";

export function DuaCategoriesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((current: string | null) => (current === categoryId ? null : categoryId));
  };

  return (
    <section className="space-y-6 px-6 pt-12 pb-28">
      <header className="rounded-3xl bg-dusk/70 p-6 shadow-lg backdrop-blur-xl">
        <p className="text-sm text-slate-300">أدعية منوعة</p>
        <h1 className="mt-2 text-2xl font-bold text-white">مكتبة الدعاء</h1>
        <p className="mt-3 text-sm text-slate-400">
          اختر القسم المناسب لحالتك، وافتحه لتجد مجموعة مختارة من الأدعية القصيرة مع تكرارها إن وجد.
        </p>
      </header>

      <div className="space-y-4">
        {duaCategories.map((category) => {
          const isExpanded = expandedCategory === category.id;
          return (
            <article
              key={category.id}
              className="overflow-hidden rounded-3xl bg-dusk/70 shadow-lg transition"
            >
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-right text-white"
              >
                <span className="flex items-center gap-3 text-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <BookCopy className="h-5 w-5" />
                  </span>
                  <span>
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    {category.description ? (
                      <p className="text-xs text-white/70">{category.description}</p>
                    ) : null}
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
                <div className="overflow-hidden px-5 pb-4">
                  <ul className="space-y-4 text-right text-sm text-white/90">
                    {category.items.map((dua) => (
                      <li key={dua.id} className="rounded-2xl bg-white/5 p-4">
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>{dua.title}</span>
                          {dua.repeat ? <span>تكرر {dua.repeat} مرات</span> : null}
                        </div>
                        <p className="mt-2 leading-relaxed text-white">{dua.text}</p>
                        {dua.reference ? (
                          <p className="mt-2 text-xs text-white/60">المصدر: {dua.reference}</p>
                        ) : null}
                      </li>
                    ))}
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
