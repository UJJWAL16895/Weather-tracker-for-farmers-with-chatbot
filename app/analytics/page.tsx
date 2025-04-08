"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { useCityStore } from "@/lib/city-store"
import { CitySelector } from "@/components/city-selector"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

export default function AnalyticsPage() {
  const [year, setYear] = useState("2023")
  const { selectedCity } = useCityStore()
  const [temperatureData, setTemperatureData] = useState<any[]>([])
  const [precipitationData, setPrecipitationData] = useState<any[]>([])
  const { language } = useLanguageStore()
  const t = translations[language]

  // Generate city-specific data when the selected city changes
  useEffect(() => {
    if (!selectedCity) return

    // Generate temperature data based on the city's latitude
    // Higher latitudes have cooler temperatures
    const latitudeFactor = Math.max(0, (90 - Math.abs(selectedCity.lat)) / 90)
    const baseTemp = latitudeFactor * 30 // Max base temp of 30°C at equator

    const months =
      language === "en"
        ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        : Array.from({ length: 12 }, (_, i) =>
            new Date(2023, i, 1).toLocaleDateString(language === "en" ? "en-US" : language, { month: "short" }),
          )

    const newTempData = [
      {
        month: months[0],
        avg: baseTemp - 15 + Math.random() * 3,
        min: baseTemp - 20 + Math.random() * 3,
        max: baseTemp - 10 + Math.random() * 3,
      },
      {
        month: months[1],
        avg: baseTemp - 13 + Math.random() * 3,
        min: baseTemp - 18 + Math.random() * 3,
        max: baseTemp - 8 + Math.random() * 3,
      },
      {
        month: months[2],
        avg: baseTemp - 10 + Math.random() * 3,
        min: baseTemp - 15 + Math.random() * 3,
        max: baseTemp - 5 + Math.random() * 3,
      },
      {
        month: months[3],
        avg: baseTemp - 5 + Math.random() * 3,
        min: baseTemp - 10 + Math.random() * 3,
        max: baseTemp + Math.random() * 3,
      },
      {
        month: months[4],
        avg: baseTemp + Math.random() * 3,
        min: baseTemp - 5 + Math.random() * 3,
        max: baseTemp + 5 + Math.random() * 3,
      },
      {
        month: months[5],
        avg: baseTemp + 5 + Math.random() * 3,
        min: baseTemp + Math.random() * 3,
        max: baseTemp + 10 + Math.random() * 3,
      },
      {
        month: months[6],
        avg: baseTemp + 8 + Math.random() * 3,
        min: baseTemp + 3 + Math.random() * 3,
        max: baseTemp + 13 + Math.random() * 3,
      },
      {
        month: months[7],
        avg: baseTemp + 7 + Math.random() * 3,
        min: baseTemp + 2 + Math.random() * 3,
        max: baseTemp + 12 + Math.random() * 3,
      },
      {
        month: months[8],
        avg: baseTemp + 2 + Math.random() * 3,
        min: baseTemp - 3 + Math.random() * 3,
        max: baseTemp + 7 + Math.random() * 3,
      },
      {
        month: months[9],
        avg: baseTemp - 3 + Math.random() * 3,
        min: baseTemp - 8 + Math.random() * 3,
        max: baseTemp + 2 + Math.random() * 3,
      },
      {
        month: months[10],
        avg: baseTemp - 8 + Math.random() * 3,
        min: baseTemp - 13 + Math.random() * 3,
        max: baseTemp - 3 + Math.random() * 3,
      },
      {
        month: months[11],
        avg: baseTemp - 13 + Math.random() * 3,
        min: baseTemp - 18 + Math.random() * 3,
        max: baseTemp - 8 + Math.random() * 3,
      },
    ]
    setTemperatureData(newTempData)

    // Generate precipitation data based on the city's longitude
    // Coastal areas (extreme east/west longitudes) tend to have more precipitation
    const longitudeFactor = Math.abs(selectedCity.lon) / 180
    const basePrecip = 40 + longitudeFactor * 60 // Base precipitation between 40-100mm

    const newPrecipData = [
      { month: months[0], value: basePrecip + Math.random() * 30 },
      { month: months[1], value: basePrecip - 5 + Math.random() * 30 },
      { month: months[2], value: basePrecip + 10 + Math.random() * 30 },
      { month: months[3], value: basePrecip + 15 + Math.random() * 30 },
      { month: months[4], value: basePrecip - 10 + Math.random() * 30 },
      { month: months[5], value: basePrecip - 15 + Math.random() * 30 },
      { month: months[6], value: basePrecip - 20 + Math.random() * 30 },
      { month: months[7], value: basePrecip - 15 + Math.random() * 30 },
      { month: months[8], value: basePrecip + Math.random() * 30 },
      { month: months[9], value: basePrecip + 5 + Math.random() * 30 },
      { month: months[10], value: basePrecip + 20 + Math.random() * 30 },
      { month: months[11], value: basePrecip + 15 + Math.random() * 30 },
    ]
    setPrecipitationData(newPrecipData)
  }, [selectedCity, language])

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">{t.analytics}</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <CitySelector />
          <Select defaultValue={year} onValueChange={setYear}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="temperature" className="space-y-6">
        <TabsList className="bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="temperature">{t.temperature}</TabsTrigger>
          <TabsTrigger value="precipitation">{t.precipitation}</TabsTrigger>
          <TabsTrigger value="growing-season">{t.cropRecommendations}</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature">
          <Card className="glass-card enhanced-card">
            <CardHeader>
              <CardTitle>
                {t.temperature} ({year})
              </CardTitle>
              <CardDescription>{selectedCity?.name || t.searchLocation}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    avg: {
                      label: "Average",
                      color: "hsl(var(--chart-1))",
                    },
                    min: {
                      label: "Minimum",
                      color: "hsl(var(--chart-2))",
                    },
                    max: {
                      label: "Maximum",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={temperatureData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: `${t.temperature} (°C)`, angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="avg" stroke="var(--color-avg)" strokeWidth={2} />
                      <Line type="monotone" dataKey="min" stroke="var(--color-min)" strokeWidth={2} />
                      <Line type="monotone" dataKey="max" stroke="var(--color-max)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="precipitation">
          <Card className="glass-card enhanced-card">
            <CardHeader>
              <CardTitle>
                {t.precipitation} ({year})
              </CardTitle>
              <CardDescription>{selectedCity?.name || t.searchLocation}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    value: {
                      label: "Precipitation",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={precipitationData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: `${t.precipitation} (mm)`, angle: -90, position: "insideLeft" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" fill="var(--color-value)" name={t.precipitation} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growing-season">
          <Card className="glass-card enhanced-card">
            <CardHeader>
              <CardTitle>
                {t.cropRecommendations} ({year})
              </CardTitle>
              <CardDescription>{selectedCity?.name || t.searchLocation}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left">Crop</th>
                        <th className="py-2 text-left">Start Month</th>
                        <th className="py-2 text-left">End Month</th>
                        <th className="py-2 text-left">Growing Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Corn</td>
                        <td className="py-2">Apr</td>
                        <td className="py-2">Sep</td>
                        <td className="py-2">120</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Wheat</td>
                        <td className="py-2">Oct</td>
                        <td className="py-2">Jun</td>
                        <td className="py-2">240</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Soybeans</td>
                        <td className="py-2">May</td>
                        <td className="py-2">Oct</td>
                        <td className="py-2">150</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Tomatoes</td>
                        <td className="py-2">May</td>
                        <td className="py-2">Sep</td>
                        <td className="py-2">100</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Lettuce</td>
                        <td className="py-2">Mar</td>
                        <td className="py-2">Jun</td>
                        <td className="py-2">70</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      growingDays: {
                        label: "Growing Days",
                        color: "hsl(var(--chart-5))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { crop: "Corn", growingDays: 120 },
                          { crop: "Wheat", growingDays: 240 },
                          { crop: "Soybeans", growingDays: 150 },
                          { crop: "Tomatoes", growingDays: 100 },
                          { crop: "Lettuce", growingDays: 70 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="crop" />
                        <YAxis label={{ value: "Days", angle: -90, position: "insideLeft" }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="growingDays" fill="var(--color-growingDays)" name="Growing Days" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
