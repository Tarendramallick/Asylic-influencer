import { ClientShell } from "@/components/client/client-shell"
import { PaymentsView } from "@/components/client/payments"

export default function ClientPaymentsPage() {
  return (
    <ClientShell>
      <PaymentsView />
    </ClientShell>
  )
}
