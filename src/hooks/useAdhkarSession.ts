import { useCallback, useEffect, useMemo } from "react";
import { DhikrItem } from "../data/adhkar";
import { useLocalStorage } from "./useLocalStorage";
import { getTodayKey } from "../utils/date";

type AdhkarMode = "morning" | "evening";

type SessionEntry = {
  stepIndex: number;
  repeatRemaining: number;
  completedOn: string | null;
  updatedAt: string;
};

type SessionState = {
  morning: SessionEntry;
  evening: SessionEntry;
};

const defaultEntry: SessionEntry = {
  stepIndex: 0,
  repeatRemaining: 1,
  completedOn: null,
  updatedAt: getTodayKey(),
};

const defaultState: SessionState = {
  morning: { ...defaultEntry },
  evening: { ...defaultEntry },
};

export function useAdhkarSession(
  mode: AdhkarMode,
  items: DhikrItem[],
  onComplete?: () => void
) {
  const today = getTodayKey();
  const [state, setState] = useLocalStorage<SessionState>("dhikr-adhkar-session", defaultState);
  const entry = state[mode];
  const firstRepeat = items[0]?.repeat ?? 1;

  useEffect(() => {
    if (entry.updatedAt !== today) {
  setState((current: SessionState) => ({
        ...current,
        [mode]: {
          stepIndex: 0,
          repeatRemaining: firstRepeat,
          completedOn: null,
          updatedAt: today,
        },
      }));
    }
  }, [entry.updatedAt, firstRepeat, mode, setState, today]);

  useEffect(() => {
    if (entry.repeatRemaining === 1 && entry.stepIndex === 0 && entry.updatedAt === today) {
  setState((current: SessionState) => ({
        ...current,
        [mode]: {
          ...current[mode],
          repeatRemaining: firstRepeat,
        },
      }));
    }
  }, [entry.repeatRemaining, entry.stepIndex, entry.updatedAt, firstRepeat, mode, setState, today]);

  const currentItem = items[entry.stepIndex] ?? null;
  const percentage = items.length
    ? Math.min(1, ((entry.stepIndex + (currentItem ? (currentItem.repeat - entry.repeatRemaining) / currentItem.repeat : 0)) / items.length))
    : 0;
  const isComplete = entry.completedOn === today;

  const advance = useCallback(() => {
    if (!items.length || isComplete) return;
  setState((current: SessionState) => {
      const next = { ...current };
      const currentEntry = next[mode];
      const activeItem = items[currentEntry.stepIndex];
      if (!activeItem) {
        return next;
      }

      if (currentEntry.repeatRemaining > 1) {
        next[mode] = {
          ...currentEntry,
          repeatRemaining: currentEntry.repeatRemaining - 1,
          updatedAt: today,
        };
        return next;
      }

      const isLast = currentEntry.stepIndex >= items.length - 1;

      if (isLast) {
        next[mode] = {
          ...currentEntry,
          completedOn: today,
          repeatRemaining: 0,
          updatedAt: today,
        };
        if (onComplete) {
          onComplete();
        }
        return next;
      }

      const nextStep = currentEntry.stepIndex + 1;
      const nextRepeat = items[nextStep]?.repeat ?? 1;
      next[mode] = {
        stepIndex: nextStep,
        repeatRemaining: nextRepeat,
        completedOn: null,
        updatedAt: today,
      };
      return next;
    });
  }, [isComplete, items, mode, onComplete, setState, today]);

  const reset = useCallback(() => {
  setState((current: SessionState) => ({
      ...current,
      [mode]: {
        stepIndex: 0,
        repeatRemaining: firstRepeat,
        completedOn: null,
        updatedAt: today,
      },
    }));
  }, [firstRepeat, mode, setState, today]);

  return useMemo(
    () => ({
      currentItem,
      stepIndex: entry.stepIndex,
      repeatRemaining: entry.repeatRemaining,
      isComplete,
      advance,
      reset,
      percentage,
    }),
    [advance, currentItem, entry.repeatRemaining, entry.stepIndex, isComplete, percentage, reset]
  );
}
