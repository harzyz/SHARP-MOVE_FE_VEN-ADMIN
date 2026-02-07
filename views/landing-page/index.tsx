"use client";

import { HeroHeader } from "./hero-header";
import { HowItWorks } from "./how-it-works";
import { KeyFeatures } from "./key-features";
import { PopularRestaurants } from "./popular-restaurants";
import { MobileAppPromotion } from "./mobile-app-promotion";
import { RiderPromotion } from "./rider-promotion";
import { RestaurantPartnership } from "./restaurant-partnership";
import { Footer } from "./footer";
import { PersistentCta } from "./persistent-cta";
import { cn } from "@/lib/utils";

export interface LandingPageProps {
  /** Current location for header dropdown */
  location?: string;
  /** Called when user changes location in header */
  onLocationChange?: (value: string) => void;
  /** Show sticky download bar at bottom */
  showDownloadBar?: boolean;
  /** Show fixed Order Now button */
  showOrderButton?: boolean;
  /** Root class name */
  className?: string;
}

export function LandingPage({
  location = "",
  onLocationChange,
  showDownloadBar = false, // No app yet – set to true when app is ready
  showOrderButton = true,
  className,
}: LandingPageProps) {
  return (
    <div
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      <HeroHeader location={location} onLocationChange={onLocationChange} />
      <main>
        <HowItWorks />
        <KeyFeatures />
        <PopularRestaurants />
        <MobileAppPromotion />
        <RiderPromotion />
        <RestaurantPartnership />
        <Footer />
      </main>
      <PersistentCta
        showDownloadBar={showDownloadBar}
        showOrderButton={showOrderButton}
      />

      {/* Spacer so content isn't hidden behind sticky download bar */}
      {(showDownloadBar || showOrderButton) && (
        <div className="h-20 shrink-0 sm:h-16" aria-hidden />
      )}
    </div>
  );
}
