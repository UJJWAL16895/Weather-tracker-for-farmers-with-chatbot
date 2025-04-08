"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Language = "en" | "es" | "fr" | "de" | "zh" | "ar" | "ru" | "ja" | "hi"

interface LanguageStore {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    },
  ),
)
