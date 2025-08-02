import mongoose from 'mongoose';

const posisiSchema = new mongoose.Schema({
  tanggal: { type: Date, default: Date.now },
  status: String,
  keterangan: String,
});

const resiSchema = new mongoose.Schema({
  resi: { type: String, unique: true, required: true },

  cabang: {
    nama: String,
    noTelp: String,
    alamat: String,
  },

  nama: String,
  alamat: String,
  namaBarang: String,

  wilayah: {
    provinsi: String,
    kota: String,
    kecamatan: String,
    kelurahan: String,
    kodepos: String,
  },

  jumlah: Number,
  berat: Number,
  jenis: String,
  status: String,

  posisiBarang: [posisiSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 👇 Hindari duplikat model saat hot reload
export default mongoose.models.Resi || mongoose.model('Resi', resiSchema);
