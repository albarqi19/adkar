import { Navigate, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import { TabBar } from "./components/TabBar";
import { TopBar } from "./components/TopBar";
import { TasbeehPage } from "./pages/TasbeehPage";
import { AdhkarLandingPage } from "./pages/AdhkarLandingPage";
import { AdhkarFlowPage } from "./pages/AdhkarFlowPage";
import { DuaCategoriesPage } from "./pages/DuaCategoriesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { useNotificationScheduler } from "./hooks/useNotificationScheduler";
import { usePreferences } from "./context/PreferencesContext";

export default function App() {
  useNotificationScheduler();
  const { theme } = usePreferences();

  const backgroundClass = theme === "dark"
    ? "from-midnight via-midnight-soft to-dusk text-slate-100"
    : "from-[#f6ead7] via-[#f0d7b3] to-[#e4c39a] text-slate-900";

  return (
    <div
      className={clsx(
        "relative mx-auto flex min-h-screen max-w-md flex-col bg-gradient-to-b text-right transition-colors",
        backgroundClass
      )}
    >
      <TopBar />
      <main className="flex-1 overflow-x-hidden pb-32 pt-2">
        <Routes>
          <Route path="/" element={<TasbeehPage />} />
          <Route path="/adhkar" element={<AdhkarLandingPage />} />
          <Route path="/adhkar/morning" element={<AdhkarFlowPage mode="morning" />} />
          <Route path="/adhkar/evening" element={<AdhkarFlowPage mode="evening" />} />
          <Route path="/duas" element={<DuaCategoriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <TabBar />
    </div>
  );
}
