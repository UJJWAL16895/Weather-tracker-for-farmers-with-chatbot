"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, BarChart3, Cloud, MessageSquare, Settings, Menu, X, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguageStore } from "@/lib/language-store"
import { translations } from "@/lib/translations"
import { LanguageSelector } from "@/components/language-selector"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguageStore()
  const t = translations[language]

  const navItems = [
    { name: t.dashboard, href: "/", icon: Home },
    { name: t.weatherMap, href: "/map", icon: Map },
    { name: t.forecasts, href: "/forecasts", icon: Cloud },
    { name: t.analytics, href: "/analytics", icon: BarChart3 },
    { name: t.aiAssistant, href: "/assistant", icon: MessageSquare },
    { name: t.settings, href: "/settings", icon: Settings },
    { name: t.about, href: "/about", icon: Info },
  ]

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between border-b px-6">
          <h1 className="text-xl font-bold">Weather Tracker</h1>
          <LanguageSelector />
        </div>
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
