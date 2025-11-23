export const apiClient = {
  async getCampaigns() {
    const response = await fetch("/api/campaigns")
    return response.json()
  },

  async getCampaign(id: number) {
    const response = await fetch(`/api/campaigns?id=${id}`)
    return response.json()
  },

  async createCampaign(data: any) {
    const response = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async getApplications(campaignId: number) {
    const response = await fetch(`/api/applications?campaignId=${campaignId}`)
    return response.json()
  },

  async createApplication(data: any) {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async updateApplication(id: number, status: string) {
    const response = await fetch("/api/applications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    return response.json()
  },

  async getUploads(applicationId: number) {
    const response = await fetch(`/api/uploads?applicationId=${applicationId}`)
    return response.json()
  },

  async createUpload(data: any) {
    const response = await fetch("/api/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async updateUpload(id: number, status: string) {
    const response = await fetch("/api/uploads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    return response.json()
  },

  async getPayments(influencerId?: number) {
    const url = influencerId ? `/api/payments?influencerId=${influencerId}` : "/api/payments"
    const response = await fetch(url)
    return response.json()
  },

  async createPayment(data: any) {
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async getUsers(role?: string) {
    const url = role ? `/api/users?role=${role}` : "/api/users"
    const response = await fetch(url)
    return response.json()
  },
}
