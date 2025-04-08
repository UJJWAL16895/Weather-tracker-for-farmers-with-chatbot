"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherForecast } from "@/components/weather-forecast"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

export default function ForecastsPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-white drop-shadow-md">{t.forecasts}</h1>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>{t.weatherForecast}</CardTitle>
          <CardDescription>{t.weatherForecast}</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
            <WeatherForecast />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
