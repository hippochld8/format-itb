import type { OrgPerson } from "@/lib/types";

// Nama dan jabatan default untuk seed. Setelah seed, data ini bisa diubah dari
// dashboard "Tentang Kami"; posisi dalam organogram (roleKey) tetap.
export const orgMemberList: Omit<OrgPerson, "photo">[] = [
  { roleKey: "pupuhu", role: "Pupuhu", name: "Irghi Satya Priangga" },
  { roleKey: "wakil-pupuhu", role: "Wakil Pupuhu", name: "Fashila Azra Suryana" },
  { roleKey: "kasekjenan", role: "Kasékjénan", name: "Derilo Albani Devandra Putra" },
  { roleKey: "kasekjenan-girang-serat-1", role: "Girang Serat 1", name: "Alya Nashita Nugraha" },
  { roleKey: "kasekjenan-girang-serat-2", role: "Girang Serat 2", name: "Dafa' Fauzi Ikhsan Kurniawan" },
  { roleKey: "kasekjenan-girang-panamba-1", role: "Girang Panamba 1", name: "Dinda Alsyafira Putri" },
  { roleKey: "kasekjenan-girang-panamba-2", role: "Girang Panamba 2", name: "Ridho Muhammad Hafiz" },
  { roleKey: "warta-motekar", role: "Warta Motékar", name: "Ahmad Nizam Fachrezi" },
  { roleKey: "warta-motekar-warta-embaran", role: "Warta Émbaran", name: "Muhammad Falih Azkhari" },
  { roleKey: "warta-motekar-karya-motekar", role: "Karya Motékar", name: "Khaira Aini Fathiyyah" },
  { roleKey: "mandala-luar", role: "Mandala Luar", name: "Nida Huwaida Mutmainnah" },
  { roleKey: "mandala-luar-simpay-luar", role: "Simpay Luar", name: "Hasbi Mochamad Al Farizii" },
  { roleKey: "mandala-luar-patalimarga-alumni", role: "Patalimarga Alumni", name: "Chevy Muharram Firdaus" },
  { roleKey: "wengkuan-jero", role: "Wengkuan Jero", name: "Daffa Khoiri Tawaqal" },
  { roleKey: "wengkuan-jero-pangajen", role: "Pangajén", name: "Zaina Nuur Rahayu" },
  { roleKey: "wengkuan-jero-kakulawargaan", role: "Kakulawargaan", name: "Rafdi Khairi Hamzah" },
  { roleKey: "pamekaran-sumber-daya", role: "Pamekaran Sumber Daya", name: "Azka Yasir Rabbani" },
  { roleKey: "pamekaran-sumber-daya-pangaping-sdm", role: "Pangaping SDM", name: "Kiti Andriani" },
  { roleKey: "pamekaran-sumber-daya-panalungtikan", role: "Panalungtikan", name: "Rajwa Aufa Putri Ardiva" },
  { roleKey: "widya-raharja", role: "Widya Raharja", name: "Raden Abimanyu Putra Kusuma" },
  { roleKey: "widya-raharja-akademik", role: "Akademik", name: "Mochamad Fathir Ramadhan Hidayat" },
  { roleKey: "widya-raharja-karaharjaan", role: "Karaharjaan", name: "Haifa Nur Ayesha" },
];
