'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import Navbar from '@/components/Navbar';
import TrackingSection from '@/components/TrackingSection';
import GrupSection from '@/components/GroupSection';
import CabangSection from '@/components/CabangSection';
import HubungiKamiSection from '@/components/HubungiKamiSection';
import CostumerSection from '@/components/OurCostumerSection';
import Footer from '@/components/Footer';

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowModal(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <>
      <div className={`relative ${showModal ? 'overflow-hidden' : ''}`}>
        {/* Blur background saat modal muncul */}
        <div
          className={`transition-all duration-300 ${
            showModal ? 'filter blur-sm brightness-[0.9]' : ''
          }`}
        >
          {!showModal && !isFooterVisible && <Navbar />}

          <main className="bg-blue-900">
            <TrackingSection />
            <GrupSection />
            <CabangSection />
            <HubungiKamiSection />
            <CostumerSection />
          </main>

          <div ref={footerRef}>
            <Footer />
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-[1040px] mx-4"
                initial={{ scale: 0.8, opacity: 0, y: -30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Tombol Close X pojok kanan atas */}
                <button
                  className="absolute top-3 right-3 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
                  onClick={() => setShowModal(false)}
                  aria-label="Tutup modal"
                >
                  ✕
                </button>

                {/* Gambar */}
                <Image
                  src="/img/penipuan.png"
                  alt="Peringatan Penipuan"
                  width={1040}
                  height={388}
                  priority
                  className="w-full h-auto"
                />

                {/* Tombol Tutup bawah tengah */}
                <div className="flex justify-center py-4 bg-white">
                  <button
                    className="px-6 py-2 bg-red-700 text-white font-semibold rounded hover:bg-red-600 transition"
                    onClick={() => setShowModal(false)}
                  >
                    TUTUP
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
