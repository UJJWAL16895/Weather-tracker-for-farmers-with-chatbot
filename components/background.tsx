"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useCityStore } from "@/lib/city-store"
import { getCurrentWeather } from "@/lib/weather-service"

type WeatherCondition =
  | "clear"
  | "clouds"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "mist"
  | "fog"
  | "haze"
  | "dust"
  | "smoke"
  | "tornado"
  | "loading"

export function WeatherBackground() {
  const [loaded, setLoaded] = useState(false)
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>("loading")
  const { selectedCity } = useCityStore()

  useEffect(() => {
    // Set loaded to true after a short delay to allow for smooth transition
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!selectedCity) return

    const fetchWeatherCondition = async () => {
      try {
        const data = await getCurrentWeather(selectedCity.lat, selectedCity.lon)
        // Extract the main weather condition from the API response
        const condition = data.description.toLowerCase()

        if (condition.includes("clear") || condition.includes("sun")) {
          setWeatherCondition("clear")
        } else if (condition.includes("cloud")) {
          setWeatherCondition("clouds")
        } else if (condition.includes("rain") || condition.includes("shower")) {
          setWeatherCondition("rain")
        } else if (condition.includes("drizzle")) {
          setWeatherCondition("drizzle")
        } else if (condition.includes("thunderstorm") || condition.includes("thunder")) {
          setWeatherCondition("thunderstorm")
        } else if (condition.includes("snow")) {
          setWeatherCondition("snow")
        } else if (condition.includes("mist")) {
          setWeatherCondition("mist")
        } else if (condition.includes("fog")) {
          setWeatherCondition("fog")
        } else if (condition.includes("haze")) {
          setWeatherCondition("haze")
        } else if (condition.includes("dust") || condition.includes("sand")) {
          setWeatherCondition("dust")
        } else if (condition.includes("smoke")) {
          setWeatherCondition("smoke")
        } else if (condition.includes("tornado")) {
          setWeatherCondition("tornado")
        } else {
          // Default to clouds if condition is not recognized
          setWeatherCondition("clouds")
        }
      } catch (error) {
        console.error("Error fetching weather condition:", error)
        // Default to clouds if there's an error
        setWeatherCondition("clouds")
      }
    }

    fetchWeatherCondition()
  }, [selectedCity])

  // Get the appropriate background image based on weather condition
  const getBackgroundImage = () => {
    switch (weatherCondition) {
      case "clear":
        return "url('/sunny-bg.jpg')"
      case "clouds":
        return "url('/cloudy-bg.jpg')"
      case "rain":
      case "drizzle":
        return "url('/rainy-bg.jpg')"
      case "thunderstorm":
        return "url('/storm-bg.jpg')"
      case "snow":
        return "url('/snow-bg.jpg')"
      case "mist":
      case "fog":
      case "haze":
        return "url('/foggy-bg.jpg')"
      case "dust":
      case "smoke":
        return "url('/dusty-bg.jpg')"
      case "tornado":
        return "url('/tornado-bg.jpg')"
      default:
        return "url('/cloudy-bg.jpg')"
    }
  }

  // Generate random positions for elements
  const generateRandomPositions = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100
      const animationDelay = Math.random() * 5
      const style = { left: `${left}%`, animationDelay: `${animationDelay}s` }
      return { id: i, style }
    })
  }

  // Generate elements for different weather animations
  const raindrops = generateRandomPositions(50)
  const snowflakes = generateRandomPositions(50)

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main background image */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
          loaded ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundImage: getBackgroundImage(),
          filter: "brightness(0.7)",
        }}
      />

      {/* Weather animations based on condition */}
      {weatherCondition === "rain" || weatherCondition === "drizzle" ? (
        <div className="absolute inset-0">
          <div className="rain-container">
            {raindrops.map((drop) => (
              <div key={drop.id} className="rain-drop" style={drop.style}></div>
            ))}
          </div>
          <div className="lightning"></div>
        </div>
      ) : weatherCondition === "thunderstorm" ? (
        <div className="absolute inset-0">
          <div className="rain-container">
            {raindrops.map((drop) => (
              <div key={drop.id} className="rain-drop" style={drop.style}></div>
            ))}
          </div>
          <div className="lightning-intense"></div>
        </div>
      ) : weatherCondition === "snow" ? (
        <div className="absolute inset-0">
          <div className="snow-container">
            {snowflakes.map((flake) => (
              <div key={flake.id} className="snowflake" style={flake.style}></div>
            ))}
          </div>
        </div>
      ) : weatherCondition === "clear" ? (
        <div className="absolute inset-0">
          <div className="sun-rays"></div>
        </div>
      ) : weatherCondition === "clouds" ? (
        <div className="absolute inset-0">
          <div className="cloud-container">
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
            <div className="cloud cloud-4"></div>
          </div>
        </div>
      ) : weatherCondition === "mist" || weatherCondition === "fog" || weatherCondition === "haze" ? (
        <div className="absolute inset-0">
          <div className="fog-container">
            <div className="fog fog-1"></div>
            <div className="fog fog-2"></div>
            <div className="fog fog-3"></div>
          </div>
        </div>
      ) : null}

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80" />
    </div>
  )
}
