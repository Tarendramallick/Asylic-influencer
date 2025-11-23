export function Spinner() {
  return (
    <svg className="size-4 animate-spin text-muted-foreground" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
      <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  )
}
