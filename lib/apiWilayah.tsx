import axios, { AxiosError } from "axios";

const API_KEY = process.env.API_KEY || "1234567890abcdef"; // pastikan diset di .env

const axiosWithKey = axios.create({
  headers: {
    'x-api-key': API_KEY,
  },
});

// ✅ Ambil semua provinsi
export async function getProvinces() {
  const res = await axiosWithKey.get(`/api/wilayah/provinces`);
  return res.data;
}

// ✅ Ambil semua kota berdasarkan kode provinsi
export async function getCities(provinceCode: string) {
  const res = await axiosWithKey.get(
    `/api/wilayah/cities/${encodeURIComponent(provinceCode)}`
  );
  return res.data;
}

// ✅ Ambil semua kecamatan berdasarkan provinsi dan kota
export async function getDistricts(provinceCode: string, cityName: string) {
  const res = await axiosWithKey.get(
    `/api/wilayah/districts/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}`
  );
  return res.data;
}

// ✅ Ambil semua kelurahan berdasarkan provinsi, kota, kecamatan
export async function getVillages(
  provinceCode: string,
  cityName: string,
  districtName: string
) {
  const res = await axiosWithKey.get(
    `/api/wilayah/villages/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}`
  );
  return res.data;
}

// ✅ Ambil kode pos berdasarkan lokasi lengkap
export async function getPostalCode(
  provinceCode: string,
  cityName: string,
  districtName: string,
  villageName: string
) {
  try {
    const res = await axiosWithKey.get(
      `/api/wilayah/postal-code/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(villageName)}`
    );
    return res.data.kodepos || "";
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      return ""; // Tidak ketemu = anggap kosong
    }
    throw err; // Error lain tetap dilempar
  }
}
