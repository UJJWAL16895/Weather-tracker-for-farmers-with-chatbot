"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { OPENWEATHER_API_KEY } from "@/app/env"
import { useCityStore } from "@/lib/city-store"
import { CitySelector } from "@/components/city-selector"

export default function WeatherMapPage() {
  const [loading, setLoading] = useState(true)
  const [mapType, setMapType] = useState("temp_new")
  const [zoom, setZoom] = useState(5)
  const { selectedCity } = useCityStore()
  const [center, setCenter] = useState({ lat: 40.7128, lon: -74.006 })

  useEffect(() => {
    if (selectedCity) {
      setCenter({ lat: selectedCity.lat, lon: selectedCity.lon })
    }
  }, [selectedCity])

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [mapType])

  const mapUrl = `https://tile.openweathermap.org/map/${mapType}/${zoom}/${Math.floor(((center.lon + 180) / 360) * Math.pow(2, zoom))}/${Math.floor(((1 - Math.log(Math.tan((center.lat * Math.PI) / 180) + 1 / Math.cos((center.lat * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, zoom))}.png?appid=${OPENWEATHER_API_KEY}`

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Weather Map</h1>
        <CitySelector />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weather Map</CardTitle>
          <CardDescription>View different weather layers for {selectedCity?.name || "your region"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature" className="space-y-4">
            <TabsList>
              <TabsTrigger value="temperature" onClick={() => setMapType("temp_new")}>
                Temperature
              </TabsTrigger>
              <TabsTrigger value="precipitation" onClick={() => setMapType("precipitation_new")}>
                Precipitation
              </TabsTrigger>
              <TabsTrigger value="clouds" onClick={() => setMapType("clouds_new")}>
                Clouds
              </TabsTrigger>
              <TabsTrigger value="wind" onClick={() => setMapType("wind_new")}>
                Wind
              </TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-xl border">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <div className="relative h-full w-full">
                    <iframe
                      src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=${center.lat}&lon=${center.lon}&zoom=${zoom}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="precipitation" className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-xl border">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <div className="relative h-full w-full">
                    <iframe
                      src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=${center.lat}&lon=${center.lon}&zoom=${zoom}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="clouds" className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-xl border">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <div className="relative h-full w-full">
                    <iframe
                      src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=${center.lat}&lon=${center.lon}&zoom=${zoom}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="wind" className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-xl border">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <div className="relative h-full w-full">
                    <iframe
                      src={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=wind&lat=${center.lat}&lon=${center.lon}&zoom=${zoom}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
