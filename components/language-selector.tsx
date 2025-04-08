"use client"

import { useLanguageStore } from "@/lib/language-store"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "hi", name: "हिन्दी" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as any)}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code} className="cursor-pointer">
              <div className="flex items-center">
                <span className={cn(language === lang.code ? "font-medium" : "font-normal")}>{lang.name}</span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
