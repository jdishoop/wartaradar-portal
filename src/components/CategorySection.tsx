import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Landmark, 
  TrendingUp, 
  Trophy, 
  Cpu, 
  Film, 
  Coffee,
  ChevronRight,
  Compass,
  Tag,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { posts, navigateToCategory, categories } = useApp();

  const iconMap: Record<string, { icon: any; color: string; desc: string }> = {
    'Nasional': { icon: Building2, color: 'bg-red-500/10 text-red-600', desc: 'Isu publik & regulasi' },
    'Politik': { icon: Landmark, color: 'bg-amber-500/10 text-amber-700', desc: 'Parlemen & kebijakan' },
    'Ekonomi': { icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-700', desc: 'Pasar, investasi & bisnis' },
    'Olahraga': { icon: Trophy, color: 'bg-blue-500/10 text-blue-600', desc: 'Prestasi atlet & liga' },
    'Teknologi': { icon: Cpu, color: 'bg-indigo-500/10 text-indigo-600', desc: 'AI, inovasi & gadget' },
    'Hiburan': { icon: Film, color: 'bg-purple-500/10 text-purple-600', desc: 'Sinema, musik & seni' },
    'Lifestyle': { icon: Coffee, color: 'bg-teal-500/10 text-teal-600', desc: 'Kesehatan & gaya hidup' },
    'Investigasi': { icon: ShieldCheck, color: 'bg-rose-500/10 text-rose-700', desc: 'Liputan mendalam redaksi' },
    'Daerah': { icon: Compass, color: 'bg-sky-500/10 text-sky-700', desc: 'Kabar pelosok nusantara' },
    'Hukum & HAM': { icon: Scale, color: 'bg-slate-500/10 text-slate-800', desc: 'Peradilan & hak sipil' }
  };

  return (
    <section className="section-wrap my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Kanal Berita Pilihan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Jelajahi liputan mendalam berdasarkan rubrik jurnalisme WartaRadar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map((catName) => {
            const config = iconMap[catName] || { icon: Tag, color: 'bg-sky-500/10 text-sky-700', desc: 'Rubrik jurnalisme' };
            const Icon = config.icon;
            const count = posts.filter(p => p.category === catName && p.status === 'published').length;

            return (
              <div
                key={catName}
                onClick={() => navigateToCategory(catName)}
                className="group cursor-pointer bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#003366] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${config.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#003366] transition-colors">
                    {catName}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {config.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{count} artikel</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#b99243] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
