"use client";
import { useEffect, useState } from "react";
import {
  getProvinces,
  getCities,
  getDistricts,
  getVillages,
  getPostalCode,
  Province,
  Village,
} from "@/lib/apiWilayah";

export default function CekTarif() {
  const [provinsi, setProvinsi] = useState<Province[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");

  const [kota, setKota] = useState<string[]>([]);
  const [selectedKota, setSelectedKota] = useState("");

  const [kecamatan, setKecamatan] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  const [kelurahan, setKelurahan] = useState<Village[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState("");

  const [kodePos, setKodePos] = useState("");

  // Ambil semua provinsi
  useEffect(() => {
    getProvinces().then(setProvinsi).catch(console.error);
  }, []);

  // Saat Provinsi berubah
  useEffect(() => {
    if (!selectedProvinsi) return;

    // Reset level bawah
    setSelectedKota("");
    setKota([]);
    setSelectedKecamatan("");
    setKecamatan([]);
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    let canceled = false;
    getCities(selectedProvinsi)
      .then((res) => {
        if (!canceled) setKota(res);
      })
      .catch(console.error);

    return () => {
      canceled = true;
    };
  }, [selectedProvinsi]);

  // Saat Kota berubah
  useEffect(() => {
    if (!selectedKota) return;

    // Reset level bawah
    setSelectedKecamatan("");
    setKecamatan([]);
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    let canceled = false;
    getDistricts(selectedProvinsi, selectedKota)
      .then((res) => {
        if (!canceled) setKecamatan(res);
      })
      .catch(console.error);

    return () => {
      canceled = true;
    };
  }, [selectedKota]);

  // Saat Kecamatan berubah
  useEffect(() => {
    if (!selectedKecamatan) return;

    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    let canceled = false;
    getVillages(selectedProvinsi, selectedKota, selectedKecamatan)
      .then((res) => {
        if (!canceled) setKelurahan(res);
      })
      .catch(console.error);

    return () => {
      canceled = true;
    };
  }, [selectedKecamatan]);

  // Ambil kode pos saat kelurahan dipilih
  useEffect(() => {
    const isAllSelected =
      selectedProvinsi &&
      selectedKota &&
      selectedKecamatan &&
      selectedKelurahan;

    if (!isAllSelected) return;

    let canceled = false;

    getPostalCode(
      selectedProvinsi,
      selectedKota,
      selectedKecamatan,
      selectedKelurahan
    )
      .then((res: { postalCode?: string } | string) => {
        if (canceled) return;

        if (typeof res === "object" && res?.postalCode) {
          setKodePos(res.postalCode);
        } else if (typeof res === "string") {
          setKodePos(res);
        } else {
          setKodePos("");
        }
      })
      .catch((err) => {
        if (!canceled) {
          console.error("Gagal ambil kode pos:", err);
          setKodePos("");
        }
      });

    return () => {
      canceled = true;
    };
  }, [selectedKelurahan]);

  const resetForm = () => {
    setSelectedProvinsi("");
    setSelectedKota("");
    setSelectedKecamatan("");
    setSelectedKelurahan("");
    setKodePos("");
    setKota([]);
    setKecamatan([]);
    setKelurahan([]);
  };

  return (
    <div className="mt-12 bg-white text-black rounded shadow p-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-6">
        CEK TARIF DAKOTA
      </h3>

      {/* TUJUAN KIRIM */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">TUJUAN KIRIM:</label>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {/* Provinsi */}
          <select
            value={selectedProvinsi}
            onChange={(e) => setSelectedProvinsi(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded appearance-none"
          >
            <option value="">Provinsi</option>
            {provinsi.map((prov) => (
              <option key={prov.code} value={prov.code}>
                {prov.name}
              </option>
            ))}
          </select>

          {/* Kota */}
          <select
            value={selectedKota}
            onChange={(e) => setSelectedKota(e.target.value)}
            disabled={!kota.length}
            className="border border-gray-300 px-3 py-2 rounded appearance-none"
          >
            <option value="">Kota</option>
            {kota.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>

          {/* Kecamatan */}
          <select
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            disabled={!kecamatan.length}
            className="border border-gray-300 px-3 py-2 rounded appearance-none"
          >
            <option value="">Kecamatan</option>
            {kecamatan.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Kelurahan */}
          <select
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            disabled={!kelurahan.length}
            className="border border-gray-300 px-3 py-2 rounded appearance-none"
          >
            <option value="">Kelurahan</option>
            {kelurahan.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>

          {/* Kode Pos */}
          <input
            type="text"
            placeholder="Kode Pos"
            className="border border-gray-300 px-3 py-2 rounded appearance-none"
            value={kodePos}
            readOnly
          />
        </div>
      </div>

      {/* Tombol */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
        <button className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded">
          CEK TARIF
        </button>
        <button
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded"
          onClick={resetForm}
        >
          RESET TARIF
        </button>
      </div>
    </div>
  );
}
