import { AdminShell } from "@/components/admin/admin-shell"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { InfluencersSection } from "@/components/admin/influencers"
import { ClientsSection } from "@/components/admin/clients"
import { CampaignsSection } from "@/components/admin/campaigns"
import { VerificationQueue } from "@/components/admin/verification-queue"
import { PaymentsSection } from "@/components/admin/payments"
import { ReportsSection } from "@/components/admin/reports"
import { DisputesSection } from "@/components/admin/disputes"
import { SettingsSection } from "@/components/admin/settings"
import { SystemLogsSection } from "@/components/admin/system-logs"
import { NotificationsSection } from "@/components/admin/notifications"
import { SystemHealthSection } from "@/components/admin/system-health"

export default function AdminPage() {
  return (
    <AdminShell>
      <section id="overview" className="scroll-mt-24">
        <AdminDashboard />
      </section>

      <div className="h-8" />

      <section id="influencers" className="scroll-mt-24">
        <InfluencersSection />
      </section>

      <div className="h-8" />

      <section id="clients" className="scroll-mt-24">
        <ClientsSection />
      </section>

      <div className="h-8" />

      <section id="campaigns" className="scroll-mt-24">
        <CampaignsSection />
      </section>

      <div className="h-8" />

      <section id="verification" className="scroll-mt-24">
        <VerificationQueue />
      </section>

      <div className="h-8" />

      <section id="payments" className="scroll-mt-24">
        <PaymentsSection />
      </section>

      <div className="h-8" />

      <section id="reports" className="scroll-mt-24">
        <ReportsSection />
      </section>

      <div className="h-8" />

      <section id="disputes" className="scroll-mt-24">
        <DisputesSection />
      </section>

      <div className="h-8" />

      <section id="settings" className="scroll-mt-24">
        <SettingsSection />
      </section>

      <div className="h-8" />

      <section id="system-logs" className="scroll-mt-24">
        <SystemLogsSection />
      </section>

      <div className="h-8" />

      <section id="notifications" className="scroll-mt-24">
        <NotificationsSection />
      </section>

      <div className="h-8" />

      <section id="system-health" className="scroll-mt-24">
        <SystemHealthSection />
      </section>
    </AdminShell>
  )
}
