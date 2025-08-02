const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '1234567890abcdef';

async function fetchWithApiKey(url: string) {
  const res = await fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Gagal fetch ${url}: ${res.status}`);
  }

  return res.json();
}

// ✅ Ambil semua provinsi
export async function getProvinces() {
  return fetchWithApiKey('/api/wilayah/provinces');
}

// ✅ Ambil semua kota berdasarkan kode provinsi
export async function getCities(provinceCode: string) {
  return fetchWithApiKey(`/api/wilayah/cities/${encodeURIComponent(provinceCode)}`);
}

// ✅ Ambil semua kecamatan berdasarkan provinsi dan kota
export async function getDistricts(provinceCode: string, cityName: string) {
  return fetchWithApiKey(
    `/api/wilayah/districts/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}`
  );
}

// ✅ Ambil semua kelurahan berdasarkan provinsi, kota, kecamatan
export async function getVillages(
  provinceCode: string,
  cityName: string,
  districtName: string
) {
  return fetchWithApiKey(
    `/api/wilayah/villages/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}`
  );
}

// ✅ Ambil kode pos berdasarkan lokasi lengkap
export async function getPostalCode(
  provinceCode: string,
  cityName: string,
  districtName: string,
  villageName: string
) {
  try {
    const res = await fetch(
      `/api/wilayah/postal-code/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(villageName)}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );

    if (res.status === 404) return "";
    if (!res.ok) throw new Error(`Gagal fetch kodepos: ${res.status}`);

    const data = await res.json();
    return data.kodepos || "";
  } catch (err) {
    throw err;
  }
}
