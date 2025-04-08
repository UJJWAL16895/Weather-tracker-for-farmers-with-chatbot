"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCityStore } from "@/lib/city-store"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"

export default function SettingsPage() {
  const { toast } = useToast()
  const { selectedCity, setSelectedCity } = useCityStore()
  const { language, setLanguage } = useLanguageStore()
  const t = translations[language]

  const [location, setLocation] = useState({ lat: "40.7128", lon: "-74.0060" })
  const [farmName, setFarmName] = useState("My Farm")
  const [units, setUnits] = useState("metric")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })
  const [crops, setCrops] = useState(["Corn", "Wheat"])

  // Loading states for save buttons
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPreferences, setSavingPreferences] = useState(false)
  const [savingCrops, setSavingCrops] = useState(false)

  // Update location when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      setLocation({
        lat: selectedCity.lat.toString(),
        lon: selectedCity.lon.toString(),
      })
    }
  }, [selectedCity])

  const handleSaveProfile = () => {
    // Simulate saving profile settings
    setSavingProfile(true)
    setTimeout(() => {
      console.log("Saving profile settings:", { farmName, location, selectedCity })
      setSavingProfile(false)
      toast({
        title: t.profileSaved,
        description: `${t.farmName}: ${farmName}, ${t.farmLocation}: ${selectedCity?.name || "Unknown"}`,
      })
    }, 1000)
  }

  const handleSavePreferences = () => {
    // Simulate saving preferences
    setSavingPreferences(true)
    setTimeout(() => {
      console.log("Saving preferences:", { units, notifications, language })
      setSavingPreferences(false)
      toast({
        title: t.preferencesSaved,
        description: `${t.units}: ${units === "metric" ? t.metric : t.imperial}, ${t.language}: ${language}`,
      })
    }, 1000)
  }

  const handleSaveCrops = () => {
    // Simulate saving crop settings
    setSavingCrops(true)
    setTimeout(() => {
      console.log("Saving crop settings:", { crops })
      setSavingCrops(false)
      toast({
        title: t.cropsSaved,
        description: `${crops.length} ${t.crops.toLowerCase()}`,
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{t.settings}</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">{t.profile}</TabsTrigger>
          <TabsTrigger value="preferences">{t.preferences}</TabsTrigger>
          <TabsTrigger value="crops">{t.crops}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t.profile}</CardTitle>
              <CardDescription>{t.farmLocation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="farm-name">{t.farmName}</Label>
                <Input id="farm-name" value={farmName} onChange={(e) => setFarmName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">{t.farmLocation}</Label>
                <div className="w-full">
                  <div className="mb-2">
                    <Label className="text-sm text-muted-foreground mt-1">
                      {t.coordinates}: {location.lat}, {location.lon}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location Map</Label>
                <div className="aspect-video overflow-hidden rounded-md border">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number.parseFloat(location.lon) - 0.01},${Number.parseFloat(location.lat) - 0.01},${Number.parseFloat(location.lon) + 0.01},${Number.parseFloat(location.lat) + 0.01}&layer=mapnik&marker=${location.lat},${location.lon}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile} disabled={savingProfile}>
                {savingProfile ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.saveProfile}...
                  </>
                ) : (
                  t.saveProfile
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>{t.preferences}</CardTitle>
              <CardDescription>
                {t.units} & {t.language}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="units">{t.units}</Label>
                <Select value={units} onValueChange={setUnits}>
                  <SelectTrigger id="units">
                    <SelectValue placeholder={t.selectLanguage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">{t.metric}</SelectItem>
                    <SelectItem value="imperial">{t.imperial}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">{t.language}</Label>
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder={t.selectLanguage} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>{t.notifications}</Label>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">{t.emailNotifications}</Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">{t.pushNotifications}</Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">{t.smsNotifications}</Label>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePreferences} disabled={savingPreferences}>
                {savingPreferences ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.savePreferences}...
                  </>
                ) : (
                  t.savePreferences
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="crops">
          <Card>
            <CardHeader>
              <CardTitle>{t.crops}</CardTitle>
              <CardDescription>{t.selectedCrops}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t.selectedCrops}</Label>
                <div className="flex flex-wrap gap-2">
                  {crops.map((crop, index) => (
                    <div key={index} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                      {crop}
                      <button
                        onClick={() => setCrops(crops.filter((_, i) => i !== index))}
                        className="ml-1 rounded-full bg-primary/20 p-1 hover:bg-primary/30"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-crop">{t.addCrop}</Label>
                <div className="flex gap-2">
                  <Select
                    onValueChange={(value) => {
                      if (!crops.includes(value)) {
                        setCrops([...crops, value])
                      }
                    }}
                  >
                    <SelectTrigger id="add-crop">
                      <SelectValue placeholder={t.selectCrop} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corn">Corn</SelectItem>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Soybeans">Soybeans</SelectItem>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Potatoes">Potatoes</SelectItem>
                      <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                      <SelectItem value="Lettuce">Lettuce</SelectItem>
                      <SelectItem value="Carrots">Carrots</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveCrops} disabled={savingCrops}>
                {savingCrops ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.saveCrops}...
                  </>
                ) : (
                  t.saveCrops
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
