import { useCallback, useEffect, useRef, useState } from "react";
import { DhikrItem } from "../data/adhkar";

type AudioState = "idle" | "loading" | "ready" | "error";

const CACHE_NAME = "adhkar-audio-cache-v1";

async function fetchWithCache(url: string): Promise<Response> {
  if (typeof window === "undefined" || !("caches" in window)) {
    return fetch(url, { mode: "cors" });
  }

  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(url);
  if (cached) {
    return cached;
  }

  const response = await fetch(url, { mode: "cors" });
  if (response.ok) {
    await cache.put(url, response.clone());
  }
  return response;
}

export function useDhikrAudio() {
  const [state, setState] = useState<AudioState>("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setIsPlaying(false);
    setState("idle");
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(async (item: DhikrItem) => {
    if (!item.audio?.url) {
      return;
    }

    try {
      setState("loading");
      const response = await fetchWithCache(item.audio.url);
      if (!response.ok) {
        throw new Error(`Failed to load audio: ${response.status}`);
      }

      const blob = await response.blob();
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const objectUrl = URL.createObjectURL(blob);
      objectUrlRef.current = objectUrl;

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        audioRef.current.addEventListener("error", () => {
          setState("error");
          setIsPlaying(false);
        });
      }

      audioRef.current.src = objectUrl;
      await audioRef.current.play();
      setState("ready");
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
      setState("error");
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => () => {
    cleanup();
  }, [cleanup]);

  return {
    state,
    isPlaying,
    play,
    stop,
    reset: cleanup,
  };
}
