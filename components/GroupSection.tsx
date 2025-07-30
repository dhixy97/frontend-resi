import Image from "next/image";
import GroupCards from "./GroupCard";
export default function GrupSection() {
  return (
    <>
      {/* Garis pembatas section */}
      <section id="group" className="w-full bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto bg-white text-gray-800 px-6 md:px-12 py-16 rounded shadow-lg overflow-hidden">
          <div className="w-full h-[1px] bg-gray-400 mb-20" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Kiri: Teks */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">SELAMAT DATANG DI DAKOTA GROUP</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mb-6 mx-auto md:mx-0" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pertumbuhan dan Perkembangan perekonomian suatu negara sangat membutuhkan sarana dan prasarana transportasi yang handal, dimana barang-barang hasil produksi perlu untuk didistribusikan ke seluruh pelosok negeri dan dunia.
                Guna dikonsumsi oleh seluruh masyarakat pengguna barang dan jasa sehingga hasil produksi barang dan jasa tersebut memiliki nilai ekonomis.
              </p>
              <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium">Selengkapnya ...</button>
            </div>

            {/* Kanan: Gambar */}
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://www.dakotacargo.co.id/images/pic01.jpg" // ganti dengan logo kamu
                alt="Dakota Group Logo"
                width={250}
                height={250}
                className="rounded-full border shadow-md"
              />
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-400 mt-10" />
            <GroupCards />
        </div>
      </section>
    </>
  );
}
