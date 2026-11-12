import { HeroSection } from "@/components/hero-section"
import { VideoSection } from "@/components/video-section"
import { GallerySection } from "@/components/gallery-section"
import { InstagramSection } from "@/components/instagram-section"
import { MobileBuyBar } from "@/components/mobile-buy-bar"
import { SpotifySection } from "@/components/spotify-section"
import { TicketsSection } from "@/components/tickets-section"
import { VipSection } from "@/components/vip-section"
import { SiteFooter } from "@/components/site-footer"
import { ChatWidget } from "@/components/chat-widget"
import { EVENT } from "@/lib/event"

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <HeroSection />
      <VideoSection />
      <TicketsSection />
      <VipSection />
      <GallerySection />
      <InstagramSection />
      <SpotifySection />
      <SiteFooter />
      <MobileBuyBar />
      {EVENT.chatVisible && <ChatWidget />}
    </main>
  )
}
