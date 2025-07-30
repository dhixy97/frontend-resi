"use client";
import Image from "next/image";

const groupData = [
  {
    name: "PT. DAKOTA BUANA SEMESTA",
    desc: "Melayani kebutuhan logistik barang yang berkesinambungan ke seluruh Indonesia dengan jaminan bahwa barang tepat berada di tempat yang tepat dan pada saat yang tepat.",
    img: "/img/icon02.png", // ganti path sesuai logo kamu
  },
  {
    name: "PT. DAKOTA LOGISTIK INDONESIA",
    desc: "Melaksanakan pengiriman yang sesuai yaitu pada tempat dan waktu yang tepat serta kondisi yang diinginkan.",
    img: "/img/icon01.png",
  },
  {
    name: "PT. DAKOTA LINTAS BUANA",
    desc: "Dengan meningkatnya bisnis E-Commerce, Dakota melihat peluang besar dan memberikan solusi logistik yang handal.",
    img: "/img/icon03.png",
  },
];

export default function GroupCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
      {groupData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between items-center  border-gray-300 rounded-lg shadow px-6 py-8 min-h-[420px]"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-blue-800 font-bold text-lg mb-2 text-center">
              {item.name}
            </h3>
            <p className="text-gray-600 text-sm text-center">{item.desc}</p>
          </div>
          <button className="mt-6 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
            Selengkapnya
          </button>
        </div>
      ))}
    </div>
  );
}
