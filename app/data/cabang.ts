export interface Cabang {
  kota: string;
  nama: string;
  alamat: string;
  telepon: string;
}

 const cabangList: Cabang[] = [
  {
    kota: "TANGSEL",
    nama: "TANGSEL AGEN",
    alamat: "Taman Tekno, Blok K3 No. 9, Setu, Tangerang Selatan, SETU. TANGERANG SELATAN",
    telepon: "021-12345678",
  },
  {
    kota: "KEDIRI",
    nama: "KEDIRI KOTA AGEN",
    alamat: "Ruko Tosaren, Jl. Kapten Tendean No. 32, Tosaren, Kec. Pesantren, Kota Kediri - Jawa Timur",
    telepon: "0354-87654321",
  },
  {
    kota: "DENPASAR",
    nama: "DENPASAR AGEN",
    alamat: "Jl. Gatot Subroto No. 88, Denpasar, Bali",
    telepon: "0361-123456",
  },
  {
    kota: "MAKASSAR",
    nama: "MAKASSAR AGEN",
    alamat: "Jl. MAKASSAR",
    telepon: "0852-4016-9659",
  },
];

export default cabangList