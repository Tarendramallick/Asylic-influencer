import { ClientShell } from "@/components/client/client-shell"
import { ApplicationsTable } from "@/components/client/applications"

export default function ClientApplicationsPage() {
  return (
    <ClientShell>
      <ApplicationsTable />
    </ClientShell>
  )
}
