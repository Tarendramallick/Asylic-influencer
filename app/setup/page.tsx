"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const createAdmin = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/setup/admin", {
        method: "POST",
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to connect to server",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>Create the default admin account for asylic.biz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click the button below to create an admin account with the following credentials:
            </p>
            <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
              <div>
                <span className="font-medium">Email:</span> admin@asylic.biz
              </div>
              <div>
                <span className="font-medium">Password:</span> Admin@123456
              </div>
            </div>
          </div>

          <Button onClick={createAdmin} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Admin...
              </>
            ) : (
              "Create Admin Account"
            )}
          </Button>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <div className="flex items-start gap-2">
                {result.success ? <CheckCircle className="h-4 w-4 mt-0.5" /> : <XCircle className="h-4 w-4 mt-0.5" />}
                <div className="flex-1">
                  <AlertDescription>
                    <div className="font-medium mb-2">{result.message}</div>
                    {result.success && result.credentials && (
                      <div className="text-sm space-y-1">
                        <div>Email: {result.credentials.email}</div>
                        <div>Password: {result.credentials.password}</div>
                        <div className="text-xs text-muted-foreground mt-2">{result.credentials.note}</div>
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}

          {result?.success && (
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => (window.location.href = "/login?role=admin")}
            >
              Go to Admin Login
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
