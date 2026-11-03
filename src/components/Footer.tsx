import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Radio, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Phone, 
  Building2, 
  Info, 
  Users, 
  Compass, 
  X, 
  Send, 
  CheckCircle2, 
  FileText,
  ExternalLink
} from 'lucide-react';
import { INITIAL_AFFILIATES } from '../data/mockData';

type ModalType = 'tentang_kami' | 'redaksi' | 'kontak' | null;

export const Footer: React.FC = () => {
  const { 
    navigateToHome, 
    navigateToCategory, 
    navigateToEditorial, 
    activeRole,
    categories = [
      'Nasional',
      'Politik',
      'Ekonomi',
      'Olahraga',
      'Teknologi',
      'Hiburan',
      'Lifestyle'
    ]
  } = useApp();

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [contactSent, setContactSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Informasi / Liputan',
    message: ''
  });

  const handleHomeClick = () => {
    navigateToHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (type: ModalType) => {
    setActiveModal(type);
    setContactSent(false);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', subject: 'Informasi / Liputan', message: '' });
      setActiveModal(null);
    }, 2200);
  };

  return (
    <>
      <footer className="site-footer bg-gradient-to-b from-sky-50/90 via-white to-sky-100/80 text-slate-600 text-xs border-t-2 border-sky-300 mt-16 pt-12 pb-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10 pb-10 border-b border-sky-200/80">
            
            {/* Col 1 & 2: Brand Info & Animated Logo & Alamat Redaksi (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Animated WartaRadar Logo Container */}
              <div 
                onClick={handleHomeClick}
                className="inline-flex items-center gap-3 cursor-pointer group select-none relative p-1.5 -ml-1 rounded-2xl hover:bg-white/80 transition-all duration-300"
                title="WartaRadar.com - Kembali ke Beranda"
              >
                {/* Radar Scope Visual with Animation */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                  {/* Outer Pulsing Radar Rings */}
                  <div className="absolute inset-0 rounded-full border border-sky-400/60 bg-sky-400/10 animate-radar-ring-1 pointer-events-none" />
                  <div className="absolute inset-0 rounded-full border border-blue-500/40 bg-blue-500/5 animate-radar-ring-2 pointer-events-none" />
                  
                  {/* Radar Screen Center with Sweep Beam */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 border-2 border-sky-400 shadow-md flex items-center justify-center overflow-hidden">
                    {/* Rotating Radar Sweep Line */}
                    <div className="absolute inset-0 origin-center animate-radar-sweep pointer-events-none opacity-80">
                      <div 
                        className="w-full h-full"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(56, 189, 248, 0.2) 320deg, rgba(56, 189, 248, 0.85) 360deg)'
                        }}
                      />
                    </div>
                    {/* Radar Grid Crosshairs */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                      <div className="w-full h-px bg-cyan-300" />
                      <div className="h-full w-px bg-cyan-300 absolute" />
                    </div>
                    {/* Pulsing Radar Blip */}
                    <div className="absolute top-2.5 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-radar-blip shadow-xs shadow-emerald-300" />
                    
                    {/* Embedded Central Logo / Radio Icon */}
                    <img 
                      src="/assets/aistudio/logo_wartaradar_8803fab4.jpeg" 
                      alt="WartaRadar.com" 
                      className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-full relative z-10 p-0.5 bg-white/95 shadow-inner group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                {/* Brand Text & Live Status */}
                <div className="border-l-2 border-sky-300 pl-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight text-[#003366] group-hover:text-blue-700 transition">
                      WARTARADAR<span className="text-sky-500">.COM</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[9px] font-bold text-emerald-700 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      RADAR LIVE
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-snug">
                    Radar Informasi Cermat dan Independen
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                    Portal Berita & Investigasi Digital
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed max-w-md pt-1">
                WartaRadar menyajikan jurnalisme investigatif, liputan mendalam, dan pemantauan berita nasional terkini secara faktual, akurat, dan berimbang untuk masyarakat Indonesia.
              </p>

              {/* Alamat Redaksi (Official Address requested) */}
              <div className="p-3.5 bg-white/90 rounded-xl border border-sky-200/90 shadow-2xs space-y-2 text-slate-700 max-w-md">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#003366] pb-1 border-b border-sky-100">
                  <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Alamat Redaksi :</span>
                </div>
                
                <div className="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <div className="font-medium">
                    <p className="text-slate-900 font-semibold">GEDUNG LEXI MITRA GUNA</p>
                    <p>Jl. Sutaatmaja No 72-74 Lantai 1</p>
                    <p>Kelurahan Karanganyar Kota Subang – Jawa barat.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-600 pt-1 border-t border-sky-50">
                  <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-slate-500">E-mail : </span>
                    <a 
                      href="mailto:redaksi@wartaradar.com" 
                      className="font-bold text-blue-700 hover:text-blue-900 hover:underline transition"
                    >
                      redaksi@wartaradar.com
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Col 3: Informasi & Redaksi (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-extrabold text-[#003366] uppercase tracking-wider text-xs mb-3 border-l-2 border-[#003366] pl-2">
                Informasi & Redaksi
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <button 
                    onClick={handleHomeClick}
                    className="text-slate-600 hover:text-[#003366] font-medium transition flex items-center gap-1.5 text-left group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                    <span>Beranda</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenModal('tentang_kami')}
                    className="text-slate-600 hover:text-[#003366] font-medium transition flex items-center gap-1.5 text-left group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                    <span>Tentang Kami</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenModal('redaksi')}
                    className="text-slate-600 hover:text-[#003366] font-medium transition flex items-center gap-1.5 text-left group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                    <span>Redaksi</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleOpenModal('kontak')}
                    className="text-slate-600 hover:text-[#003366] font-medium transition flex items-center gap-1.5 text-left group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                    <span>Kontak</span>
                  </button>
                </li>
              </ul>

              {/* Extra Bureau Callout */}
              <div className="mt-5 p-2.5 rounded-lg bg-sky-100/60 border border-sky-200 text-[10px] text-slate-600">
                <span className="font-bold text-[#003366] block mb-0.5">Biro Liputan Subang</span>
                <span>Pusat koordinasi peliputan wilayah Jawa Barat & Investigasi Nasional.</span>
              </div>
            </div>

            {/* Col 4: Rubrik Berita (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-extrabold text-[#003366] uppercase tracking-wider text-xs mb-3 border-l-2 border-[#003366] pl-2">
                Rubrik Berita
              </h4>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c}>
                    <button 
                      onClick={() => navigateToCategory(c)}
                      className="text-slate-600 hover:text-[#003366] font-medium transition block text-left"
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Affiliate By & Standar Etika (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h4 className="font-extrabold text-[#003366] uppercase tracking-wider text-xs mb-3 border-l-2 border-[#003366] pl-2">
                  Affiliate By :
                </h4>
                <div className="space-y-2">
                  {INITIAL_AFFILIATES.map((aff) => (
                    <div
                      key={aff.id}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-sky-200/90 hover:border-blue-600 hover:shadow-xs transition group cursor-pointer"
                      title={`${aff.company} - ${aff.category}`}
                    >
                      <img
                        src={aff.logo}
                        alt={aff.name}
                        className="w-9 h-6 rounded object-cover bg-white shrink-0 border border-slate-100"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#003366] transition block truncate leading-tight">
                          {aff.name}
                        </span>
                        <span className="text-[9px] text-slate-400 block truncate">
                          {aff.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standar & Etika */}
              <div className="p-3 bg-white rounded-xl border border-sky-200 shadow-2xs text-[11px]">
                <div className="font-bold text-[#003366] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Terverifikasi Dewan Pers</span>
                </div>
                <p className="text-slate-500 text-[10px] leading-relaxed">
                  Mematuhi Pedoman Pemberitaan Media Siber (PPMS) & Kode Etik Jurnalistik (KEJ).
                </p>
              </div>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
            <div>
              &copy; {new Date().getFullYear()} <strong className="text-slate-700">WartaRadar.com</strong> — Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button 
                onClick={() => handleOpenModal('tentang_kami')}
                className="hover:text-[#003366] transition cursor-pointer"
              >
                Pedoman Redaksi
              </button>
              <span>•</span>
              <button 
                onClick={() => handleOpenModal('kontak')}
                className="hover:text-[#003366] transition cursor-pointer"
              >
                Hak Jawab & Koreksi
              </button>
              <span>•</span>
              <button 
                onClick={() => handleOpenModal('kontak')}
                className="hover:text-[#003366] transition cursor-pointer"
              >
                Iklan & Kerja Sama
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Modal for Tentang Kami / Redaksi / Kontak */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-sky-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-[#003366]">
                  {activeModal === 'tentang_kami' && <Info className="w-5 h-5 text-sky-600" />}
                  {activeModal === 'redaksi' && <Users className="w-5 h-5 text-sky-600" />}
                  {activeModal === 'kontak' && <Mail className="w-5 h-5 text-sky-600" />}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#003366]">
                    {activeModal === 'tentang_kami' && 'Tentang WartaRadar.com'}
                    {activeModal === 'redaksi' && 'Susunan Redaksi & Manajemen'}
                    {activeModal === 'kontak' && 'Kontak & Alamat Redaksi'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Informasi & Redaksi Resmi WartaRadar
                  </p>
                </div>
              </div>
              <button 
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content: Tentang Kami */}
            {activeModal === 'tentang_kami' && (
              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-100">
                  <h4 className="font-bold text-[#003366] text-sm mb-1">
                    Radar Informasi Cermat dan Independen
                  </h4>
                  <p>
                    <strong>WartaRadar.com</strong> adalah portal media siber jurnalisme investigatif yang berkomitmen menyajikan liputan berita akurat, berbasis verifikasi ketat, dan bebas intervensi untuk mengabdi pada kepentingan publik.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-sky-600" />
                    Visi & Misi Redaksi
                  </h5>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-600 pl-1">
                    <li>Menyajikan pemberitaan investigatif yang mendalam, independen, dan berimbang.</li>
                    <li>Memegang teguh Kode Etik Jurnalistik (KEJ) dan Undang-Undang Pers No. 40 Tahun 1999.</li>
                    <li>Menjadi pilar pengawasan publik yang kredibel dalam mengawal demokrasi dan pembangunan nasional.</li>
                    <li>Mengembangkan integrasi multimedia digital (portal berita, podcast investigasi, dan infografis cerdas).</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-[11px]">
                  <p className="font-bold text-slate-700 mb-0.5">Pemberitahuan Resmi:</p>
                  <p className="text-slate-500">
                    Setiap wartawan dan staf peliputan WartaRadar.com tercatat dalam box redaksi resmi, membawa Kartu Pers aktif, dan dilarang meminta atau menerima uang/gratifikasi dalam bentuk apa pun.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Content: Redaksi */}
            {activeModal === 'redaksi' && (
              <div className="space-y-4 text-xs text-slate-600">
                <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-100">
                  <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">SK Kemenkumham & Legalitas Pers</span>
                  <h4 className="text-sm font-bold text-[#003366]">PT WARTARADAR MEDIA NUSANTARA</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Pengesahan AHU-0019284.AH.01.01.Tahun 2024</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pemimpin Umum / Penanggung Jawab</span>
                    <strong className="text-slate-800 block text-xs mt-0.5">Drs. H. Hendra Setiawan, M.I.Kom</strong>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pemimpin Redaksi</span>
                    <strong className="text-slate-800 block text-xs mt-0.5">Rian Pradana, S.Sos</strong>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Redaktur Pelaksana</span>
                    <strong className="text-slate-800 block text-xs mt-0.5">Bambang Irawan</strong>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Kepala Biro Subang & Jabar</span>
                    <strong className="text-slate-800 block text-xs mt-0.5">Asep Saepudin, S.Pd</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Dewan Redaksi:</span>
                  <p className="text-slate-700">Drs. Hendra Setiawan, Rian Pradana, Dr. Fauzi Ridwan, S.H., M.H. (Penasihat Hukum), Asep Saepudin.</p>
                </div>

                {/* If role is editor or admin, allow jumping to management */}
                {(activeRole === 'editor_berita' || activeRole === 'administrator' || activeRole === 'jurnalis') && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        handleCloseModal();
                        navigateToEditorial();
                      }}
                      className="w-full py-2.5 px-4 bg-[#003366] hover:bg-blue-800 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 text-xs"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Buka Panel Manajemen Jurnal / Redaksi</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Modal Content: Kontak */}
            {activeModal === 'kontak' && (
              <div className="space-y-4 text-xs text-slate-600">
                {/* Official Address Box */}
                <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200">
                  <div className="font-bold text-[#003366] text-xs flex items-center gap-1.5 mb-2">
                    <Building2 className="w-4 h-4 text-sky-600" />
                    <span>Kantor Redaksi Pusat & Biro Jawa Barat</span>
                  </div>
                  <p className="font-extrabold text-slate-800 text-sm">
                    GEDUNG LEXI MITRA GUNA
                  </p>
                  <p className="text-slate-700 font-medium">
                    Jl. Sutaatmaja No 72-74 Lantai 1
                  </p>
                  <p className="text-slate-700 font-medium">
                    Kelurahan Karanganyar Kota Subang – Jawa barat.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-sky-200 flex flex-wrap items-center gap-4 text-[11px]">
                    <div>
                      <span className="text-slate-500 font-medium">E-mail: </span>
                      <a href="mailto:redaksi@wartaradar.com" className="font-bold text-blue-700 hover:underline">
                        redaksi@wartaradar.com
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Hotline / WA: </span>
                      <span className="font-bold text-slate-800">+62 812-9844-7274</span>
                    </div>
                  </div>
                </div>

                {/* Quick Message / Whistleblower / Hak Jawab Form */}
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <h5 className="font-bold text-slate-800 text-xs mb-2">
                    Kirim Pesan / Hak Jawab / Informasi Liputan
                  </h5>
                  
                  {contactSent ? (
                    <div className="py-4 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                      <p className="text-xs font-bold text-emerald-700">Pesan Berhasil Terkirim ke Redaksi!</p>
                      <p className="text-[11px] text-slate-500">Tim Redaksi WartaRadar akan memverifikasi dan merespons dalam 1x24 jam.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Nama Lengkap</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Nama Anda"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Alamat E-mail</label>
                          <input 
                            type="email" 
                            required
                            placeholder="nama@email.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Perihal</label>
                        <select 
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                        >
                          <option value="Informasi / Liputan">Informasi / Tip-Off Liputan</option>
                          <option value="Hak Jawab & Koreksi">Pengajuan Hak Jawab & Koreksi Berita</option>
                          <option value="Iklan & Kerja Sama">Iklan & Kemitraan Media</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Pesan / Isi Laporan</label>
                        <textarea 
                          rows={3}
                          required
                          placeholder="Tuliskan pesan atau informasi Anda secara rinci..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#003366] hover:bg-blue-800 text-white font-bold rounded-lg transition flex items-center justify-center gap-1.5 text-xs shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim ke redaksi@wartaradar.com</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>WartaRadar.com &copy; {new Date().getFullYear()}</span>
              <button 
                onClick={handleCloseModal}
                className="text-slate-600 hover:text-slate-800 font-semibold"
              >
                Tutup Jendela
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
