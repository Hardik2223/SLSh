import * as React from "react"

export function Avatar({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 ${className}`} {...props} />
}

export function AvatarImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} />
}

export function AvatarFallback({ children }: { children?: React.ReactNode }) {
  return <span>{children}</span>
}

