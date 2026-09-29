// Struktur kepengurusan tetap di kode ini supaya urutan & susunan organogram
// tidak bisa berubah dari dashboard. Yang bisa diedit admin lewat dashboard
// "Tentang Kami" hanya nama, jabatan, dan foto tiap anggota (tabel org_member),
// yang dicocokkan lewat roleKey di bawah.

export interface OrgBranch {
  /** roleKey dari node utama cabang ini */
  head: string;
  /** roleKey anggota langsung, ditampilkan satu level di bawah head */
  members: string[];
  /** true = semua anggota ditata dalam satu baris penuh (CSS: org-dept--many) */
  wide?: boolean;
}

export const ORG_STRUCTURE = {
  root: "pupuhu",

  // Level pertama: dua kolom lebar. Kasekjenan membentang jadi satu baris panjang.
  firstLevel: [
    { head: "wakil-pupuhu", members: [] },
    {
      head: "kasekjenan",
      wide: true,
      members: [
        "kasekjenan-girang-serat-1",
        "kasekjenan-girang-serat-2",
        "kasekjenan-girang-panamba-1",
        "kasekjenan-girang-panamba-2",
      ],
    },
  ] satisfies OrgBranch[],

  // Level kedua: lima divisi, masing-masing dengan dua anggota.
  divisi: [
    {
      head: "warta-motekar",
      members: ["warta-motekar-warta-embaran", "warta-motekar-karya-motekar"],
    },
    {
      head: "mandala-luar",
      members: ["mandala-luar-simpay-luar", "mandala-luar-patalimarga-alumni"],
    },
    {
      head: "wengkuan-jero",
      members: ["wengkuan-jero-pangajen", "wengkuan-jero-kakulawargaan"],
    },
    {
      head: "pamekaran-sumber-daya",
      members: ["pamekaran-sumber-daya-pangaping-sdm", "pamekaran-sumber-daya-panalungtikan"],
    },
    {
      head: "widya-raharja",
      members: ["widya-raharja-akademik", "widya-raharja-karaharjaan"],
    },
  ] satisfies OrgBranch[],
};

/** Semua roleKey dalam urutan tampil; dipakai untuk seed dan fallback. */
export const ORG_ROLE_KEYS: string[] = [
  ORG_STRUCTURE.root,
  ...ORG_STRUCTURE.firstLevel.map((b) => b.head),
  ...ORG_STRUCTURE.firstLevel.flatMap((b) => b.members),
  ...ORG_STRUCTURE.divisi.map((b) => b.head),
  ...ORG_STRUCTURE.divisi.flatMap((b) => b.members),
];
