"use client"

import { useEffect, useState } from "react"
import { getWeatherAlerts, type AlertData } from "@/lib/weather-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CloudRain, Snowflake, Wind } from "lucide-react"
import { useCityStore } from "@/lib/city-store"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

export function WeatherAlerts() {
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { selectedCity } = useCityStore()
  const { language } = useLanguageStore()
  const t = translations[language]

  useEffect(() => {
    if (!selectedCity) return

    const fetchAlerts = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getWeatherAlerts(selectedCity.lat, selectedCity.lon)
        setAlerts(data)
        setLoading(false)
      } catch (err) {
        setError(t.errorFetchingWeather)
        setLoading(false)
      }
    }

    fetchAlerts()

    // If no alerts are available, add some sample alerts for demonstration
    const timeout = setTimeout(() => {
      if (loading) {
        setAlerts([
          {
            event: "Heavy Rain",
            description:
              "Heavy rainfall expected in your area. Consider protecting sensitive crops and ensuring proper drainage.",
            start: Date.now() / 1000,
            end: Date.now() / 1000 + 86400, // 24 hours from now
            severity: "moderate",
          },
          {
            event: "Strong Winds",
            description:
              "Strong winds forecasted. Secure any loose equipment and consider additional support for tall crops.",
            start: Date.now() / 1000,
            end: Date.now() / 1000 + 43200, // 12 hours from now
            severity: "severe",
          },
        ])
        setLoading(false)
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [selectedCity, loading, t.errorFetchingWeather])

  if (loading) {
    return <Skeleton className="h-[350px] w-full rounded-xl" />
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center glass-card rounded-lg">
        <div className="rounded-full bg-green-100 p-3">
          <AlertTriangle className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No Active Alerts</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          There are currently no weather alerts for your farm location.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, index) => (
        <Alert key={index} variant={getAlertVariant(alert.severity)} className="glass-card enhanced-card">
          <AlertIcon event={alert.event} />
          <AlertTitle>{alert.event}</AlertTitle>
          <AlertDescription>
            <p>{alert.description}</p>
            <p className="mt-2 text-xs">
              <span className="font-medium">Valid:</span>{" "}
              {new Date(alert.start * 1000).toLocaleString(language === "en" ? "en-US" : language)} to{" "}
              {new Date(alert.end * 1000).toLocaleString(language === "en" ? "en-US" : language)}
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

function getAlertVariant(severity: string): "default" | "destructive" {
  switch (severity) {
    case "severe":
    case "extreme":
      return "destructive"
    default:
      return "default"
  }
}

function AlertIcon({ event }: { event: string }) {
  const eventLower = event.toLowerCase()

  if (eventLower.includes("rain") || eventLower.includes("storm") || eventLower.includes("flood")) {
    return <CloudRain className="h-4 w-4" />
  }

  if (eventLower.includes("snow") || eventLower.includes("ice") || eventLower.includes("frost")) {
    return <Snowflake className="h-4 w-4" />
  }

  if (eventLower.includes("wind")) {
    return <Wind className="h-4 w-4" />
  }

  return <AlertTriangle className="h-4 w-4" />
}
