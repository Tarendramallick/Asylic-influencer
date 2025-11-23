import { ClientShell } from "@/components/client/client-shell"
import { SettingsView } from "@/components/client/settings"

export default function ClientSettingsPage() {
  return (
    <ClientShell>
      <SettingsView />
    </ClientShell>
  )
}
