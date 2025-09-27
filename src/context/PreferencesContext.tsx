import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ThemeMode = "dark" | "light";

type ReminderTone = "soft-bell" | "gentle-wave" | "sufi-chime";

type PreferencesState = {
  theme: ThemeMode;
  dailyTasbeehGoal: number;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
  morningReminderEnabled: boolean;
  morningReminderTime: string;
  eveningReminderEnabled: boolean;
  eveningReminderTime: string;
  tasbeehReminderEnabled: boolean;
  tasbeehReminderIntervalMinutes: number;
  reminderTone: ReminderTone;
};

type PreferencesContextValue = PreferencesState & {
  setTheme: (theme: ThemeMode) => void;
  setDailyTasbeehGoal: (goal: number) => void;
  setVibrationEnabled: (value: boolean) => void;
  setNotificationsEnabled: (value: boolean) => void;
  setMorningReminderEnabled: (value: boolean) => void;
  setMorningReminderTime: (value: string) => void;
  setEveningReminderEnabled: (value: boolean) => void;
  setEveningReminderTime: (value: string) => void;
  setTasbeehReminderEnabled: (value: boolean) => void;
  setTasbeehReminderIntervalMinutes: (value: number) => void;
  setReminderTone: (value: ReminderTone) => void;
};

const defaultPreferences: PreferencesState = {
  theme: "dark",
  dailyTasbeehGoal: 100,
  vibrationEnabled: true,
  notificationsEnabled: false,
  morningReminderEnabled: true,
  morningReminderTime: "05:30",
  eveningReminderEnabled: true,
  eveningReminderTime: "18:00",
  tasbeehReminderEnabled: false,
  tasbeehReminderIntervalMinutes: 120,
  reminderTone: "soft-bell",
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export function PreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setStoredPreferences] = useLocalStorage<PreferencesState>(
    "dhikr-preferences",
    defaultPreferences
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", preferences.theme === "dark");
    document.documentElement.classList.toggle("light", preferences.theme === "light");
  }, [preferences.theme]);

  const value = useMemo<PreferencesContextValue>(() => ({
    ...preferences,
    setTheme: (theme: ThemeMode) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, theme })),
    setDailyTasbeehGoal: (goal: number) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, dailyTasbeehGoal: goal })),
    setVibrationEnabled: (value: boolean) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, vibrationEnabled: value })),
    setNotificationsEnabled: (value: boolean) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, notificationsEnabled: value })),
    setMorningReminderEnabled: (value: boolean) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, morningReminderEnabled: value })),
    setMorningReminderTime: (value: string) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, morningReminderTime: value })),
    setEveningReminderEnabled: (value: boolean) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, eveningReminderEnabled: value })),
    setEveningReminderTime: (value: string) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, eveningReminderTime: value })),
    setTasbeehReminderEnabled: (value: boolean) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, tasbeehReminderEnabled: value })),
    setTasbeehReminderIntervalMinutes: (value: number) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, tasbeehReminderIntervalMinutes: value })),
    setReminderTone: (value: ReminderTone) =>
      setStoredPreferences((current: PreferencesState) => ({ ...current, reminderTone: value })),
  }), [preferences, setStoredPreferences]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return context;
}
