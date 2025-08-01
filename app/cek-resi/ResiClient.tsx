'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import ResiLabel from "@/components/Resilabel";
import Footer from "@/components/Footer";
import axios from "axios";

interface PosisiItem {
  tanggal: string;
  keterangan: string;
  status: string;
}

interface Cabang {
  nama: string;
  alamat: string;
  noTelp: string;
}

interface Wilayah {
  provinsi: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
  kodepos: string;
}

interface ResiData {
  resi: string;
  nama: string;
  alamat: string;
  wilayah: Wilayah;
  jumlah: number;
  berat: number;
  namaBarang: string;
  keterangan: string;
  jenis: string;
  cabang: Cabang;
  posisiBarang: PosisiItem[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function formatTanggal(tanggalStr: string): string {
  const d = new Date(tanggalStr);
  const bulan = String(d.getMonth() + 1).padStart(2, "0");
  const tanggal = String(d.getDate()).padStart(2, "0");
  const tahun = d.getFullYear();
  const jam = String(d.getHours()).padStart(2, "0");
  const menit = String(d.getMinutes()).padStart(2, "0");
  const detik = String(d.getSeconds()).padStart(2, "0");
  return `${bulan}/${tanggal}/${tahun} [ ${jam}:${menit}:${detik} ]`;
}

export default function ResiClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nomorResi = searchParams.get("resi") || searchParams.get("nomor") || "";

  const [dataResi, setDataResi] = useState<ResiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!nomorResi) return;

    const fetchResi = async () => {
      try {
        const res = await axios.get<ResiData>(`${apiUrl}/api/resi/${nomorResi}`);
        setDataResi(res.data);
      } catch (err) {
        console.error(err);
        setError("Nomor resi tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchResi();
  }, [nomorResi]);

  const formatAlamatLengkap = (): string => {
    if (!dataResi) return "-";
    const { alamat, wilayah } = dataResi;
    return `${alamat}, ${wilayah.provinsi}, ${wilayah.kota}, ${wilayah.kecamatan}, ${wilayah.kelurahan}, ${wilayah.kodepos}`;
  };

  const formatStatus = (status : string) => {
  switch (status) {
    case 'Pending':
      return 'Menunggu';
    case 'Proses':
      return 'Sedang Diproses';
    case 'Diterima':
      return 'Barang Diterima';
    default:
      return status;
  }
};

  return (
    <>
      <div className="w-full pt-10 bg-blue-900 min-h-screen pb-10">
        <div className="max-w-5xl mx-auto text-white rounded shadow-lg overflow-hidden">
          <h2 className="text-center text-2xl font-bold mb-4">INFORMASI PERJALANAN PAKET KIRIMAN</h2>
          <h2 className="text-center text-xl mb-6 underline break-all">{nomorResi}</h2>
        </div>

        <div className="max-w-5xl bg-white mx-auto text-black rounded shadow-lg overflow-hidden mt-6">
          <Image src="/img/pic.jpg" alt="Gambar Header" width={1200} height={200} className="w-full h-auto object-cover" />

          <div className="px-4 py-6 text-center">
            <p className="text-md mb-2">Terima kasih telah menggunakan jasa layanan kami, berikut adalah informasi perjalanan dan posisi terakhir paket kiriman anda</p>
            <p className="text-md mb-4">
              PAKET KIRIMAN DENGAN NOMOR [ <strong>{nomorResi}</strong> ]
            </p>

            {loading ? (
              <p className="text-sm text-gray-600 mb-6">Memuat data...</p>
            ) : error || !dataResi ? (
              <p className="text-sm text-gray-600 mb-6">Maaf, nomor resi tidak ditemukan. Pastikan nomor resi sudah benar.</p>
            ) : (
              <>
                <div className="text-left mt-4">
                  <ResiLabel
                    nomorResi={dataResi.resi}
                    pengirim={dataResi.cabang?.nama ?? "-"}
                    alamatPengirim={dataResi.cabang?.alamat ?? "-"}
                    penerima={dataResi.nama}
                    alamatPenerima={formatAlamatLengkap()}
                    jumlahKoli={dataResi.jumlah}
                    beratAsli={`${dataResi.berat} kg`}
                    isiKiriman={dataResi.namaBarang}
                    keterangan={dataResi.keterangan}
                    jenisHarga={dataResi.jenis}
                    cabang={dataResi.cabang?.nama ?? "-"}
                    teleponCabang={dataResi.cabang?.noTelp ?? "-"}
                    alamatCabang={dataResi.cabang?.alamat ?? "-"}
                  />
                </div>

                <div className="mt-10 w-full rounded border shadow">
                  <table className="table-fixed w-full text-sm text-center border border-gray-300">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-2 py-2 border w-1/3">TANGGAL</th>
                        <th className="px-2 py-2 border w-1/3">KETERANGAN</th>
                        <th className="px-2 py-2 border w-1/3">POSISI BARANG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataResi.posisiBarang?.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                          <td className="px-2 py-2 border break-words">{formatTanggal(item.tanggal)}</td>
                          <td className="px-2 py-2 border break-words">{item.keterangan}</td>
                          <td className="px-2 py-2 border break-words">{formatStatus(item.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <button onClick={() => router.push("/")} className="mt-8 px-6 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">
              Kembali
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}