import { ClientShell } from "@/components/client/client-shell"
import { CampaignsList } from "@/components/client/campaigns-list"

export default function ClientCampaignsPage() {
  return (
    <ClientShell>
      <CampaignsList />
    </ClientShell>
  )
}
