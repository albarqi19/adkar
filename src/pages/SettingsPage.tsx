import { ChangeEvent } from "react";
import { Bell, BellRing, MoonStar, Sun, Vibrate, Volume2 } from "lucide-react";
import { usePreferences } from "../context/PreferencesContext";
import { useProgress } from "../context/ProgressContext";

const tones = [
  { id: "soft-bell", label: "جرس هادئ" },
  { id: "gentle-wave", label: "موجة لطيفة" },
  { id: "sufi-chime", label: "رنّة صوفية" },
];

export function SettingsPage() {
  const {
    theme,
    setTheme,
    dailyTasbeehGoal,
    setDailyTasbeehGoal,
    vibrationEnabled,
    setVibrationEnabled,
    notificationsEnabled,
    setNotificationsEnabled,
    morningReminderEnabled,
    setMorningReminderEnabled,
    morningReminderTime,
    setMorningReminderTime,
    eveningReminderEnabled,
    setEveningReminderEnabled,
    eveningReminderTime,
    setEveningReminderTime,
    tasbeehReminderEnabled,
    setTasbeehReminderEnabled,
    tasbeehReminderIntervalMinutes,
    setTasbeehReminderIntervalMinutes,
    reminderTone,
    setReminderTone,
  } = usePreferences();
  const { resetTasbeeh } = useProgress();

  const handleGoalChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value)) return;
    setDailyTasbeehGoal(Math.max(10, Math.min(500, Math.round(value))));
  };

  return (
    <section className="space-y-6 px-6 pt-12 pb-28">
      <header className="rounded-3xl bg-dusk/70 p-6 shadow-lg backdrop-blur-xl">
        <p className="text-sm text-slate-300">تخصيص تجربتك</p>
        <h1 className="mt-2 text-2xl font-bold text-white">الإعدادات</h1>
        <p className="mt-3 text-sm text-slate-400">
          فعل التذكيرات بحسب وقتك، غيّر الهدف اليومي، واضبط الوضع الليلي أو النهاري حسب تفضيلك.
        </p>
      </header>

      <div className="space-y-5">
        <section className="space-y-4 rounded-3xl bg-dusk/70 p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-white">الثيم</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 p-4 text-white transition ${
                theme === "light" ? "bg-white/20" : "bg-white/5"
              }`}
            >
              <Sun className="mb-2 h-6 w-6" />
              وضع النهار
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 p-4 text-white transition ${
                theme === "dark" ? "bg-white/20" : "bg-white/5"
              }`}
            >
              <MoonStar className="mb-2 h-6 w-6" />
              وضع الليل
            </button>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl bg-dusk/70 p-5 shadow-lg">
          <header className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-lg font-semibold">الهدف اليومي</h2>
              <p className="text-xs text-white/70">حدد عدد التسبيحات التي تسعى إليها كل يوم.</p>
            </div>
            <button
              type="button"
              onClick={() => resetTasbeeh()}
              className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/80 transition hover:bg-white/20"
            >
              تصفير عداد اليوم
            </button>
          </header>
          <input
            type="number"
            inputMode="numeric"
            min={10}
            max={500}
            value={dailyTasbeehGoal}
            onChange={handleGoalChange}
            className="w-full rounded-2xl border border-white/10 bg-midnight-soft/80 px-4 py-3 text-right text-white focus:border-brand-200 focus:outline-none"
          />
        </section>

        <section className="space-y-4 rounded-3xl bg-dusk/70 p-5 shadow-lg">
          <header className="flex items-center gap-3 text-white">
            <Bell className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-semibold">التنبيهات</h2>
              <p className="text-xs text-white/70">تأكد من منح التطبيق صلاحية الإشعارات لتعمل التذكيرات.</p>
            </div>
          </header>

          <label className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white">
            <span>تفعيل الإشعارات</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(event) => setNotificationsEnabled(event.target.checked)}
              className="h-5 w-5 accent-brand-300"
            />
          </label>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white/90">
              <span>تذكير أذكار الصباح</span>
              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={morningReminderTime}
                  onChange={(event) => setMorningReminderTime(event.target.value)}
                  className="rounded-xl bg-midnight-soft/80 px-3 py-2 text-right text-white focus:outline-none"
                  disabled={!notificationsEnabled || !morningReminderEnabled}
                />
                <input
                  type="checkbox"
                  checked={morningReminderEnabled}
                  onChange={(event) => setMorningReminderEnabled(event.target.checked)}
                  className="h-5 w-5 accent-brand-300"
                  disabled={!notificationsEnabled}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white/90">
              <span>تذكير أذكار المساء</span>
              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={eveningReminderTime}
                  onChange={(event) => setEveningReminderTime(event.target.value)}
                  className="rounded-xl bg-midnight-soft/80 px-3 py-2 text-right text-white focus:outline-none"
                  disabled={!notificationsEnabled || !eveningReminderEnabled}
                />
                <input
                  type="checkbox"
                  checked={eveningReminderEnabled}
                  onChange={(event) => setEveningReminderEnabled(event.target.checked)}
                  className="h-5 w-5 accent-brand-300"
                  disabled={!notificationsEnabled}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white/90">
              <span>تذكير الاستغفار خلال اليوم</span>
              <div className="flex items-center gap-3">
                <select
                  value={tasbeehReminderIntervalMinutes}
                  onChange={(event) => setTasbeehReminderIntervalMinutes(Number(event.target.value))}
                  className="rounded-xl bg-midnight-soft/80 px-3 py-2 text-right text-white focus:outline-none"
                  disabled={!notificationsEnabled || !tasbeehReminderEnabled}
                >
                  {[60, 120, 180, 240].map((minutes) => (
                    <option key={minutes} value={minutes}>
                      كل {minutes / 60} ساعة
                    </option>
                  ))}
                </select>
                <input
                  type="checkbox"
                  checked={tasbeehReminderEnabled}
                  onChange={(event) => setTasbeehReminderEnabled(event.target.checked)}
                  className="h-5 w-5 accent-brand-300"
                  disabled={!notificationsEnabled}
                />
              </div>
            </div>

            <label className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white/90">
              <span className="flex items-center gap-2"><Volume2 className="h-4 w-4" />نغمة التذكير</span>
              <select
                value={reminderTone}
                onChange={(event) => setReminderTone(event.target.value as typeof reminderTone)}
                className="rounded-xl bg-midnight-soft/80 px-3 py-2 text-right text-white focus:outline-none"
              >
                {tones.map((tone) => (
                  <option key={tone.id} value={tone.id}>
                    {tone.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="space-y-3 rounded-3xl bg-dusk/70 p-5 shadow-lg">
          <h2 className="text-lg font-semibold text-white">اللمس والإحساس</h2>
          <label className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white">
            <span className="flex items-center gap-2"><Vibrate className="h-5 w-5" />اهتزاز عند التسبيح</span>
            <input
              type="checkbox"
              checked={vibrationEnabled}
              onChange={(event) => setVibrationEnabled(event.target.checked)}
              className="h-5 w-5 accent-brand-300"
            />
          </label>
          <p className="text-xs text-white/60">
            يعمل الاهتزاز فقط على الأجهزة التي تدعمه. إذا كنت تستخدم متصفح سطح المكتب قد لا تشعر بتأثيره.
          </p>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-brand-500/30 via-brand-400/20 to-brand-200/20 p-5 text-white shadow-lg">
          <header className="flex items-center gap-3">
            <BellRing className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-semibold">تفعيل التطبيق كتطبيق مثبت (PWA)</h2>
              <p className="text-xs text-white/80">افتح قائمة المتصفح واختر "إضافة إلى الشاشة الرئيسية" لتحصل على تجربة كاملة.</p>
            </div>
          </header>
        </section>
      </div>
    </section>
  );
}
