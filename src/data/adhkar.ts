import rawCategories from "../adhkar.json";

const AUDIO_BASE = "https://raw.githubusercontent.com/rn0x/Adhkar-json/main";

export type DhikrItem = {
  id: string;
  text: string;
  repeat: number;
  audio?: {
    filename: string;
    url: string;
  };
  categoryId: number;
  categoryName: string;
  virtue?: string;
};

export type AdhkarCategory = {
  id: number;
  name: string;
  items: DhikrItem[];
  audioPlaylistUrl?: string;
};

type RawCategory = {
  id: number;
  category: string;
  audio?: string;
  filename?: string;
  array: Array<{
    id: number;
    text: string;
    count?: number | string;
    audio?: string;
    filename?: string;
  }>;
};

const normalizeCount = (value: number | string | undefined): number => {
  if (value === undefined || value === null) {
    return 1;
  }
  if (typeof value === "number") {
    return value > 0 ? value : 1;
  }
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

const resolveAudioUrl = (path?: string): { filename: string; url: string } | undefined => {
  if (!path) return undefined;
  const sanitized = path.startsWith("/") ? path.slice(1) : path;
  return {
    filename: sanitized.replace(/^audio\//, ""),
    url: `${AUDIO_BASE}/${sanitized}`,
  };
};

const parsedCategories: AdhkarCategory[] = (rawCategories as RawCategory[]).map((category) => ({
  id: category.id,
  name: category.category,
  items: category.array.map((item) => ({
    id: `${category.id}-${item.id}`,
    text: item.text.trim(),
    repeat: normalizeCount(item.count),
    audio: resolveAudioUrl(item.audio),
    categoryId: category.id,
    categoryName: category.category,
  })),
  audioPlaylistUrl: resolveAudioUrl(category.audio)?.url,
}));

const categoryByName = parsedCategories.reduce<Record<string, AdhkarCategory | undefined>>(
  (acc, category) => ({
    ...acc,
    [category.name]: category,
  }),
  {}
);

const morningEvening = categoryByName["أذكار الصباح والمساء"];

export const morningAdhkar: DhikrItem[] = morningEvening?.items ?? [];
export const eveningAdhkar: DhikrItem[] = morningEvening?.items ?? [];

export const adhkarCategories = parsedCategories;
