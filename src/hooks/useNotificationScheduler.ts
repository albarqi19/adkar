import { useEffect } from "react";
import { usePreferences } from "../context/PreferencesContext";

function parseTimeToDate(time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target.getTime() <= Date.now()) {
    target.setDate(target.getDate() + 1);
  }
  return target;
}

async function showNotification(title: string, body: string) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  if (navigator.serviceWorker) {
    const registration = await navigator.serviceWorker.ready;
    registration.showNotification(
      title,
      {
        body,
        tag: `dhikr-${title}`,
        icon: "/icons/icon.svg",
        data: { vibratePattern: [60, 15, 60] },
      } as NotificationOptions
    );
  } else {
    new Notification(title, { body });
  }

  if ("vibrate" in navigator) {
    try {
      navigator.vibrate([60, 15, 60]);
    } catch (error) {
      console.warn("Vibration call failed", error);
    }
  }
}

export function useNotificationScheduler() {
  const {
    notificationsEnabled,
    morningReminderEnabled,
    morningReminderTime,
    eveningReminderEnabled,
    eveningReminderTime,
    tasbeehReminderEnabled,
    tasbeehReminderIntervalMinutes,
    reminderTone,
  } = usePreferences();

  useEffect(() => {
    if (!notificationsEnabled) {
      return undefined;
    }

    if (!("Notification" in window)) {
      console.warn("Notifications are not supported in this browser.");
      return undefined;
    }

    if (Notification.permission === "default") {
      Notification.requestPermission().catch((error) => {
        console.warn("Notification permission request failed", error);
      });
    }

    const timers: number[] = [];

    const scheduleReminder = (time: string, title: string, body: string) => {
      const target = parseTimeToDate(time);
      const delay = target.getTime() - Date.now();
      const timer = window.setTimeout(async () => {
        await showNotification(title, `${body}\nنغمة: ${reminderTone}`);
        scheduleReminder(time, title, body);
      }, delay);
      timers.push(timer);
    };

    if (morningReminderEnabled) {
      scheduleReminder("05:00", "وقت الذكر الصباحي", "ابدأ يومك بالأذكار المباركة.");
      scheduleReminder(morningReminderTime, "أذكار الصباح", "حان وقت أذكار الصباح.");
    }

    if (eveningReminderEnabled) {
      scheduleReminder(eveningReminderTime, "أذكار المساء", "اذكر الله قبل غروب الشمس.");
    }

    if (tasbeehReminderEnabled) {
      const intervalMinutes = Math.max(15, tasbeehReminderIntervalMinutes);
      const interval = window.setInterval(() => {
        void showNotification("تذكير بالاستغفار", "خطوة صغيرة تفتح أبواب الرحمة.");
      }, intervalMinutes * 60 * 1000);
      timers.push(interval);
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [
    notificationsEnabled,
    morningReminderEnabled,
    morningReminderTime,
    eveningReminderEnabled,
    eveningReminderTime,
    tasbeehReminderEnabled,
    tasbeehReminderIntervalMinutes,
    reminderTone,
  ]);
}
