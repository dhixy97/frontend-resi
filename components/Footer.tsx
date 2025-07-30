import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white px-4 ">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 rounded shadow-lg overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-sm md:text-base">
          {/* Kolom Kiri: Deskripsi */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dakota Group</h3>
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-200">
              Pada dasarnya kita menjalankan bisnis di freight forwarding / logistik lebih baik hari ini dikenal, bukan hanya kegiatan rutin seperti yang sudah ada yang memindahkan barang dari satu tempat ke tempat lain, tapi kami menjamin
              bahwa barang-barang konsumen sampai pada hal yang benar di tempat yang tepat dan dengan persyaratan yang sesuai
            </blockquote>
          </div>

          {/* Kolom Kanan: Kontak & Sosial Media */}
          <div>
            <div className="mb-6">
              <p>
                <span className="font-semibold">Address:</span> Jl. Wibawa Mukti II No.8 Jati Asih, Bekasi, Indonesia
              </p>
              <p>
                <span className="font-semibold">Phone:</span> (021)8224548
              </p>
              <p>
                <span className="font-semibold">Whatsapp:</span> +6282393450867
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:cs@dakotacargo.co.id" className="underline">
                  cs@dakotacargo.co.id
                </a>
              </p>
            </div>

            <div>
              <p className="font-semibold mb-2">Follow Us</p>
              <div className="flex space-x-4 text-xl">
                <a href="#" className="hover:text-gray-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bawah: Link tambahan */}
        <div className="border-t border-gray-500 mt-12 pt-6 text-xs md:text-sm text-center text-gray-300 space-x-4 flex flex-wrap justify-center gap-2">
          <a href="#" className="hover:underline">
            Pedoman Pengiriman
          </a>
          <a href="#" className="hover:underline">
            Pedoman Klaim Asuransi
          </a>
          <a href="#" className="hover:underline">
            Syarat & Ketentuan
          </a>
          <a href="#" className="hover:underline">
            Company Profile
          </a>
          <a href="#" className="hover:underline">
            Ketentuan & Kebijakan Privasi
          </a>
          <a href="#" className="hover:underline">
            Kodepos
          </a>
          <a href="#" className="hover:underline">
            API
          </a>
        </div>
      </div>
    </footer>
  );
}
