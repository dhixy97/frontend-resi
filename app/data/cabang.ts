export interface Cabang {
  kota: string;
  nama: string;
  alamat: string;
  telepon: string;
}

 const cabangList: Cabang[] = [
  {
    kota: "YOGYAKARTA",
    nama: "YOGYAKARTA CABANG",
    alamat: "Jl. Sugeng Jeroni No.79, Patangpuluhan, Wirobrajan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55251",
    telepon: "0821-89195668",
  },
  {
    kota: "PEKANBARU",
    nama: "PEKANBARU CABANG",
    alamat: " Jl. Soekarno - Hatta, Sidomulyo Bar., Kec. Marpoyan Damai, Kota Pekanbaru, Riau 28294",
    telepon: "0821-89195668",
  },
];

export default cabangList