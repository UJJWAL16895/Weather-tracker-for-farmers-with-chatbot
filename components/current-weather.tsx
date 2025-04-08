"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentWeather, type WeatherData } from "@/lib/weather-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react"
import { useCityStore } from "@/lib/city-store"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

export function CurrentWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { selectedCity } = useCityStore()
  const { language } = useLanguageStore()
  const t = translations[language]

  useEffect(() => {
    if (!selectedCity) return

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCurrentWeather(selectedCity.lat, selectedCity.lon)
        setWeather(data)
        setLoading(false)
      } catch (err) {
        setError(t.errorFetchingWeather)
        setLoading(false)
      }
    }

    fetchWeather()
  }, [selectedCity, t.errorFetchingWeather])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  return (
    <>
      <Card className="glass-card enhanced-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.temperature}</CardTitle>
          <Thermometer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weather.temperature.toFixed(1)}°C</div>
          <p className="text-xs text-muted-foreground">
            {t.feelsLike} {weather.feelsLike.toFixed(1)}°C
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card enhanced-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.humidity}</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weather.humidity}%</div>
          <p className="text-xs text-muted-foreground">
            {weather.humidity > 70 ? t.high : weather.humidity < 30 ? t.low : t.normal}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card enhanced-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.windSpeed}</CardTitle>
          <Wind className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{weather.windSpeed} m/s</div>
          <p className="text-xs text-muted-foreground">
            {weather.windSpeed > 10 ? t.strong : weather.windSpeed < 3 ? t.light : t.moderate}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card enhanced-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t.conditions}</CardTitle>
          <Cloud className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{weather.description}</div>
          <p className="text-xs text-muted-foreground">
            {new Date(weather.dt * 1000).toLocaleTimeString(language === "en" ? "en-US" : language)}
          </p>
        </CardContent>
      </Card>
    </>
  )
}
