'use client';

import Image from 'next/image';
import Barcode from 'react-barcode';

interface ResiLabelProps {
  nomorResi: string;
  pengirim: string;
  alamatPengirim: string;
  penerima: string;
  alamatPenerima: string;
  jumlahKoli: number;
  beratAsli: string;
  isiKiriman: string;
  keterangan: string;
  jenisHarga: string;
  cabang: string;
  teleponCabang: string;
  alamatCabang: string;
}

export default function ResiLabel({
  nomorResi,
  pengirim,
  alamatPengirim,
  penerima,
  alamatPenerima,
  jumlahKoli,
  beratAsli,
  isiKiriman,
  keterangan,
  jenisHarga,
  cabang,
  teleponCabang,
  alamatCabang,
}: ResiLabelProps) {
  return (
    <div className="p-4 border w-[600px] mx-auto bg-white text-black">
      <div className="flex justify-between items-start mb-4">
        <Image src="/main.png" alt="Logo" width={120} height={50} />
        <div className="text-right">
          <div className="text-sm font-bold text-black">[ NOMOR RESI PENGIRIMAN ]</div>
          <Barcode value={nomorResi} format="CODE128" height={50} displayValue={false} />
          <div className="text-lg font-bold mt-2">{nomorResi}</div>
        </div>
      </div>

      <div className="text-sm">
        <p>
          <strong>DAKOTA BUANA SEMESTA</strong><br />
          {cabang}<br />
          {teleponCabang}<br />
          {alamatCabang}
        </p>

        <hr className="my-2" />

        <p>
          <strong>[ PENGIRIM: ]</strong><br />
          {pengirim}<br />
          {alamatPengirim}
        </p>

        <p className="mt-2">
          <strong>[ PENERIMA: ]</strong><br />
          {penerima}<br />
          {alamatPenerima}
        </p>

        <div className="grid grid-cols-2 mt-4 text-sm border border-black">
          <div className="p-2 border-r border-black">
            <p>Jumlah Koli: {jumlahKoli}</p>
          </div>
          <div className="p-2">
            <p>Berat Asli: {beratAsli}</p>
          </div>
        </div>

        <p className="mt-2">
          Isi Kiriman: {isiKiriman}<br />
          Keterangan: {keterangan}<br />
          Jenis Harga: {jenisHarga}
        </p>

        <hr className="my-2" />

        <p className="text-xs">
          Dengan diterbitkannya resi ini, pelanggan telah menyetujui syarat dan ketentuan yang berlaku di DAKOTA CARGO.
        </p>
      </div>
    </div>
  );
}
