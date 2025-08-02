'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CekTarif from './CekTarif';

const bannerImages = [
  '/img/01.jpg',
  '/img/02.jpeg',
  '/img/03.jpg',
  '/img/04.jpg',
  '/img/05.jpg',
];

export default function TrackingSection() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [resi, setResi] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCari = () => {
    if (!resi.trim()) {
      setError('Nomor resi tidak boleh kosong.');
      return;
    }

    router.push(`/cek-resi?resi=${encodeURIComponent(resi.trim())}`);
  };

  return (
    <section className="w-full pt-20 bg-blue-900 text-white" id="tarif">
      {/* Form Pelacakan */}
      <div className="max-w-5xl mx-auto bg-[#a00c00] text-white py-10 rounded shadow-lg overflow-hidden">
        <div className="px-4">
          <h2 className="text-center text-3xl font-bold mb-6">✿ PELACAKAN KIRIMAN ✿</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <input
              type="text"
              value={resi}
              onChange={(e) => {
                setResi(e.target.value);
                setError('');
              }}
              placeholder="Masukkan No Resi kiriman anda"
              className="w-full md:w-2/3 px-4 py-2 text-white bg-blue-900 border border-white rounded"
            />
            <button
              onClick={handleCari}
              className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded text-white"
            >
              Cari
            </button>
          </div>

          {error && <p className="text-center text-sm text-yellow-300 mb-2">{error}</p>}

          <p className="text-center text-sm mb-8">
            Untuk menghindari penipuan, pastikan nomor resi yang anda terima
            terdaftar dalam sistem kami, serta dapat dilacak posisi dari barang kiriman Anda.
          </p>
        </div>
      </div>

      {/* Banner Slide */}
      <div className="max-w-5xl mx-auto bg-white rounded shadow-lg overflow-hidden">
        <Image
          key={currentIndex}
          src={bannerImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          width={1000}
          height={400}
          className={`w-full h-auto transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="w-full h-[1px] bg-gray-400 mt-10" />
      </div>

      {/* Komponen Cek Tarif */}
      <div className="max-w-5xl mx-auto bg-white rounded shadow-lg overflow-hidden pb-30">
        <CekTarif />
      </div>
    </section>
  );
}
