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
  kodepos: string;
}

export default function CekTarif() {
  const [provinsi, setProvinsi] = useState<Provinsi[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("");

  const [kota, setKota] = useState<string[]>([]);
  const [selectedKota, setSelectedKota] = useState<string>("");

  const [kecamatan, setKecamatan] = useState<string[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");

  const [kelurahan, setKelurahan] = useState<Kelurahan[]>([]);
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>("");

  const [kodePos, setKodePos] = useState<string>("");

  useEffect(() => {
    getProvinces()
      .then((data: Provinsi[]) => setProvinsi(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedProvinsi) return;

    setSelectedKota("");
    setKota([]);
    setSelectedKecamatan("");
    setKecamatan([]);
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    getCities(selectedProvinsi)
      .then((data: string[]) => setKota(data))
      .catch(console.error);
  }, [selectedProvinsi]);

  useEffect(() => {
    if (!selectedKota) return;

    setSelectedKecamatan("");
    setKecamatan([]);
    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    getDistricts(selectedProvinsi, selectedKota)
      .then((data: string[]) => setKecamatan(data))
      .catch(console.error);
  }, [selectedKota]);

  useEffect(() => {
    if (!selectedKecamatan) return;

    setSelectedKelurahan("");
    setKelurahan([]);
    setKodePos("");

    getVillages(selectedProvinsi, selectedKota, selectedKecamatan)
      .then((data: Kelurahan[]) => setKelurahan(data))
      .catch(console.error);
  }, [selectedKecamatan]);

  useEffect(() => {
    const isComplete =
      selectedProvinsi &&
      selectedKota &&
      selectedKecamatan &&
      selectedKelurahan;

    if (!isComplete) return;

    let canceled = false;

    getPostalCode(
      selectedProvinsi,
      selectedKota,
      selectedKecamatan,
      selectedKelurahan
    )
      .then((res: { kodepos?: string } | string) => {
        if (canceled) return;

        if (typeof res === "object" && "kodepos" in res && res.kodepos) {
          setKodePos(res.kodepos);
        } else if (typeof res === "string") {
          setKodePos(res);
        } else {
          setKodePos("");
        }
      })
      .catch((err: unknown) => {
        if (!canceled) {
          console.error("Gagal ambil kode pos:", err);
          setKodePos("");
        }
      });

    return () => {
      canceled = true;
    };
  }, [selectedKelurahan]);

  const resetForm = (): void => {
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
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          defaultValue=""
        >
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
          <select
            value={selectedProvinsi}
            onChange={(e) => setSelectedProvinsi(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Provinsi</option>
            {provinsi.map((prov) => (
              <option key={prov.code} value={prov.code}>
                {prov.name}
              </option>
            ))}
          </select>

          <select
            value={selectedKota}
            onChange={(e) => setSelectedKota(e.target.value)}
            disabled={!kota.length}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Kota</option>
            {kota.map((kota) => (
              <option key={kota} value={kota}>
                {kota}
              </option>
            ))}
          </select>

          <select
            value={selectedKecamatan}
            onChange={(e) => setSelectedKecamatan(e.target.value)}
            disabled={!kecamatan.length}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Kecamatan</option>
            {kecamatan.map((kec) => (
              <option key={kec} value={kec}>
                {kec}
              </option>
            ))}
          </select>

          <select
            value={selectedKelurahan}
            onChange={(e) => setSelectedKelurahan(e.target.value)}
            disabled={!kelurahan.length}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Kelurahan</option>
            {kelurahan.map((kel) => (
              <option key={kel.name} value={kel.name}>
                {kel.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Kode Pos"
            className="border border-gray-300 px-3 py-2 rounded"
            value={kodePos}
            readOnly
          />
        </div>
      </div>

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
