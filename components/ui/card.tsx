// components/ui/card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("glass-panel rounded-2xl p-6 text-white", className)} {...props} />
))
Card.displayName = "Card"