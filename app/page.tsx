"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Target, BarChart3, Smartphone, Users, Lock, TrendingUp } from "lucide-react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import TrustedCarousel from "@/components/TrustedCarousel"
import SelectedWorkHeader from "@/components/SelectedWorkSection"
import { PushWord } from "@/components/PushWord"
import ScrollCard from "@/components/ScrollCard"
import GetADemo from "@/components/Demo"
import FeatureScroller from "@/components/PhantomScroller"
import Footer from "@/components/Footer"
import HorizontalScroll from "@/components/HorizontalScroll"
import ReelsHorizontalScroll from "@/components/HorizontalScroll"
import FeatureCardScroller from "@/components/PhantomScroller"
import MetaMaskHeroMorph from "@/components/CardAnimation"

export default function HomePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[#FF67AA] pt-28">
      {/* Navigation */}
      <Header />
      <HeroSection />
      <TrustedCarousel />
      <ReelsHorizontalScroll />
      <FeatureCardScroller />
      <MetaMaskHeroMorph />
      <div>
      <ScrollCard
        index={0}
        total={4}
        bg="#ff521a"
        title="Find, vet, and connect with the right creators for your brand" 
      />
      <ScrollCard
        index={0}
        total={4}
        bg="#c08cf2"
        title="Keep every collaboration organized from start to finish" 
      />
      <ScrollCard
        index={0}
        total={4}
        bg="#cfc4af"
        title="Auto-track influencer campaign metrics & content" 
      />
      <ScrollCard
        index={0}
        total={4}
        bg="#ffbe99"
        title="Send fast, secure payments to creators worldwide" 
      />
      <ScrollCard
        index={0}
        total={4}
        bg="#ffa3d1"
        title="it's time to upgrade to Asylic" 
      />
      </div>
      <GetADemo />
      {/* <div className="min-h-[100vh] w-[50%] flex flex-col font-anton justify-center items-center bg-black">
      <PushWord text="TARENDRA" fontSize={80} color="#FF0055" letterSpacing={0} />
      <PushWord text="MALLICK" fontSize={80} color="white" letterSpacing={10}  />
        <PushWord text="TARENDRA" fontSize={50} color="#FF0055" letterSpacing={15} delayStep={0} />
        <PushWord text="MALLICK" fontSize={80} color="white" letterSpacing={20} delayStep={0.01} />
      </div> */}
      <Footer />
    </main>
  )
}
