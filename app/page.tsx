'use client';

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import TrackingSection from "@/components/TrackingSection";
import GrupSection from "@/components/GroupSection";
import CabangSection from "@/components/CabangSection";
import HubungiKamiSection from "@/components/HubungiKamiSection";
import CostumerSection from "@/components/OurCostumerSection";
import Footer from "@/components/Footer";

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <>
      {!isFooterVisible && <Navbar />}

      <main className="bg-blue-900">
        <TrackingSection />
        <GrupSection />
        <CabangSection />
        <HubungiKamiSection />
        <CostumerSection />
      </main>

      {/* Ref dipasang di Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
}
