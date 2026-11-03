import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Megaphone, 
  DollarSign, 
  Layers, 
  PlusCircle, 
  ToggleLeft, 
  ToggleRight, 
  ExternalLink, 
  CheckCircle, 
  TrendingUp,
  FileCheck,
  Building,
  Calendar,
  MousePointerClick
} from 'lucide-react';
import { AdPlacementType, AdItem } from '../types';

export const AdManagerDashboard: React.FC = () => {
  const { 
    ads, 
    advertisers, 
    campaigns, 
    rates, 
    invoices, 
    toggleAdStatus, 
    addNewAd, 
    trackAdClick 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ads' | 'create' | 'rates' | 'advertisers' | 'invoices'>('ads');

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newPlacement, setNewPlacement] = useState<AdPlacementType>('sidebar');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80');
  const [newTargetUrl, setNewTargetUrl] = useState('https://wartaradar.com/sponsor/mitra-baru');
  const [newAdvertiserId, setNewAdvertiserId] = useState(1);
  const [newCampaignId, setNewCampaignId] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Computed metrics
  const totalImpressions = ads.reduce((acc, a) => acc + a.impressions, 0);
  const totalClicks = ads.reduce((acc, a) => acc + a.clicks, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const activeAdsCount = ads.filter(a => a.active).length;
  const totalRevenue = invoices.filter(i => i.status === 'Lunas').reduce((acc, i) => acc + i.amount, 0);

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim() || !newTargetUrl.trim()) return;

    addNewAd({
      title: newTitle,
      placement: newPlacement,
      imageUrl: newImageUrl,
      targetUrl: newTargetUrl,
      advertiserId: newAdvertiserId,
      campaignId: newCampaignId,
      active: true,
      altText: newTitle
    });

    setNewTitle('');
    setFeedback('Materi iklan berhasil ditambahkan dan aktif pada placement!');
    setTimeout(() => setFeedback(null), 3000);
    setActiveTab('ads');
  };

  return (
    <div className="ad-manager-page py-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rounded-2xl p-6 sm:p-8 border-b-4 border-amber-500 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400 tracking-wider mb-2">
                <Megaphone className="w-4 h-4" />
                Plugin: WartaRadar Manajemen Iklan (WRMI)
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Pusat Manajemen Iklan & Monetisasi
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Pengelolaan kampanye, penempatan banner, pelacakan impresi, rasio klik (CTR), serta penagihan invoice mitra pengiklan.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Penerimaan Iklan</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/60">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-400">Total Impresi</span>
              <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                {totalImpressions.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-400">Total Klik</span>
              <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">
                {totalClicks.toLocaleString()}
              </div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-400">Rasio Rata-rata (CTR)</span>
              <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                {avgCtr}%
              </div>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-400">Iklan Aktif</span>
              <div className="text-xl font-extrabold text-[#d9b76c] font-mono mt-0.5">
                {activeAdsCount} / {ads.length} slot
              </div>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'ads'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-500" />
            <span>Daftar Iklan & Slot ({ads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'create'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            <span>Pasang Materi Iklan</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'rates'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4 text-blue-500" />
            <span>Tarif & Spesifikasi (Rate Card)</span>
          </button>

          <button
            onClick={() => setActiveTab('advertisers')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'advertisers'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Building className="w-4 h-4 text-indigo-500" />
            <span>Pengiklan & Kampanye</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'invoices'
                ? 'bg-[#0f172a] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4 text-teal-500" />
            <span>Faktur & Tagihan</span>
          </button>
        </div>

        {/* TAB 1: Daftar Iklan & Slot */}
        {activeTab === 'ads' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900 mb-4 flex items-center justify-between">
              <span>Inventaris Materi Iklan Aktif & Slot Penempatan</span>
              <span className="text-xs font-normal text-slate-400">
                Klik tombol "Simulasi Klik" untuk menguji pelacakan interaksi
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ads.map(ad => {
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0.00';
                const adv = advertisers.find(a => a.id === ad.advertiserId);

                return (
                  <div 
                    key={ad.id}
                    className={`rounded-xl border p-4 transition flex flex-col justify-between ${
                      ad.active ? 'border-slate-200 bg-white shadow-xs' : 'border-slate-200 bg-slate-50 opacity-70'
                    }`}
                  >
                    <div>
                      {/* Placement Header & Switch */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                          Slot: {ad.placement}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${ad.active ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {ad.active ? 'Aktif Tayang' : 'Dinonaktifkan'}
                          </span>
                          <button 
                            onClick={() => toggleAdStatus(ad.id)}
                            className="text-slate-600 hover:text-black"
                            title="Nyalakan/matikan iklan"
                          >
                            {ad.active ? (
                              <ToggleRight className="w-6 h-6 text-emerald-600" />
                            ) : (
                              <ToggleLeft className="w-6 h-6 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 line-clamp-1 mb-1">
                        {ad.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-3">
                        Klien: <strong className="text-slate-700">{adv ? adv.company : 'Mitra Pengiklan'}</strong>
                      </p>

                      {/* Creative Preview */}
                      <div className="aspect-21/9 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 mb-3 relative group">
                        <img 
                          src={ad.imageUrl} 
                          alt={ad.title} 
                          className="w-full h-full object-cover" 
                        />
                        <a 
                          href={ad.targetUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-1 transition"
                        >
                          <span>Buka Target URL</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Metrics bar & interaction simulator */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 font-mono text-slate-600">
                        <span><strong>{ad.impressions.toLocaleString()}</strong> imp</span>
                        <span>•</span>
                        <span><strong>{ad.clicks.toLocaleString()}</strong> klik</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold">{ctr}% CTR</span>
                      </div>

                      <button
                        onClick={() => trackAdClick(ad.id)}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition"
                        title="Simulasikan klik pengunjung untuk menguji tracking WRMI"
                      >
                        <MousePointerClick className="w-3 h-3 text-amber-700" />
                        <span>Tes Klik</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Pasang Materi Iklan Baru */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
            <h3 className="font-extrabold text-xl text-slate-900 mb-1">
              Pemasangan Banner Iklan Baru
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Materi iklan akan otomatis dimuat pada posisi shortcode <code className="bg-slate-100 px-1 py-0.5 rounded">[wrmi_ad placement="..."]</code> di tema berita.
            </p>

            <form onSubmit={handleCreateAd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nama Materi / Kampanye Iklan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Banner Promo Akhir Tahun Bank XYZ..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Posisi Slot (Placement) *
                  </label>
                  <select
                    value={newPlacement}
                    onChange={(e) => setNewPlacement(e.target.value as AdPlacementType)}
                    className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="top">Top (Billboard Paling Atas)</option>
                    <option value="header">Header (Masthead Tengah)</option>
                    <option value="hero">Hero (Tepat di Bawah Sorotan Utama)</option>
                    <option value="feed">Feed (In-Feed Di Antara Berita Terkini)</option>
                    <option value="mid_content">Mid Content (Di Antara Rubrik Berita)</option>
                    <option value="sidebar">Sidebar (Bilah Samping / Widget)</option>
                    <option value="article">Article (Di Dalam Konten Naskah Berita)</option>
                    <option value="footer">Footer (Pita Bawah / Atas Footer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mitra Pengiklan *
                  </label>
                  <select
                    value={newAdvertiserId}
                    onChange={(e) => setNewAdvertiserId(Number(e.target.value))}
                    className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {advertisers.map(adv => (
                      <option key={adv.id} value={adv.id}>{adv.company}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL Gambar Banner Creative *
                </label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target URL Tautan Pengiklan (Landing Page) *
                </label>
                <input
                  type="url"
                  required
                  value={newTargetUrl}
                  onChange={(e) => setNewTargetUrl(e.target.value)}
                  className="w-full text-sm p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('ads')}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#0f172a] hover:bg-[#16233d] text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition"
                >
                  <PlusCircle className="w-4 h-4 text-amber-400" />
                  <span>Simpan & Aktifkan Iklan</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: Rate Card */}
        {activeTab === 'rates' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Daftar Tarif Iklan Resmi (Rate Card WartaRadar)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standar tarif per 1.000 impresi (CPM), biaya per klik (CPC), dan tarif sewa flat harian.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 font-semibold">Posisi Slot</th>
                    <th className="pb-3 font-semibold">Nama Penempatan</th>
                    <th className="pb-3 font-semibold">Tarif CPM (per 1k tayang)</th>
                    <th className="pb-3 font-semibold">Tarif CPC (per klik)</th>
                    <th className="pb-3 font-semibold">Sewa Flat Harian</th>
                    <th className="pb-3 font-semibold">Spesifikasi Banner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rates.map(rate => (
                    <tr key={rate.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5">
                        <span className="font-mono bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-800">
                          {rate.placement}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-slate-900">{rate.name}</td>
                      <td className="py-3.5 font-mono text-emerald-700 font-semibold">
                        Rp {rate.cpmRate.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 font-mono text-blue-700 font-semibold">
                        Rp {rate.cpcRate.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 font-mono text-slate-800 font-bold">
                        Rp {rate.dailyFlatRate.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 text-slate-500 text-[11px]">{rate.specs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Pengiklan & Kampanye */}
        {activeTab === 'advertisers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 mb-4">
                Daftar Mitra Pengiklan Terdaftar ({advertisers.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {advertisers.map(adv => (
                  <div key={adv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-bold text-amber-700 uppercase">Klien #{adv.id}</span>
                        <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {adv.activeCampaigns} Kampanye Aktif
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base">{adv.company}</h4>
                      <p className="text-xs text-slate-500 mt-1">{adv.name}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs text-slate-600 space-y-0.5">
                      <div>Email: <span className="font-medium">{adv.email}</span></div>
                      <div>Kontak: <span className="font-medium">{adv.phone}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="font-extrabold text-base text-slate-900 mb-4">
                Kampanye Iklan Berjalan ({campaigns.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                      <th className="pb-3 font-semibold">Nama Kampanye</th>
                      <th className="pb-3 font-semibold">Total Anggaran</th>
                      <th className="pb-3 font-semibold">Teralokasi</th>
                      <th className="pb-3 font-semibold">Periode</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {campaigns.map(camp => (
                      <tr key={camp.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-slate-900">{camp.name}</td>
                        <td className="py-3 font-mono font-semibold">Rp {camp.budget.toLocaleString('id-ID')}</td>
                        <td className="py-3 font-mono text-emerald-700 font-semibold">Rp {camp.spent.toLocaleString('id-ID')}</td>
                        <td className="py-3 text-slate-500">{camp.startDate} s/d {camp.endDate}</td>
                        <td className="py-3">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                            {camp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Faktur & Tagihan */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-slate-900 mb-4">
              Status Faktur & Tagihan Iklan
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 font-semibold">No. Invoice</th>
                    <th className="pb-3 font-semibold">Nama Pengiklan</th>
                    <th className="pb-3 font-semibold">Kampanye</th>
                    <th className="pb-3 font-semibold">Nominal Tagihan</th>
                    <th className="pb-3 font-semibold">Tanggal Terbit</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-slate-900">{inv.id}</td>
                      <td className="py-3 font-medium text-slate-800">{inv.advertiserName}</td>
                      <td className="py-3 text-slate-600">{inv.campaignName}</td>
                      <td className="py-3 font-mono font-bold text-slate-900">Rp {inv.amount.toLocaleString('id-ID')}</td>
                      <td className="py-3 text-slate-500">{inv.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          inv.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
