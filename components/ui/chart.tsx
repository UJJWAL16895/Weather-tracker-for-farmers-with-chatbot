"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {}
    Object.entries(config).forEach(([key, value]) => {
      vars[`--color-${key}`] = value.color
    })
    return vars
  }, [config])

  return (
    <div className={cn("recharts-wrapper", className)} style={cssVars} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ChartTooltip = RechartsPrimitive.Tooltip

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: {
      [key: string]: any
    }
  }>
  label?: string
}

export function ChartTooltipContent({ active, payload, label, className, ...props }: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("text-sm", className)} {...props}>
      <p className="font-medium mb-2">{label}</p>
      <div className="flex flex-col gap-1">
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `var(--color-${item.name})` }} />
              <span>{item.name}</span>
            </div>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
