import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CurrentWeather } from "@/components/current-weather"
import { WeatherForecast } from "@/components/weather-forecast"
import { CropRecommendations } from "@/components/crop-recommendations"
import { WeatherAlerts } from "@/components/weather-alerts"
import { Skeleton } from "@/components/ui/skeleton"
import { CitySelector } from "@/components/city-selector"

export default function Dashboard() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Farm Weather Dashboard</h1>
        <CitySelector />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
              <CurrentWeather />
            </Suspense>
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
              <CardDescription>7-day weather forecast for your farm</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
                <WeatherForecast />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Crop Recommendations</CardTitle>
              <CardDescription>AI-powered recommendations based on weather conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
                <CropRecommendations />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Weather Alerts</CardTitle>
              <CardDescription>Important weather alerts for your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
                <WeatherAlerts />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
