import { useCallback } from "react";
import { usePreferences } from "../context/PreferencesContext";

const hasVibration = typeof window !== "undefined" && "vibrate" in navigator;

export function useVibration() {
  const { vibrationEnabled } = usePreferences();

  return useCallback(
    (pattern: number | number[] = 30) => {
      if (!vibrationEnabled || !hasVibration) return;
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        console.warn("Vibration not available", error);
      }
    },
    [vibrationEnabled]
  );
}
