'use client';

import type React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Instagram } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const { login } = useAuth();
  const { toast } = useToast();

  const [role, setRole] = useState<string>(roleParam || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [testAccessToken, setTestAccessToken] = useState("");
  const [showTestTokenForm, setShowTestTokenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isInfluencer = role === "influencer";
  const isBrand = role === "brand";

  // Animated Background Colors
  const bgColors = ["#5B6EE1", "#6C7AF2", "#2C8C8C", "#8B5CF6", "#3B82F6"];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgColors.length);
    }, 8000); // slow 8s animation
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstagramLogin = () => {
    window.location.href = "/api/auth/instagram";
  };

  const handleTestUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/instagram/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: testAccessToken }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Test user login failed");
      }
      const data = await response.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      toast({
        title: "Success",
        description: `Welcome ${data.user.username}! (Test User)`,
      });
      router.push("/influencer");
    } catch (error) {
      toast({
        title: "Test user login failed",
        description: error instanceof Error ? error.message : "Invalid access token",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Role selection page
  if (!role) {
    return (
      <motion.div
        animate={{ backgroundColor: bgColors[bgIndex] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-screen flex items-center justify-center px-4 py-16"
      >
        <div className="w-full relative h-full rounded-[32px] border-2 border-lime-300 max-w-8xl">
          {/* Header */}
          <div className="text-center flex justify-center mb-12 text-white">
            <h1 className="absolute 
              -top-12
              bg-lime-300 
              text-black 
              font-semibold 
              text-[40px]
              px-12
              py-4 
              rounded-full 
              hover:scale-105 
              transition-transform
              z-20">Welcome to Asylic</h1>
            <p className="mt-2 text-white/70">Choose how you want to continue</p>
            <button
            className="
              absolute 
              -bottom-7
              bg-lime-300 
              text-black 
              font-semibold 
              text-[15px]
              px-12
              py-4 
              rounded-full 
              hover:scale-105 
              transition-transform
              z-20
            "
            onClick={() => router.push("/")}
          >
             Back to Home
          </button>
          </div>

          {/* Role Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            {/* Influencer */}
            <button
              onClick={() => setRole("influencer")}
              className="group relative w-[300px] aspect-[9/16] overflow-hidden rounded-3xl border border-white/20 shadow-2xl hover:scale-[1.03] transition-transform"
            >
              {/* VIDEO */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/demo.mp4"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-xl font-semibold text-white">
                  Influencer
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  Collaborate with brands & monetize your audience
                </p>

                <div className="mt-4 text-sm font-medium text-purple-400">
                  Continue →
                </div>
              </div>
            </button>

            {/* Brand */}
            <button
              onClick={() => setRole("brand")}
              className="group relative w-[300px] aspect-[9/16] overflow-hidden rounded-3xl border border-white/20 shadow-2xl hover:scale-[1.03] transition-transform"
            >
              {/* VIDEO */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/brand.mp4"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-xl font-semibold text-white">
                  Brand
                </h3>
                <p className="mt-1 text-sm text-white/80">
                  Launch campaigns & discover creators
                </p>

                <div className="mt-4 text-sm font-medium text-emerald-400">
                  Continue →
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <Button variant="ghost" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Login Form Page
  return (
    <motion.div
      animate={{ backgroundColor: bgColors[bgIndex] }}
      transition={{ duration: 8, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <Card className="w-full max-w-md bg-black/70 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl">
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 w-fit text-white"
            onClick={() => setRole("")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-2xl text-white">
            {isInfluencer ? "Influencer Login" : isBrand ? "Brand Login" : "Admin Login"}
          </CardTitle>
          <CardDescription className="text-white/70">
            {isInfluencer
              ? "Sign in to your creator account"
              : isBrand
              ? "Sign in to your brand account"
              : "Sign in to admin panel"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">

          {/* INFLUENCER – Instagram First */}
          {isInfluencer && (
            <div className="space-y-6">
              {/* Instagram CTA */}
              <Button
                onClick={handleInstagramLogin}
                disabled={isLoading}
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Continue with Instagram
              </Button>

              <p className="text-xs text-center text-white/70">
                Recommended for creators • Fast & secure
              </p>

              {/* Test User Card */}
              <div className="bg-black/60 border border-white/20 rounded-xl p-4 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTestTokenForm(!showTestTokenForm)}
                  className="w-full text-white"
                >
                  {showTestTokenForm ? "Hide Test Login" : "Login with Test Token"}
                </Button>

                {showTestTokenForm && (
                  <form onSubmit={handleTestUserLogin} className="space-y-3 mt-2">
                    <label className="text-sm font-medium text-white">Instagram Access Token</label>
                    <textarea
                      placeholder="Paste your test Instagram access token here"
                      value={testAccessToken}
                      onChange={(e) => setTestAccessToken(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm border border-white/20 rounded-md bg-black/50 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full h-10">
                      {isLoading ? "Logging in..." : "Login as Test User"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-black/70 text-white/70">
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* BRAND – Email-first */}
          {isBrand && (
            <div className="text-center mb-4 text-sm text-white/70">
              Sign in to manage your campaigns & creators
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleLogin} className="space-y-4 bg-black/60 border border-white/10 rounded-2xl p-6 shadow-md">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-purple-600 hover:bg-purple-700 shadow-md transition-transform transform hover:-translate-y-0.5 text-white font-semibold">
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="text-center text-sm mt-2 text-white/70">
            <span>Don't have an account? </span>
            <Link href="/signup" className="text-purple-400 hover:underline font-semibold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}