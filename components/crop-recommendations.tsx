"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentWeather, type WeatherData } from "@/lib/weather-service"
import { Leaf, Droplets, Sun, Cloud } from "lucide-react"
import { useCityStore } from "@/lib/city-store"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

interface CropRecommendation {
  crop: string
  suitability: "high" | "medium" | "low"
  reason: string
  icon: React.ElementType
}

export function CropRecommendations() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { selectedCity } = useCityStore()
  const { language } = useLanguageStore()
  const t = translations[language]

  useEffect(() => {
    if (!selectedCity) return

    const fetchWeatherAndGenerateRecommendations = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCurrentWeather(selectedCity.lat, selectedCity.lon)
        setWeather(data)

        // Generate recommendations based on weather
        const recommendations = generateRecommendations(data)
        setRecommendations(recommendations)

        setLoading(false)
      } catch (err) {
        setError(t.errorFetchingWeather)
        setLoading(false)
      }
    }

    fetchWeatherAndGenerateRecommendations()
  }, [selectedCity, t.errorFetchingWeather])

  const generateRecommendations = (weather: WeatherData): CropRecommendation[] => {
    const recommendations: CropRecommendation[] = []

    // Temperature-based recommendations
    if (weather.temperature > 25) {
      recommendations.push({
        crop: "Tomatoes",
        suitability: "high",
        reason: "Warm temperatures are ideal for tomato growth",
        icon: Sun,
      })
      recommendations.push({
        crop: "Peppers",
        suitability: "high",
        reason: "Thrives in warm weather conditions",
        icon: Sun,
      })
    } else if (weather.temperature > 15) {
      recommendations.push({
        crop: "Lettuce",
        suitability: "high",
        reason: "Moderate temperatures are perfect for leafy greens",
        icon: Leaf,
      })
      recommendations.push({
        crop: "Spinach",
        suitability: "high",
        reason: "Grows well in mild temperatures",
        icon: Leaf,
      })
    } else {
      recommendations.push({
        crop: "Kale",
        suitability: "high",
        reason: "Cold-tolerant crop that can withstand lower temperatures",
        icon: Cloud,
      })
      recommendations.push({
        crop: "Carrots",
        suitability: "medium",
        reason: "Can grow in cooler conditions but prefers moderate temperatures",
        icon: Cloud,
      })
    }

    // Humidity-based recommendations
    if (weather.humidity > 70) {
      recommendations.push({
        crop: "Rice",
        suitability: "high",
        reason: "High humidity levels are ideal for rice cultivation",
        icon: Droplets,
      })
    } else if (weather.humidity < 40) {
      recommendations.push({
        crop: "Wheat",
        suitability: "high",
        reason: "Tolerates drier conditions well",
        icon: Sun,
      })
    }

    return recommendations
  }

  if (loading) {
    return <Skeleton className="h-[350px] w-full rounded-xl" />
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!weather || recommendations.length === 0) {
    return <div className="text-center">No recommendations available</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((recommendation, index) => (
        <Card key={index} className="enhanced-card glass-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`rounded-full p-2 ${getSuitabilityColor(recommendation.suitability)}`}>
                <recommendation.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">{recommendation.crop}</h3>
                <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSuitabilityBadgeColor(recommendation.suitability)}`}
                  >
                    {recommendation.suitability.charAt(0).toUpperCase() + recommendation.suitability.slice(1)}{" "}
                    suitability
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getSuitabilityColor(suitability: string): string {
  switch (suitability) {
    case "high":
      return "bg-green-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

function getSuitabilityBadgeColor(suitability: string): string {
  switch (suitability) {
    case "high":
      return "bg-green-100 text-green-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
