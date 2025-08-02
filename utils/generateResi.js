import Resi from '@/models/Resi';

const generateNomorResiAngka = async () => {
  const now = new Date();

  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const MM = String(now.getMinutes()).padStart(2, "0");
  const YYYY = now.getFullYear();

  let nomorResi;
  let isUnique = false;

  while (!isUnique) {
    const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random
    nomorResi = `${dd}${mm}${HH}${MM}${YYYY}${random}`;

    const existing = await Resi.findOne({ resi: nomorResi });
    if (!existing) {
      isUnique = true;
    }
  }

  return nomorResi;
};

export default generateNomorResiAngka;
