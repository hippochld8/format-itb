import { img } from "./images";

export type ArticleSection =
  | { type: "paragraph"; text: string }
  | { type: "gallery"; images: string[] }
  | { type: "callout"; text: string }
  | { type: "quote"; speaker: string; lines: string[] }
  | { type: "list"; title: string; items: string[] };

export interface CintaLokalArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
  sections: ArticleSection[];
}

export const cintaLokalList: CintaLokalArticle[] = [
  {
    slug: "penca-oray",
    title: "Penca Oray",
    excerpt: "Atraksi silat khas Garut yang memadukan jurus penca dengan oray (ular) liar bawaan pemain.",
    image: img("penca_oray.jpg"),
    date: "37 minggu lalu",
    tags: ["CiLok", "CintaLokal"],
    sections: [
      {
        type: "paragraph",
        text: "Penca Oray sabenerna mah sarua baé jeung penca silat kawas umumna, pamaénna sarua baé némbongkeun kaparigelan dina ngolah gerak jeung jurus-jurus penca silat. Ngan nu ngabédakeunna nyaéta pamaén silat dina penca oray mawa oray nu ngabogaan peurah nalika mintonkeun jurus-jurusna.",
      },
      {
        type: "gallery",
        images: [img("penca_oray_1.jpg"), img("penca_oray_2.jpg"), img("penca_oray_3.jpg")],
      },
      {
        type: "paragraph",
        text: "Oray nu digunakeun dina atraksi penca oray lain oray piaraan, tapi oray liar nu ngahaja maranéhna téangan nalika aya paménta/pangulem pikeun tampil. Ku kituna, pamaén silat ti leuleutik nepi ka gedé geus biasa kana oray nu aya peurahan.",
      },
      {
        type: "callout",
        text: "Lalampahan pagelaran diiring ku waditra (alat karawitan), boh dina pagelaran penca oray atawa penca silat biasa. Saméméh tampil jeung nalika ngamimitian ngaluarkeun jurus-jurus munggaran, oray disumputkeun dina jero baju pamaén silat. Nalika waktu puncak pagelaran, oray-oray nu diteundeun dina jero baju dikaluarkeun tuluy dipaké atraksi nepi ka pagelaran anggeus.",
      },
      {
        type: "paragraph",
        text: "Pikeun bisa ménta paguyuban penca oray tampil téh paméntana teu bisa dudak-dadak, minimal saminggu saacan poénan acara. Lantaran, pamaén silat kudu moro heula orayna ka sawah, pasir, jeung leuweung.",
      },
    ],
  },
  {
    slug: "kampung-pulo",
    title: "Kampung Pulo",
    excerpt: "Kampung adat di pulau kecil tengah Situ Cangkuang yang menjaga tata ruang dan tradisi leluhur.",
    image: img("kampung_pulo.jpeg"),
    date: "32 minggu lalu",
    tags: ["CiLok", "CintaLokal"],
    sections: [
      {
        type: "paragraph",
        text: "Kampung Pulo téh kampung adat di Garut, Jawa Barat, anu aya di pulo leutik tengah Situ Cangkuang. Kampung ieu kasohor ku adatna anu tetep dijaga jeung ku tata ruang anu has. Di dinya ngan aya genep imah tradisional anu dihuni ku turunan karuhun nu ngadegkeun kampung.",
      },
      {
        type: "gallery",
        images: [img("kampung_pulo_1.jpg"), img("kampung_pulo_2.jpg"), img("kampung_pulo_3.jpg")],
      },
      {
        type: "paragraph",
        text: "Warga Kampung Pulo nepi ka ayeuna masih kénéh nyepeng pageuh rupa-rupa tradisi karuhunna anu diturunkeun ti generasi ka generasi. Aranjeunna rutin ngayakeun upacara adat unggal taun saperti Seren Taun minangka ungkapan syukur kana hasil panén. Aya ogé tradisi Ngaruwat pikeun ngabersihan kampung tina unsur-unsur goréng. Kagiatan-kagiatan éta jadi jalan pikeun nguatkeun kakompakan jeung silaturahmi masarakat Kampung Pulo.",
      },
      {
        type: "paragraph",
        text: "Kampung Pulo ngabogaan sajarah anu panjang, asalna ti mangsa Karajaan Mataram dina abad ka-16. Ieu kampung diadegkeun ku Embah Dalem Arif Muhammad, salah sahiji panglima perang anu meunang hadiah tanah di wewengkon éta. Genep imah utama anu aya ayeuna téh ngalambangkeun genep putrana, anu tuluy jadi cikal-bakal warga Kampung Pulo kiwari.",
      },
      {
        type: "list",
        title: "Pantangan",
        items: [
          "Teu meunang miara sato ingon nu sukuna opat; Arif Muhammad teu resep kana sato ingon nu beuki dangdaunan",
          "Teu meunang digawé dina poé Rebo; poé ieu téh hususon Arif Muhammad ngajarkeun Islam, antukna masarakat teu digarawé",
          "Teu meunang nabeuh goong atawa gamelan; putrana anu pameget pupus dina kariaan sunatan anu nabeuh gamelan",
          "Imah kudu maké hateup injuk sarta bentukna prisma",
          "Teu meunang aya leuwih ti genep kulawarga (genep suhunan imah jeung hiji masjid)",
        ],
      },
    ],
  },
  {
    slug: "burayot",
    title: "Burayot",
    excerpt: "Kudapan tradisional Garut berbahan tepung beras dan gula merah, bentuknya menggantung khas dari Leles.",
    image: img("burayot.jpg"),
    date: "33 minggu lalu",
    tags: ["CiLok", "CintaLokal"],
    sections: [
      {
        type: "paragraph",
        text: "Burayot téh salah sahiji kadaharan tradisional has Garut, Jawa Barat. Kasohor ku rasa amis nu has jeung bentukna nu unik, siga \"keriput\" jeung \"ngagantung,\" nurutkeun ngaranna dina basa Sunda anu hartina ngagantung atawa ngagelembung.",
      },
      {
        type: "gallery",
        images: [img("burayot_1.jpg"), img("burayot_2.jpg"), img("burayot_3.jpg")],
      },
      {
        type: "paragraph",
        text: "Burayot asalna ti Leles, Kadungora. Ceuk beja, geus aya ti baheula, sok dijual di pasar tradisional atawa dina acara hajatan. Burayot mangrupa hasil inovasi masarakat, nyaéta Bi Acih jeung salakina Abah Onon, anu nyampurkeun tipung béas jeung gula beureum nepi ka ngabentuk adonan. Nalika digoréng, éta adonan téh ngagelembung jeung ngagantung dina tusuk awi pikeun ngaleungitkeun minyak, jadina disebut \"burayot.\"",
      },
      {
        type: "callout",
        text: "Burayot ngabogaan ciri has, nyaéta warnana coklat kusabab dijieun tina gula beureum alami, bentukna ngagantung (ngaburayot), rasana amis legit, garing di luar tapi kenyal di jero, jeung teu maké bahan pengawet.",
      },
      {
        type: "paragraph",
        text: "Burayot lain saukur kadaharan, tapi ogé warisan budaya anu nuduhkeun kumaha kreatipna urang Sunda. Loba UMKM di Garut nu ngajual burayot pikeun oleh-oleh has, sangkan ngabantu ékonomi masarakat jeung ngawanohkeun kuliner Garut ka masarakat luar nu datang ka Garut.",
      },
    ],
  },
  {
    slug: "kabijakan-pemkab-garut-asn-angkot",
    title: "Kabijakan Pemkab Garut: ASN Wajib Naek Angkutan Umum",
    excerpt: "Kebijakan ASN Garut wajib naik angkutan umum tiap Senin & Jumat untuk kurangi kemacetan dan dukung ekonomi angkot.",
    image: img("pemkab.jpg"),
    date: "31 minggu lalu",
    tags: ["CiLok", "CintaLokal"],
    sections: [
      {
        type: "paragraph",
        text: "Pamaréntah Kabupatén Garut nerapkeun kabijakan ngawajibkeun ASN pikeun maké angkutan umum unggal poé Senén jeung Jumaah nalika indit/uih dambel. Kabijakan ieu ditujukeun pikeun ngurangan kamacetan, neken polusi, sarta ngabiasakeun masarakat ngagunakeun transportasi publik.",
      },
      {
        type: "quote",
        speaker: "Nurdin Yana, Sekretaris Daerah (Sekda) Garut",
        lines: [
          "Kawijakan ieu dilaksanakeun minangka instruksi langsung ti Kapala Daérah. Ieu régulasi dilaksanakeun salaku réspon gancang kana naekna volume lalu lintas di Garut utamana dina poé Senén jeung Jumaah.",
          "Ieu aturan bakal diuji coba salila sabulan leuwih pikeun nangtukeun efektivitasna dina ngurangan kamacetan.",
        ],
      },
      {
        type: "paragraph",
        text: "Ngaliwatan kabijakan ieu PNS diajak ngagunakeun angkutan umum, saperti angkot. Disagigireun ngurangan kamacetan, Perda ieu dipiharep bisa ngarangsang roda ékonomi palaku angkutan umum di Garut.",
      },
      {
        type: "list",
        title: "Halangan",
        items: [
          "Watesan jalur angkutan umum anu can ngahontal ka sakabéh kantor pamaréntahan di Garut. Kaayaan ieu ngakudukeun sababaraha PNS pikeun leumpang ti titik turun angkot ka kantorna.",
          "Sababaraha PNS boga tugas anu merlukeun mobilitas tinggi, kayaning kunjungan lapangan atawa inspeksi situs. Kagiatan ieu merlukeun kandaraan pribadi pikeun efisiensi nu leuwih gedé.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return cintaLokalList.find((a) => a.slug === slug);
}