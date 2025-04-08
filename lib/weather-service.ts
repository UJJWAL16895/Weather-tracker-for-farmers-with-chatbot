import { OPENWEATHER_API_KEY } from "@/app/env"

export interface WeatherData {
  location: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
  dt: number
}

export interface ForecastData {
  list: WeatherData[]
}

export interface AlertData {
  event: string
  description: string
  start: number
  end: number
  severity: string
}

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch current weather data")
  }

  const data = await response.json()

  return {
    location: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    dt: data.dt,
  }
}

export async function getWeatherForecast(lat: number, lon: number): Promise<ForecastData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data")
  }

  const data = await response.json()

  const forecastList = data.list.map((item: any) => ({
    location: data.city.name,
    temperature: item.main.temp,
    feelsLike: item.main.feels_like,
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
    description: item.weather[0].description,
    icon: item.weather[0].icon,
    dt: item.dt,
  }))

  return {
    list: forecastList,
  }
}

export async function getWeatherAlerts(lat: number, lon: number): Promise<AlertData[]> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,daily&appid=${OPENWEATHER_API_KEY}`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch weather alerts")
  }

  const data = await response.json()

  if (!data.alerts) {
    return []
  }

  return data.alerts.map((alert: any) => ({
    event: alert.event,
    description: alert.description,
    start: alert.start,
    end: alert.end,
    severity: alert.severity || "moderate",
  }))
}
