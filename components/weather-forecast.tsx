"use client"

import { useEffect, useState } from "react"
import { getWeatherForecast, type ForecastData, type WeatherData } from "@/lib/weather-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useCityStore } from "@/lib/city-store"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

export function WeatherForecast() {
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { selectedCity } = useCityStore()
  const { language } = useLanguageStore()
  const t = translations[language]

  useEffect(() => {
    if (!selectedCity) return

    const fetchForecast = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getWeatherForecast(selectedCity.lat, selectedCity.lon)
        setForecast(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching forecast:", err)
        setError(t.errorFetchingForecast)

        // Provide fallback data if API fails
        const fallbackData = {
          list: Array.from({ length: 7 }, (_, i) => ({
            location: selectedCity.name,
            temperature: 20 + Math.random() * 10,
            feelsLike: 18 + Math.random() * 10,
            humidity: 50 + Math.random() * 30,
            windSpeed: 2 + Math.random() * 5,
            description: ["clear sky", "few clouds", "scattered clouds", "broken clouds", "light rain"][
              Math.floor(Math.random() * 5)
            ],
            icon: ["01d", "02d", "03d", "04d", "10d"][Math.floor(Math.random() * 5)],
            dt: Math.floor(Date.now() / 1000) + i * 86400,
          })),
        }

        setForecast(fallbackData)
        setLoading(false)
      }
    }

    fetchForecast()
  }, [selectedCity, t.errorFetchingForecast])

  if (loading) {
    return <Skeleton className="h-[350px] w-full rounded-xl" />
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!forecast || forecast.list.length === 0) return null

  // Process data for the chart
  const chartData = forecast.list.slice(0, 7).map((item: WeatherData) => ({
    time: new Date(item.dt * 1000).toLocaleDateString(language === "en" ? "en-US" : language, {
      weekday: "short",
      hour: "numeric",
    }),
    temperature: item.temperature,
    humidity: item.humidity,
  }))

  return (
    <div className="space-y-4">
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: `${t.temperature} (°C)`, angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temperature"
              name={t.temperature}
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        {forecast.list.slice(0, 7).map((day: WeatherData, index: number) => (
          <Card key={index}>
            <CardContent className="p-3">
              <div className="text-center">
                <p className="font-medium">
                  {new Date(day.dt * 1000).toLocaleDateString(language === "en" ? "en-US" : language, {
                    weekday: "short",
                  })}
                </p>
                <div className="my-2 flex justify-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.description}
                    width={50}
                    height={50}
                  />
                </div>
                <p className="text-sm">{day.temperature.toFixed(1)}°C</p>
                <p className="text-xs text-muted-foreground capitalize">{day.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
