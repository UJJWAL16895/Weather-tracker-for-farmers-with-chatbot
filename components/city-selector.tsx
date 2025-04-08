"use client"

import { useState, useEffect, useRef } from "react"
import { Check, ChevronsUpDown, Search, MapPin, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useCityStore } from "@/lib/city-store"
import { OPENWEATHER_API_KEY } from "@/app/env"
import { useToast } from "@/components/ui/use-toast"

interface LocationResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export function CitySelector() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<LocationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGeolocating, setIsGeolocating] = useState(false)
  const { selectedCity, setSelectedCity } = useCityStore()
  const { toast } = useToast()
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  // Search for locations as user types
  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([])
      return
    }

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    // Set a timeout to avoid too many API calls
    searchTimeout.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchTerm)}&limit=10&appid=${OPENWEATHER_API_KEY}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch location data")
        }

        const data = await response.json()
        setResults(
          data.map((item: any) => ({
            name: item.name,
            lat: item.lat,
            lon: item.lon,
            country: item.country,
            state: item.state,
          })),
        )
      } catch (error) {
        console.error("Error searching locations:", error)
        toast({
          title: "Error",
          description: "Failed to search locations. Please try again.",
          variant: "destructive",
        })
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 500)

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
    }
  }, [searchTerm, toast])

  // Get user's current location
  const getUserLocation = () => {
    setIsGeolocating(true)

    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      })
      setIsGeolocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // Reverse geocoding to get location name
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_API_KEY}`,
          )

          if (!response.ok) {
            throw new Error("Failed to get location name")
          }

          const data = await response.json()

          if (data.length > 0) {
            const location = data[0]
            const locationName = location.state
              ? `${location.name}, ${location.state}, ${location.country}`
              : `${location.name}, ${location.country}`

            setSelectedCity({
              name: locationName,
              lat: latitude,
              lon: longitude,
            })

            toast({
              title: "Location Found",
              description: `Using your current location: ${locationName}`,
            })
          } else {
            // If no name found, just use coordinates
            setSelectedCity({
              name: `Location at ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
              lat: latitude,
              lon: longitude,
            })
          }
        } catch (error) {
          console.error("Error getting location:", error)
          toast({
            title: "Error",
            description: "Failed to get your location. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsGeolocating(false)
          setOpen(false)
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        let errorMessage = "Failed to get your location"

        if (error.code === 1) {
          errorMessage = "Location access denied. Please enable location permissions."
        } else if (error.code === 2) {
          errorMessage = "Location unavailable. Please try again."
        } else if (error.code === 3) {
          errorMessage = "Location request timed out. Please try again."
        }

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        setIsGeolocating(false)
      },
    )
  }

  const formatLocationName = (location: LocationResult) => {
    return location.state
      ? `${location.name}, ${location.state}, ${location.country}`
      : `${location.name}, ${location.country}`
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedCity ? selectedCity.name : "Search location..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput
              placeholder="Search any location..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <Search className="h-10 w-10 text-muted-foreground mb-2" />
                    <p>No locations found.</p>
                    <p className="text-sm text-muted-foreground">Try a different search term</p>
                  </div>
                )}
              </CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto">
                {results.map((location, index) => {
                  const displayName = formatLocationName(location)
                  return (
                    <CommandItem
                      key={`${location.name}-${location.lat}-${location.lon}-${index}`}
                      value={displayName}
                      onSelect={() => {
                        setSelectedCity({
                          name: displayName,
                          lat: location.lat,
                          lon: location.lon,
                        })
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedCity?.name === displayName ? "opacity-100" : "opacity-0")}
                      />
                      {displayName}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="icon" onClick={getUserLocation} disabled={isGeolocating} title="Use my location">
        {isGeolocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
        <span className="sr-only">Use my location</span>
      </Button>
    </div>
  )
}
