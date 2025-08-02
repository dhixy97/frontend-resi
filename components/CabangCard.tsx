import { FiPhone } from "react-icons/fi";
import { Cabang } from "@/app/data/cabang";

export default function CabangCard({ nama, alamat, telepon }: Cabang) {
  return (
    <div className="w-full md:w-3/4 border-b pb-4">
      <h3 className="text-lg font-semibold text-center">{nama}</h3>
      <p className="text-sm text-gray-600 text-center">{alamat}</p>
      <div className="flex items-center justify-center mt-2 text-sm ">
        <FiPhone className="mx-2"></FiPhone>
        <span>{telepon}</span>
      </div>
    </div>
  );
}
