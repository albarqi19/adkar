import { Navigate, Route, Routes } from "react-router-dom";
import { TabBar } from "./components/TabBar";
import { TasbeehPage } from "./pages/TasbeehPage";
import { AdhkarLandingPage } from "./pages/AdhkarLandingPage";
import { AdhkarFlowPage } from "./pages/AdhkarFlowPage";
import { DuaCategoriesPage } from "./pages/DuaCategoriesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { useNotificationScheduler } from "./hooks/useNotificationScheduler";

export default function App() {
  useNotificationScheduler();

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-gradient-to-b from-midnight via-midnight-soft to-dusk pb-28 text-right">
      <Routes>
        <Route path="/" element={<TasbeehPage />} />
        <Route path="/adhkar" element={<AdhkarLandingPage />} />
        <Route path="/adhkar/morning" element={<AdhkarFlowPage mode="morning" />} />
        <Route path="/adhkar/evening" element={<AdhkarFlowPage mode="evening" />} />
        <Route path="/duas" element={<DuaCategoriesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <TabBar />
    </div>
  );
}
