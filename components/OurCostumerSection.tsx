import Image from "next/image";

export default function CostumerSection() {
  return (
    <section id="costumer" className="w-full bg-blue-900 ">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 px-6 md:px-12 py-16 rounded shadow-lg overflow-hidden">
        <section id="customer" className="w-full bg-white px-4 py-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Judul */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Customer</h2>

            {/* Garis gradasi */}
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mb-10" />

            {/* Gambar berisi banyak logo */}
            <Image
              src="https://www.dakotacargo.co.id/images/customer.png" // Ganti sesuai path kamu
              alt="Logo Customer Dakota"
              width={1000}
              height={400}
              className="mx-auto max-w-full h-auto"
            />
          </div>
        </section>
      </div>
    </section>
  );
}
