import { Post, PodcastEpisode, AdItem, Advertiser, Campaign, AdRate, Invoice, AffiliatePartner } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    title: 'Transformasi Infrastruktur Digital Indonesia: Jaringan Backbone Nusantara Menembus 100% Titik Daerah 3T',
    slug: 'transformasi-infrastruktur-digital-indonesia-backbone-3t',
    category: 'Teknologi',
    excerpt: 'Pemerintah meresmikan penuntasan jaringan fiber optik antarpulau terbaru guna mempercepat konektivitas sekolah dan puskesmas di wilayah terdepan.',
    content: `
      <p class="lead">Kementerian Komunikasi dan Informatika bersama konsorsium infrastruktur telekomunikasi nasional resmi mengumumkan penyelesaian tahap akhir jaringan serat optik lintas kepulauan timur Indonesia pada awal pekan ini.</p>
      
      <p>Langkah monumental ini melipatgandakan kapasitas transmisi data hingga sepuluh kali lipat untuk lebih dari 2.400 distrik dan pulau terluar yang selama ini bergantung penuh pada sambungan satelit berlatensi tinggi. Pembangunan ini menjadi tulang punggung revolusi layanan publik serba digital.</p>
      
      <h3>Akses Pendidikan dan Kesehatan Cepat</h3>
      <p>Melalui integrasi pita lebar berkecepatan gigabit, ribuan fasilitas kesehatan primer di Papua, Maluku, dan Nusa Tenggara kini dapat menjalankan telemedicine langsung dengan dokter spesialis di rumah sakit rujukan nasional di Jakarta dan Surabaya tanpa jeda koneksi.</p>

      <blockquote>"Konektivitas bukan lagi sekadar privilese perkotaan, melainkan hak asasi setiap warga negara Indonesia untuk memperoleh pendidikan, kesehatan, dan akses perekonomian yang adil serta setara."</blockquote>

      <p>Di bidang pendidikan, program digitalisasi sekolah kini dapat mengunduh modul multimedia interaktif, simulasi laboratorium sains virtual, dan asesmen nasional secara simultan tanpa kendala buffering.</p>

      <h3>Mendorong Pertumbuhan UMKM Lokal</h3>
      <p>Tidak hanya sektor publik, pelaku UMKM pengrajin tenun, komoditas vanili, serta hasil laut kini terhubung langsung ke marketplace nasional dan global lewat platform ekosistem pembayaran QRIS terintegrasi.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    mediaType: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    author: {
      name: 'Bambang Prasetyo',
      role: 'Jurnalis Senior Teknologi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: '3 Nov 2026, 08:30 WIB',
    readTime: '4 menit baca',
    views: 14280,
    status: 'published',
    isEditorialHeadline: true,
    tags: ['Teknologi', 'Infrastruktur', 'Digitalisasi', '3T', 'Konektivitas']
  },
  {
    id: 2,
    title: 'Bank Indonesia Pertahankan BI-Rate: Stabilitas Nilai Tukar dan Optimisme Pertumbuhan Ekonomi Kuartal IV',
    slug: 'bank-indonesia-pertahankan-bi-rate-kuartal-iv',
    category: 'Ekonomi',
    excerpt: 'Rapat Dewan Gubernur BI memutuskan mempertahankan suku bunga acuan guna memitigasi dinamika inflasi global sembari menjaga laju kredit investasi.',
    content: `
      <p>Rapat Dewan Gubernur (RDG) Bank Indonesia pada penutupan bulan ini menetapkan BI-Rate tetap pada level akomodatif terukur. Kebijakan moneter konsisten diarahkan untuk memastikan ekspektasi inflasi tetap terkendali dalam sasaran 2,5±1%.</p>
      <p>Gubernur Bank Indonesia menegaskan bahwa ketahanan eksternal ekonomi Indonesia tetap solid didukung oleh surplus neraca perdagangan berkelanjutan dan aliran masuk modal portofolio asing.</p>
      <p>Laju pertumbuhan kredit perbankan tercatat tumbuh 11,2% secara tahunan (yoy), terutama ditopang oleh kredit investasi dan modal kerja industri manufaktur hijau.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
    mediaType: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    author: {
      name: 'Rina Kusuma Dewi',
      role: 'Editor Ekonomi & Bisnis',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    },
    date: '3 Nov 2026, 07:45 WIB',
    readTime: '3 menit baca',
    views: 8940,
    status: 'published',
    isEditorialHeadline: true,
    isEditorialPick: true,
    tags: ['Ekonomi', 'Bank Indonesia', 'BI-Rate', 'Investasi']
  },
  {
    id: 3,
    title: 'DPR Sahkan RUU Perlindungan Data Keuangan Konsumen dalam Rapat Paripurna Kilat',
    slug: 'dpr-sahkan-ruu-perlindungan-data-keuangan',
    category: 'Politik',
    excerpt: 'Regulasi baru menjatuhkan sanksi denda maksimal dan audit forensik digital berkala bagi seluruh institusi fintech dan perbankan yang lalai menjaga data nasabah.',
    content: `
      <p>Dewan Perwakilan Rakyat Republik Indonesia resmi mengesahkan Rancangan Undang-Undang Perlindungan Data Keuangan Konsumen menjadi Undang-Undang dalam rapat paripurna ke-12 masa persidangan tahun 2026.</p>
      <p>Regulasi ini mewajibkan seluruh penyelenggara jasa keuangan untuk menerapkan enkripsi quantum-safe dan otentikasi biometrik bertingkat demi melindungi rekening tabungan serta transaksi digital masyarakat.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=900&q=80',
    mediaType: 'image',
    author: {
      name: 'Aris Munandar',
      role: 'Jurnalis Parlemen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    date: '2 Nov 2026, 20:15 WIB',
    readTime: '5 menit baca',
    views: 11250,
    status: 'published',
    isEditorialHeadline: true,
    isEditorialPick: true,
    tags: ['Politik', 'Parlemen', 'Regulasi', 'Hukum']
  },
  {
    id: 4,
    title: 'Tim Garuda Lolos ke Babak Final Piala Asia Usai Kemenangan Dramatis Adu Penalti 5-4',
    slug: 'tim-garuda-lolos-final-piala-asia',
    category: 'Olahraga',
    excerpt: 'Penampilan gemilang kiper tim nasional menepis dua tendangan krusial mengantarkan Indonesia ke partai puncak sepak bola Asia.',
    content: `
      <p>Sejarah baru kembali diukir sepak bola Indonesia setelah Tim Nasional Garuda memastikan satu tiket ke babak final Piala Asia. Bertanding sengit selama 120 menit dengan skor imbang 1-1, pertandingan akhirnya ditentukan melalui adu penalti mendebarkan.</p>
      <p>Dukungan puluhan ribu suporter merah putih yang hadir langsung di stadion memberikan energi luar biasa sepanjang babak perpanjangan waktu.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
    mediaType: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    author: {
      name: 'Dimas Setiawan',
      role: 'Jurnalis Olahraga',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    date: '2 Nov 2026, 23:40 WIB',
    readTime: '4 menit baca',
    views: 32400,
    status: 'published',
    isEditorialHeadline: true,
    tags: ['Olahraga', 'Sepak Bola', 'Timnas Garuda', 'Piala Asia']
  },
  {
    id: 5,
    title: 'Revitalisasi Cagar Budaya Kota Lama Raih Penghargaan Konservasi Heritage Dunia',
    slug: 'revitalisasi-cagar-budaya-kota-lama-penghargaan-dunia',
    category: 'Nasional',
    excerpt: 'Integrasi tata ruang pedestrian ramah lingkungan dan preservasi gedung kolonial abad ke-18 berhasil menghidupkan kembali denyut pariwisata sejarah.',
    content: `
      <p>Kawasan Cagar Budaya Kota Lama resmi dinobatkan sebagai salah satu model restorasi perkotaan berkelanjutan terbaik oleh dewan konservasi warisan budaya internasional.</p>
      <p>Proyek yang memadukan mitigasi banjir rob berbasis polder modern, pencahayaan estetis hemat energi, dan ruang kreasi komunitas pemuda ini terbukti memicu kebangkitan ekonomi lokal hingga 300% dalam dua tahun terakhir.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80',
    mediaType: 'image',
    author: {
      name: 'Nurul Hidayati',
      role: 'Jurnalis Budaya & Lingkungan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    date: '2 Nov 2026, 17:10 WIB',
    readTime: '3 menit baca',
    views: 6720,
    status: 'published',
    isEditorialHeadline: true,
    tags: ['Nasional', 'Budaya', 'Pariwisata', 'Heritage']
  },
  {
    id: 6,
    title: 'Tren Gaya Hidup Slow Living di Kalangan Gen Z: Detoksifikasi Digital dan Kebiasaan Belanja Sadar',
    slug: 'tren-gaya-hidup-slow-living-gen-z',
    category: 'Lifestyle',
    excerpt: 'Survei membuktikan generasi muda mulai membatasi jam layar dan beralih ke konsumsi minim limbah serta aktivitas kerajinan tangan lokal.',
    content: `
      <p>Pergeseran budaya urban kian terlihat ketika semakin banyak generasi muda memilih jeda dari siklus konsumerisme cepat. Tren 'slow living' kini bukan sekadar jargon di media sosial, melainkan komitmen nyata dalam rutinitas keseharian.</p>
      <p>Mulai dari membatasi notifikasi gawai di malam hari, merawat tanaman herbal rumahan, hingga memilih pakaian berbahan ramah lingkungan yang tahan lama.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Sarah Amanda',
      role: 'Kolumnis Gaya Hidup',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    date: '2 Nov 2026, 14:20 WIB',
    readTime: '4 menit baca',
    views: 9540,
    status: 'published',
    tags: ['Lifestyle', 'Gen Z', 'Wellness', 'Slow Living']
  },
  {
    id: 7,
    title: 'Festival Film Nusantara 2026 Hadirkan 85 Sinema Karya Sutradara Muda Berbakat',
    slug: 'festival-film-nusantara-2026-sutradara-muda',
    category: 'Hiburan',
    excerpt: 'Perhelatan sinema terbesar tahun ini menyoroti cerita-cerita folklor kearifan lokal yang dikemas dengan sinematografi kelas dunia.',
    content: `
      <p>Festival Film Nusantara kembali digelar dengan kurasi karya yang semakin variatif dan berani. Tahun ini dewan juri mencatat lonjakan partisipasi sinematografer daerah dari Aceh hingga Merauke yang mengangkat kekayaan cerita rakyat dalam lensa kontemporer.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Dimas Setiawan',
      role: 'Jurnalis Seni & Hiburan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
    date: '1 Nov 2026, 19:30 WIB',
    readTime: '3 menit baca',
    views: 7810,
    status: 'published',
    tags: ['Hiburan', 'Film', 'Sinema', 'Seni']
  },
  // IN REVIEW / EDITORIAL WORKFLOW ITEMS
  {
    id: 101,
    title: 'Analisis Kebijakan Subsidi Kendaraan Listrik 2027: Antara Target Emisi dan Efisiensi Anggaran',
    slug: 'analisis-kebijakan-subsidi-kendaraan-listrik-2027',
    category: 'Ekonomi',
    excerpt: 'Draft kajian mendalam mengenai dampak insentif fiskal otomotif ramah lingkungan terhadap percepatan transisi energi terbarukan di tanah air.',
    content: `
      <p>Kajian Badan Kebijakan Fiskal menunjukkan bahwa skema insentif konversi motor dan mobil listrik perlu diarahkan pada rantai pasok lokal baterai berbasis nikel domestik agar devisa tetap berputar di dalam negeri.</p>
      <p>Pakar transportasi menyarankan agar alokasi subsidi juga diperluas untuk pengadaan armada bus umum listrik di kota-kota sekunder guna mengurangi beban kemacetan.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Bambang Prasetyo',
      role: 'Jurnalis Senior Teknologi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: '3 Nov 2026, 11:00 WIB',
    readTime: '5 menit baca',
    views: 0,
    status: 'menunggu_review',
    submittedAt: '3 Nov 2026, 11:05 WIB',
    tags: ['Ekonomi', 'Otomotif', 'Energi Terbarukan', 'Kebijakan']
  },
  {
    id: 102,
    title: 'Investigasi Khusus: Praktik Pertambangan Ilegal Mengancam Daerah Aliran Sungai di Hulu Kalimantan',
    slug: 'investigasi-tambang-ilegal-hulu-kalimantan',
    category: 'Nasional',
    excerpt: 'Laporan lapangan mengungkap deforestasi seluas 1.200 hektare yang memicu sedimentasi berbahaya bagi suplai air bersih masyarakat adat.',
    content: `
      <p>Tim jurnalis investigasi WartaRadar menelusuri aliran sungai sepanjang 80 kilometer dan menemukan puluhan ponton penambangan liar yang beroperasi tanpa izin lingkungan resmi.</p>
      <p>Hasil uji laboratorium sampel air mengindikasikan kadar merkuri melebihi ambang batas baku mutu yang ditetapkan kementerian lingkungan.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Nurul Hidayati',
      role: 'Jurnalis Budaya & Lingkungan',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    date: '3 Nov 2026, 09:20 WIB',
    readTime: '6 menit baca',
    views: 0,
    status: 'perlu_revisi',
    revisionNotes: 'Perlu konfirmasi tanggapan resmi dari pihak Dinas ESDM setempat dan lampirkan sertifikat hasil uji lab air sebagai kelengkapan verifikasi fakta.',
    submittedAt: '2 Nov 2026, 16:30 WIB',
    tags: ['Investigasi', 'Lingkungan', 'Kalimantan', 'Nasional']
  },
  {
    id: 103,
    title: 'Draf Liputan: Inovasi Panel Surya Generasi Baru Berbahan Perovskite Karya Peneliti Muda Bandung',
    slug: 'draf-liputan-panel-surya-perovskite-bandung',
    category: 'Teknologi',
    excerpt: 'Efisiensi konversi cahaya mencapai 28% dengan biaya produksi separuh dari silikon konvensional.',
    content: `
      <p>Laboratorium fisika material maju berhasil mengembangkan sel fotovoltaik komposit yang fleksibel dan mampu dipasang pada permukaan kaca gedung bertingkat tinggi.</p>
    `,
    thumbnail: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=900&q=80',
    author: {
      name: 'Bambang Prasetyo',
      role: 'Jurnalis Senior Teknologi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    date: '3 Nov 2026, 12:00 WIB',
    readTime: '3 menit baca',
    views: 0,
    status: 'draft',
    tags: ['Teknologi', 'Sains', 'Energi Surya']
  }
];

export const INITIAL_PODCASTS: PodcastEpisode[] = [
  {
    id: 1,
    seriesId: 'radar-pagi',
    seriesTitle: 'Radar Pagi',
    episodeNumber: 142,
    title: 'Episode 142: Menimbang Arah Kebijakan Fiskal dan Daya Beli Masyarakat Jelang Tutup Tahun',
    description: 'Diskusi bersama ekonom senior mengenai tren inflasi pangan, kesiapan cadangan beras Bulog, dan strategi menjaga konsumsi domestik di tengah ketidakpastian geopolitik global.',
    host: 'Rina Kusuma Dewi & Faisal Basri Institute',
    duration: '28:45',
    durationSeconds: 1725,
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
    publishedDate: '3 Nov 2026',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    plays: 5820
  },
  {
    id: 2,
    seriesId: 'suara-parlemen',
    seriesTitle: 'Suara Parlemen',
    episodeNumber: 88,
    title: 'Episode 88: Membedah Pasal Krusial RUU Perlindungan Data Keuangan Bersama Komisi XI',
    description: 'Mengulas hak ganti rugi nasabah perbankan, mekanisme audit independen kebocoran sistem keamanan siber, dan pengawasan otoritas pengawas keuangan.',
    host: 'Aris Munandar',
    duration: '34:12',
    durationSeconds: 2052,
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    publishedDate: '2 Nov 2026',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
    plays: 4210
  },
  {
    id: 3,
    seriesId: 'cakrawala-teknologi',
    seriesTitle: 'Cakrawala Teknologi',
    episodeNumber: 65,
    title: 'Episode 65: AI Agent dan Masa Depan Otomasi Pekerjaan di Asia Tenggara',
    description: 'Bagaimana model AI otonom membantu analisis data hukum, rekayasa perangkat lunak, dan layanan pelanggan tanpa mengesampingkan sentuhan pertimbangan manusiawi.',
    host: 'Bambang Prasetyo',
    duration: '25:18',
    durationSeconds: 1518,
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg',
    publishedDate: '1 Nov 2026',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    plays: 7340
  },
  {
    id: 4,
    seriesId: 'investigasi-radar',
    seriesTitle: 'Investigasi Radar',
    episodeNumber: 31,
    title: 'Episode 31: Di Balik Tirai Pertambangan Liar: Fakta Lapangan Sungai Kalimantan',
    description: 'Rekaman suara eksklusif dari warga bantaran sungai, aktivis lingkungan adat, dan pemetaan citra satelit hulu sungai yang terdampak polutan berat.',
    host: 'Nurul Hidayati',
    duration: '42:50',
    durationSeconds: 2570,
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/forest_day.ogg',
    publishedDate: '28 Okt 2026',
    thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    plays: 9150
  }
];

export const INITIAL_ADVERTISERS: Advertiser[] = [
  { id: 1, name: 'PT Bank Mandiri Nusantara Tbk', company: 'Bank Mandiri Nusantara', email: 'media@mandirinusantara.co.id', phone: '+62 21 5299 1234', activeCampaigns: 1 },
  { id: 2, name: 'Telko Prima Solusindo', company: 'Telko Prima', email: 'ads@telkoprima.id', phone: '+62 21 8060 5555', activeCampaigns: 1 },
  { id: 3, name: 'Astra Mobility Lestari', company: 'Astra Group', email: 'brand@astramobility.co.id', phone: '+62 21 650 3333', activeCampaigns: 2 },
  { id: 4, name: 'E-Commerce Supermall ID', company: 'Supermall Indonesia', email: 'partner@supermall.id', phone: '+62 21 2988 9000', activeCampaigns: 1 },
  { id: 5, name: 'WartaRadar Media & Digital Publishing', company: 'PT Warta Radar Nusantara', email: 'iklan@wartaradar.com', phone: '+62 21 5550 9999', activeCampaigns: 1 }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 1, advertiserId: 1, name: 'Promosi Tabungan Bisnis Berkelanjutan 2026', budget: 45000000, spent: 28400000, startDate: '2026-10-01', endDate: '2026-11-30', status: 'active' },
  { id: 2, advertiserId: 2, name: 'Peluncuran Paket Internet 5G Ultra Nusantara', budget: 35000000, spent: 19800000, startDate: '2026-10-15', endDate: '2026-11-20', status: 'active' },
  { id: 3, advertiserId: 3, name: 'Test Drive Kendaraan Listrik Ramah Emisi', budget: 60000000, spent: 41200000, startDate: '2026-10-01', endDate: '2026-12-15', status: 'active' },
  { id: 4, advertiserId: 4, name: 'Pesta Diskon Belanja Akhir Tahun 11.11', budget: 25000000, spent: 12000000, startDate: '2026-11-01', endDate: '2026-11-15', status: 'active' },
  { id: 5, advertiserId: 5, name: 'Peluncuran Aplikasi WartaRadar & E-Paper Digital Eksklusif', budget: 75000000, spent: 32500000, startDate: '2026-11-01', endDate: '2026-12-31', status: 'active' }
];

export const INITIAL_ADS: AdItem[] = [
  {
    id: 1,
    title: 'Aplikasi Resmi WartaRadar: Akses Cepat Berita Akurat & E-Paper Digital 24/7',
    advertiserId: 5,
    campaignId: 5,
    placement: 'top',
    imageUrl: '/assets/aistudio/wartaradar_top_billboard.jpg',
    targetUrl: 'https://wartaradar.com/unduh-aplikasi-epaper',
    impressions: 74210,
    clicks: 4890,
    active: true,
    altText: 'Dapatkan Aplikasi WartaRadar Sekarang - Unduh di App Store & Google Play'
  },
  {
    id: 2,
    title: 'Header Sponsor: Telko Prima 5G Nusantara',
    advertiserId: 2,
    campaignId: 2,
    placement: 'header',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=100&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/telko-prima-5g',
    impressions: 34100,
    clicks: 890,
    active: true,
    altText: 'Koneksi 5G Super Cepat Nusantara'
  },
  {
    id: 3,
    title: 'Mid Content Banner: Astra EV Hybrid Experience',
    advertiserId: 3,
    campaignId: 3,
    placement: 'mid_content',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&h=160&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/astra-ev-experience',
    impressions: 29500,
    clicks: 1180,
    active: true,
    altText: 'Jelajahi Masa Depan Mobilitas Ramah Lingkungan'
  },
  {
    id: 4,
    title: 'Sidebar Ad: Pesta Belanja 11.11 Diskon Hingga 80%',
    advertiserId: 4,
    campaignId: 4,
    placement: 'sidebar',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&h=300&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/supermall-11-11',
    impressions: 21400,
    clicks: 650,
    active: true,
    altText: 'Diskon Spesial 11.11 di Supermall'
  },
  {
    id: 5,
    title: 'In-Article Ad: Solusi Kas Perusahaan Fleksibel',
    advertiserId: 1,
    campaignId: 1,
    placement: 'article',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=180&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/mandiri-cash-management',
    impressions: 18200,
    clicks: 530,
    active: true,
    altText: 'Manajemen Keuangan Bisnis Modern'
  },
  {
    id: 6,
    title: 'Footer Banner: Green Energy Initiative Indonesia',
    advertiserId: 3,
    campaignId: 3,
    placement: 'footer',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&h=140&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/green-energy-2026',
    impressions: 15300,
    clicks: 390,
    active: true,
    altText: 'Komitmen Menuju Nol Emisi Bersih'
  },
  {
    id: 7,
    title: 'Hero Spotlight Banner: Supermall Belanja Festival 11.11',
    advertiserId: 4,
    campaignId: 4,
    placement: 'hero',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=130&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/supermall-hero',
    impressions: 31200,
    clicks: 940,
    active: true,
    altText: 'Supermall Indonesia Belanja Festival'
  },
  {
    id: 8,
    title: 'In-Feed Sponsored Ad: Akses Cloud & Jaringan Fiber 5G Prima',
    advertiserId: 2,
    campaignId: 2,
    placement: 'feed',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=150&q=80',
    targetUrl: 'https://wartaradar.com/sponsor/telko-prima-feed',
    impressions: 26800,
    clicks: 810,
    active: true,
    altText: 'In-Feed Solusi Infrastruktur Cloud Prima'
  }
];

export const INITIAL_RATES: AdRate[] = [
  { id: 1, placement: 'top', name: 'Billboard Utama Top Page', cpmRate: 45000, cpcRate: 3500, dailyFlatRate: 2500000, specs: '1200 x 120 px, Max 150KB (JPG, PNG, GIF)' },
  { id: 2, placement: 'header', name: 'Header Masthead Banner', cpmRate: 38000, cpcRate: 3000, dailyFlatRate: 2000000, specs: '1200 x 100 px, Max 120KB' },
  { id: 3, placement: 'hero', name: 'Hero Spotlight Banner', cpmRate: 42000, cpcRate: 3400, dailyFlatRate: 2300000, specs: '1200 x 130 px, Max 150KB' },
  { id: 4, placement: 'feed', name: 'In-Feed Native Story Ad', cpmRate: 36000, cpcRate: 2900, dailyFlatRate: 1900000, specs: '1200 x 150 px, Max 140KB' },
  { id: 5, placement: 'mid_content', name: 'Mid Content Feed Breaker', cpmRate: 35000, cpcRate: 2800, dailyFlatRate: 1800000, specs: '1200 x 160 px, Max 150KB' },
  { id: 6, placement: 'sidebar', name: 'Sidebar Half-Page Widget', cpmRate: 30000, cpcRate: 2500, dailyFlatRate: 1500000, specs: '360 x 300 px, Max 100KB' },
  { id: 7, placement: 'article', name: 'In-Article Inline Story Ad', cpmRate: 40000, cpcRate: 3200, dailyFlatRate: 2200000, specs: '750 x 200 px, Max 120KB' },
  { id: 8, placement: 'footer', name: 'Sticky Bottom / Footer Ribbon', cpmRate: 25000, cpcRate: 2000, dailyFlatRate: 1200000, specs: '1200 x 140 px, Max 120KB' }
];

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'INV-2026-001', advertiserName: 'PT Bank Mandiri Nusantara Tbk', campaignName: 'Promosi Tabungan Bisnis Berkelanjutan', amount: 28400000, date: '2026-10-02', dueDate: '2026-11-02', status: 'Lunas' },
  { id: 'INV-2026-002', advertiserName: 'Astra Mobility Lestari', campaignName: 'Test Drive Kendaraan Listrik Ramah Emisi', amount: 41200000, date: '2026-10-15', dueDate: '2026-11-15', status: 'Lunas' },
  { id: 'INV-2026-003', advertiserName: 'Telko Prima Solusindo', campaignName: 'Peluncuran Paket Internet 5G Ultra', amount: 19800000, date: '2026-10-25', dueDate: '2026-11-10', status: 'Menunggu Pembayaran' },
  { id: 'INV-2026-004', advertiserName: 'E-Commerce Supermall ID', campaignName: 'Pesta Diskon Belanja Akhir Tahun 11.11', amount: 12000000, date: '2026-11-01', dueDate: '2026-11-20', status: 'Menunggu Pembayaran' }
];

export const INITIAL_AFFILIATES: AffiliatePartner[] = [
  {
    id: 1,
    name: 'Bank Mandiri Nusantara',
    company: 'PT Bank Mandiri Nusantara Tbk',
    badge: 'Banking & Financial',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&h=60&q=80',
    website: 'https://wartaradar.com/affiliate/mandiri',
    category: 'Perbankan & Finansial'
  },
  {
    id: 2,
    name: 'Telko Prima 5G',
    company: 'PT Telko Prima Solusindo',
    badge: 'Digital Backbone',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=120&h=60&q=80',
    website: 'https://wartaradar.com/affiliate/telkoprima',
    category: 'Telekomunikasi 5G'
  },
  {
    id: 3,
    name: 'Astra Mobility',
    company: 'Astra Group Sustainability',
    badge: 'Mobility & Green EV',
    logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=120&h=60&q=80',
    website: 'https://wartaradar.com/affiliate/astra',
    category: 'Otomotif & Mobilitas'
  },
  {
    id: 4,
    name: 'Supermall ID',
    company: 'Supermall Commerce Group',
    badge: 'E-Commerce Network',
    logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=120&h=60&q=80',
    website: 'https://wartaradar.com/affiliate/supermall',
    category: 'Retail & Logistik'
  },
  {
    id: 5,
    name: 'Dewan Pers Siber',
    company: 'Verifikasi Independen PPMS',
    badge: 'Press Authority',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=120&h=60&q=80',
    website: 'https://wartaradar.com/affiliate/dewanpers',
    category: 'Etika & Jurnalisme'
  }
];
