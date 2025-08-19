import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive"
}

export function Badge({ className = "", ...props }: BadgeProps) {
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${className}`} {...props} />
}

