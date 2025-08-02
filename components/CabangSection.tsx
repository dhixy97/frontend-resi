import cabangList from "@/app/data/cabang";
import CabangCard from "./CabangCard";

export default function CabangSection() {
  return (
    <section id="cabang" className="w-full bg-blue-900 text-white">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 px-6 md:px-12 py-16 rounded shadow-lg overflow-hidden">
        <div className="w-full h-[1px] bg-gray-400 mb-20" />
        <div className="max-w-4xl mx-auto bg-white text-gray-800 px-6 py-12 rounded shadow-lg text-center">
          {/* Header */}
          <h2 className="text-3xl font-bold">Cabang Dakota</h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-blue-500 to-red-500 mx-auto my-4" />
          <p className="text-gray-600 mb-8">Klik dan pilih kota anda untuk menemukan lokasi kami yang terdekat</p>

          {/* Input kota (nonaktifkan filter dulu jika belum dibuat) */}
          <input type="text" placeholder="KLIK DAN PILIH KOTA ANDA DISINI" className="w-full border p-3 rounded text-sm mb-6" />

          {/* Subjudul */}
          <p className="text-sm text-gray-500 mb-4">Daftar Cabang Baru dan Agen Baru Dakota</p>

          {/* Card List */}
          <div className="flex flex-col items-center gap-6">
            {cabangList.map((cabang, idx) => (
              <CabangCard key={idx} {...cabang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
