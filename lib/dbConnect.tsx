import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
let isConnected = false; // Cache koneksi

export default async function dbConnect() {
  if (isConnected) return;

  if (!uri) {
    throw new Error("❌ MONGODB_URI tidak ditemukan di environment");
  }

  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });

    isConnected = true;
    console.log("✅ MongoDB terkoneksi (Next.js)");
  } catch (err: unknown) {
    console.error("❌ Gagal koneksi MongoDB:");
    throw err;
  }
}
