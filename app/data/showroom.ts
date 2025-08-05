export interface Cabang {
  kota: string;
  nama: string;
  alamat: string;
  telepon: string;
}

 const cabangList: Cabang[] = [
  {
    kota: "YOGYAKARTA",
    nama: "JBA INDONESIA LEASING",
    alamat: "Jl. Kaliurang No.5 No.KM.8, Tambakan, Sinduharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581",
    telepon: "0821-89195668",
  },
  {
    kota: "PEKANBARU",
    nama: "JBA INDONESIA LEASING",
    alamat: " Jl. Soekarno - Hatta, Labuh Baru Tim., Kec. Payung Sekaki, Kota Pekanbaru, Riau 28292",
    telepon: "0821-89195668",
  },
];

export default cabangList