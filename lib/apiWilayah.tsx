import axios, { AxiosError } from "axios";

const API = "https://c99ef390-2c84-4029-ba38-e0f4b87a4e0a-00-3sls943ziepcj.sisko.replit.dev:3000/api/wilayah"; // Ubah jika dihosting

export async function getProvinces() {
  const res = await axios.get(`${API}/provinces`);
  return res.data;
}

export async function getCities(provinceCode: string) {
  const res = await axios.get(
    `${API}/cities/${encodeURIComponent(provinceCode)}`
  );
  return res.data;
}

export async function getDistricts(provinceCode: string, cityName: string) {
  const res = await axios.get(
    `${API}/districts/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}`
  );
  return res.data;
}

export async function getVillages(
  provinceCode: string,
  cityName: string,
  districtName: string
) {
  const res = await axios.get(
    `${API}/villages/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}`
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
      `${API}/postal-code/${provinceCode}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(villageName)}`
    );
    return res.data.kodepos || "";
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 404) {
      return ""; // Tidak ketemu = anggap kosong
    }
    throw err; // Error lain tetap dilempar
  }
}


