import * as React from "react"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Switch({ className = "", ...props }: SwitchProps) {
  return <input type="checkbox" className={className} {...props} />
}

