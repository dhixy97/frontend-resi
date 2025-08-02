import mongoose, { Schema, Document, models, model } from 'mongoose';

const posisiSchema = new Schema(
  {
    tanggal: { type: Date, default: Date.now },
    status: { type: String, required: true },
    keterangan: { type: String, required: true },
  },
  { _id: false }
);

const resiSchema = new Schema({
  resi: { type: String, unique: true, required: true, trim: true },

  cabang: {
    nama: { type: String, required: true },
    noTelp: { type: String, required: true },
    alamat: { type: String, required: true },
  },

  nama: { type: String, required: true },
  alamat: { type: String, required: true },
  namaBarang: { type: String, required: true },

  wilayah: {
    provinsi: { type: String, required: true },
    kota: { type: String, required: true },
    kecamatan: { type: String, required: true },
    kelurahan: { type: String, required: true },
    kodepos: { type: String, required: true },
  },

  jumlah: { type: Number, required: true },
  berat: { type: Number, required: true },
  jenis: { type: String, required: true },
  status: { type: String, default: 'Pending' },

  posisiBarang: [posisiSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 👇 Hindari duplikat model saat hot reload di Next.js
export default models.Resi || model('Resi', resiSchema);
