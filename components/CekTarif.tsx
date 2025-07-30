"use client";
import { useEffect, useState } from "react";
import {
  getProvinces,
  getCities,
  getDistricts,
  getVillages,
  getPostalCode,
} from "@/lib/apiWilayah";

interface Provinsi {
  code: string;
  name: string;
}

interface Kelurahan {
  name: string;
  postalCode: string;
}

export default function CekTarif() {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");

  const [kota, setKota] = useState<string[]>([]);
  const [selectedKota, setSelectedKota] = useState("");

  const [kecamatan, setKecamatan] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  const [kelurahan, setKelurahan] = useState<Kelurahan[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState("");

  const [kodePos, setKodePos] = useState("");

  // Ambil semua provinsi saat pertama render
  useEffect(() => {
    getProvinces().then(setProvinsi).catch(console.error);
  }, []);

  // Saat Provinsi berubah
  useEffect(() => {
    if (!selectedProvinsi) return;

    // Reset child
    setSelectedKota("");
    setKota([]);
    setSelectedKecamatan("");
    setKecamatan([]);
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    // Ambil data kota
    getCities(selectedProvinsi).then(setKota).catch(console.error);
  }, [selectedProvinsi]);

  // Saat Kota berubah
  useEffect(() => {
    if (!selectedKota) return;

    // Reset child
    setSelectedKecamatan("");
    setKecamatan([]);
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    getDistricts(selectedProvinsi, selectedKota)
      .then(setKecamatan)
      .catch(console.error);
  }, [selectedKota]);

  // Saat Kecamatan berubah
  useEffect(() => {
    if (!selectedKecamatan) return;

    // Reset child
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    getVillages(selectedProvinsi, selectedKota, selectedKecamatan)
      .then(setKelurahan)
      .catch(console.error);
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
      .then((res) => {
        if (canceled) return;

        if (typeof res === "object" && res.postalCode) {
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
  }, [selectedProvinsi, selectedKota, selectedKecamatan, selectedKelurahan]);

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
      <h3 className="text-2xl font-semibold text-center mb-6">CEK TARIF DAKOTA</h3>

      {/* KIRIM DARI (dummy) */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">KIRIM DARI:</label>
        <select className="w-full border border-gray-300 rounded px-3 py-2 appearance-none" defaultValue="">
          <option value="">Pilih Provinsi</option>
          {provinsi.map((prov) => (
            <option key={prov.code} value={prov.code}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>

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
