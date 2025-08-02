
export interface Province {
  code: string;
  name: string;
}

export interface Village {
  name: string;
  postalCode: string;
}

// Get daftar provinsi
export async function getProvinces(): Promise<Province[]> {
  const res = await fetch(`/api/wilayah-proxy/provinces`);
  if (!res.ok) throw new Error('Gagal mengambil data provinsi');
  return res.json();
}

// Get daftar kota dari kode provinsi
export async function getCities(provinceCode: string): Promise<string[]> {
  const res = await fetch(
    `/api/wilayah-proxy/cities/${encodeURIComponent(provinceCode)}`
  );
  if (!res.ok) throw new Error('Gagal mengambil data kota');
  return res.json();
}

// Get daftar kecamatan dari provinsi dan kota
export async function getDistricts(
  provinceCode: string,
  cityName: string
): Promise<string[]> {
  const res = await fetch(
    `/api/wilayah-proxy/districts/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}`
  );
  if (!res.ok) throw new Error('Gagal mengambil data kecamatan');
  return res.json();
}

// Get daftar kelurahan dari provinsi, kota, dan kecamatan
export async function getVillages(
  provinceCode: string,
  cityName: string,
  districtName: string
): Promise<Village[]> {
  const res = await fetch(
    `/api/wilayah-proxy/villages/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}`
  );
  if (!res.ok) throw new Error('Gagal mengambil data kelurahan');
  return res.json();
}

// Get kode pos dari provinsi, kota, kecamatan, kelurahan
export async function getPostalCode(
  provinceCode: string,
  cityName: string,
  districtName: string,
  villageName: string
): Promise<string> {
  const res = await fetch(
    `/api/wilayah-proxy/postal-code/${encodeURIComponent(provinceCode)}/${encodeURIComponent(cityName)}/${encodeURIComponent(districtName)}/${encodeURIComponent(villageName)}`
  );
  if (!res.ok) throw new Error('Gagal mengambil kode pos');
  const json = await res.json();
  return json.kodepos;
}
