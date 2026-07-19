export interface GaleriAlbum {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  images: string[];
}

export const galeriAlbums: GaleriAlbum[] = [
  {
    slug: "ganesha-untuk-garut",
    number: "01",
    title: "Ganesha Untuk Garut",
    subtitle: "Roadshow pengenalan ITB ke sekolah-sekolah di Garut",
    images: ["/galeri-gantar-1.png", "/galeri-gantar-2.png", "/galeri-gantar-3.png"],
  },
  {
    slug: "malam-keakraban",
    number: "02",
    title: "Malam Keakraban",
    subtitle: "Mempererat kekeluargaan antar anggota FORMAT lintas angkatan",
    images: ["/galeri-makrab-1.png", "/galeri-makrab-2.png"],
  },
  {
    slug: "welcoming-party",
    number: "03",
    title: "Welcoming Party!",
    subtitle: "Penyambutan mahasiswa Garut baru di ITB",
    images: ["/galeri-welpar-1.png", "/galeri-welpar-2.png", "/galeri-welpar-3.png"],
  },
  {
    slug: "syukuran-wisuda",
    number: "04",
    title: "Syukuran Wisuda",
    subtitle: "Rasa syukur atas wisudawan mahasiswa Garut di ITB",
    images: ["/galeri-syukwis-1.png", "/galeri-syukwis-2.png"],
  },
];