import { IProduct } from "@/types";
import { useState, useEffect } from "react";

// Fisher-Yates shuffle algorithm to shuffle the array and select the first 10 items and mark them as new items.
export const getRandomItems = (arr: IProduct[], count: number): IProduct[] => {
  // Create a copy of the array
  const shuffled = [...arr];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Take first 10 and mark them as new
  const selected = shuffled.slice(0, count);
  return selected.map((item) => ({ ...item, isNew: true }));
};

// useMediaQuery.ts
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
