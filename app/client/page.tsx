import { ClientShell } from "@/components/client/client-shell"
import { ClientDashboard } from "@/components/client/client-dashboard"

export default function ClientPage() {
  return (
    <ClientShell>
      <ClientDashboard />
    </ClientShell>
  )
}
