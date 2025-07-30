import { Suspense } from "react";
import ResiClient from "./ResiClient";

export default function CekResiPage() {
  return (
    <Suspense fallback={<div>Memuat halaman...</div>}>
      <ResiClient />
    </Suspense>
  );
}
