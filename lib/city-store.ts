"use client"

import { create } from "zustand"

export interface City {
  name: string
  lat: number
  lon: number
}

interface CityStore {
  selectedCity: City | null
  setSelectedCity: (city: City) => void
}

// Jalandhar, Punjab coordinates
const jalandharCity: City = {
  name: "Jalandhar, Punjab, India",
  lat: 31.326,
  lon: 75.576,
}

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: jalandharCity,
  setSelectedCity: (city) => set({ selectedCity: city }),
}))
