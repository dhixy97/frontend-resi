import axios, { AxiosError } from "axios";

const API = process.env.NEXT_PUBLIC_API_URL

export async function getProvinces() {
  const res = await axios.get(`/api/wilayah/provinces`);
  return res.data;
}

export async function getCities(provinceCode: string) {
  const res = await axios.get(
    `api/wilayah/cities/${encodeURIComponent(provinceCode)}`
  );
  return res.data;
}

export async function getDistricts(provinceCode: string, cityName: string) {
  const res = await axios.get(
    `/api/wilayah/districts/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}`
  );
  return res.data;
}

export async function getVillages(
  provinceCode: string,
  cityName: string,
  districtName: string
) {
  const res = await axios.get(
    `/api/wilayah/villages/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}`
  );
  return res.data;
}

export async function getPostalCode(
  provinceCode: string,
  cityName: string,
  districtName: string,
  villageName: string
) {
  try {
    const res = await axios.get(
      `/api/wilayah/postal-code/${provinceCode}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(villageName)}`
    );
    return res.data.kodepos || "";
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      return ""; // Tidak ketemu = anggap kosong
    }
    throw err; // Error lain tetap dilempar
  }
}


