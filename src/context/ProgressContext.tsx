import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getTodayKey, isToday } from "../utils/date";

type AdhkarMode = "morning" | "evening";

type TasbeehState = {
  date: string;
  count: number;
};

type AdhkarCompletionState = {
  morning: string | null;
  evening: string | null;
};

type ProgressContextValue = {
  tasbeehCount: number;
  incrementTasbeeh: (step?: number) => number;
  resetTasbeeh: () => void;
  setTasbeehCount: (count: number) => void;
  getAdhkarCompletion: (mode: AdhkarMode) => string | null;
  markAdhkarComplete: (mode: AdhkarMode) => void;
  clearAdhkarCompletion: (mode: AdhkarMode) => void;
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function ProgressProvider({ children }: PropsWithChildren) {
  const today = getTodayKey();

  const [tasbeehState, setTasbeehState] = useLocalStorage<TasbeehState>("dhikr-tasbeeh", {
    date: today,
    count: 0,
  });

  const [adhkarCompletion, setAdhkarCompletion] = useLocalStorage<AdhkarCompletionState>(
    "dhikr-adhkar-completion",
    {
      morning: null,
      evening: null,
    }
  );

  useEffect(() => {
    if (tasbeehState.date !== today) {
      setTasbeehState({ date: today, count: 0 });
    }
  }, [tasbeehState.date, setTasbeehState, today]);

  useEffect(() => {
  setAdhkarCompletion((current: AdhkarCompletionState) => {
      const next = { ...current };
      (Object.keys(next) as AdhkarMode[]).forEach((mode) => {
        if (next[mode] && !isToday(next[mode])) {
          next[mode] = null;
        }
      });
      return next;
    });
  }, [setAdhkarCompletion]);

  const value = useMemo<ProgressContextValue>(() => ({
    tasbeehCount: tasbeehState.count,
    incrementTasbeeh: (step = 1) => {
      const newCount = Math.max(0, tasbeehState.count + step);
      setTasbeehState({ date: today, count: newCount });
      return newCount;
    },
    resetTasbeeh: () => setTasbeehState({ date: today, count: 0 }),
    setTasbeehCount: (count: number) => setTasbeehState({ date: today, count: Math.max(0, count) }),
    getAdhkarCompletion: (mode: AdhkarMode) => adhkarCompletion[mode],
    markAdhkarComplete: (mode: AdhkarMode) =>
      setAdhkarCompletion((current: AdhkarCompletionState) => ({ ...current, [mode]: today })),
    clearAdhkarCompletion: (mode: AdhkarMode) =>
      setAdhkarCompletion((current: AdhkarCompletionState) => ({ ...current, [mode]: null })),
  }), [adhkarCompletion, setAdhkarCompletion, setTasbeehState, tasbeehState.count, today]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}
