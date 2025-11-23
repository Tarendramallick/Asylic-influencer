"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

function Avatar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted", className)} {...props} />
  )
}

function AvatarImage({ className, alt, src }: { className?: string; alt: string; src?: string }) {
  return <img className={cn("aspect-square h-full w-full", className)} alt={alt} src={src || "/placeholder.svg"} />
}

function AvatarFallback({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center text-xs font-medium", className)}>
      {children}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
