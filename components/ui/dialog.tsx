"use client"

import * as React from "react"

export function Dialog({ open, onOpenChange, children }: { open?: boolean; onOpenChange?: (o: boolean) => void; children: React.ReactNode }) {
  return <div data-dialog-open={open ? "true" : "false"}>{children}</div>
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  return <>{children}</>
}

export function DialogContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>
}

