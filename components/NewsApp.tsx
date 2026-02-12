
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  TrendingUp, 
  Clock, 
  ExternalLink, 
  Sparkles,
  BookOpen,
  Share2,
  Bookmark,
  Newspaper,
  Zap,
  Radio as RadioIcon,
  Trophy,
  Filter
} from 'lucide-react';
import { fetchLatestDeskReports } from '../services/geminiService';

const NewsApp: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDesk, setActiveDesk] = useState('World');

  const updateDeskFeed = async (query?: string) => {
    setIsUpdating(true);
    try {
      const reports = await fetchLatestDeskReports(query);
      setData(reports);
    } catch (error) {
      console.error("Newsroom Sync Failure:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    updateDeskFeed(`Top ${activeDesk} global reports today`);
  }, []);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateDeskFeed(`${searchQuery} in the context of ${activeDesk} news`);
  };

  const deskCategories = [
    { name: 'World', icon: Globe },
    { name: 'Politics', icon: BookOpen },
    { name: 'Sports', icon: Trophy },
    { name: 'Finance', icon: TrendingUp },
    { name: 'Technology', icon: Zap },
    { name: 'Health', icon: RadioIcon }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Search & Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200 pb-12">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-4">
            <RadioIcon size={14} className="animate-pulse" />
            <span>Authenticated Global Dispatch</span>
          </div>
          <h2 className="text-6xl font-serif font-bold text-slate-900 leading-[1.1]">
            Global <span className="text-rose-600 italic">Threads</span>
          </h2>
          <p className="text-slate-500 mt-6 text-xl leading-relaxed font-medium">
            Curated narratives and field dispatches, verified by the world's leading editorial staff.
          </p>
        </div>
        
        <form onSubmit={handleManualSearch} className="flex-1 max-w-md w-full">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={22} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search the ${activeDesk} archive...`}
              className="w-full pl-16 pr-6 py-5 bg-white border-2 border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200/40 outline-none focus:border-rose-500/50 transition-all text-sm font-semibold"
            />
          </div>
        </form>
      </div>

      {/* Desk Selection & Secondary Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {deskCategories.map((desk) => (
            <button
              key={desk.name}
              onClick={() => {
                setActiveDesk(desk.name);
                updateDeskFeed(`Top ${desk.name} headlines today`);
              }}
              className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border-2 flex items-center space-x-3 ${
                activeDesk === desk.name 
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xl shadow-rose-200/50' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              <desk.icon size={16} />
              <span>{desk.name}</span>
            </button>
          ))}
        </div>
        <button className="flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors text-sm font-bold bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <Filter size={18} />
          <span>Advanced Filter</span>
        </button>
      </div>

      {isUpdating ? (
        <div className="flex flex-col items-center justify-center py-48 space-y-10">
          <div className="relative">
            <div className="h-32 w-32 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
            <Newspaper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-400" size={40} />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-3 tracking-tight">Syncing Editorial Data</h3>
            <p className="text-slate-400 font-medium animate-pulse tracking-wide uppercase text-xs">Verifying cross-border dispatches & generating visuals...</p>
          </div>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Lead Insight */}
            <section className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl shadow-slate-900/30">
               <div className="relative z-10">
                 <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-rose-600/30 p-2 rounded-xl backdrop-blur-md border border-rose-500/20">
                      <Sparkles size={24} className="text-rose-400" />
                    </div>
                    <span className="text-rose-400 font-black text-xs uppercase tracking-widest">Editorial Executive Briefing</span>
                 </div>
                 <div className="prose prose-invert prose-lg max-w-none">
                   <p className="text-slate-300 font-serif text-2xl leading-relaxed italic">
                     {data.content}
                   </p>
                 </div>
               </div>
               <div className="absolute bottom-[-10%] right-[-5%] text-white/5 group-hover:scale-110 transition-transform duration-1000">
                  <Globe size={400} />
               </div>
            </section>

            {/* Narrative Threads with Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.threads?.map((thread: any, idx: number) => (
                <article key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="h-64 overflow-hidden relative">
                    {thread.imageUrl ? (
                      <img 
                        src={thread.imageUrl} 
                        alt={thread.headline} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
                        <Newspaper className="text-slate-300" size={48} />
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/20">Verified Report</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-rose-600 transition-colors">{thread.headline}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">{thread.summary}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                       <button className="flex items-center space-x-2 text-rose-600 text-xs font-black uppercase tracking-widest hover:text-rose-700">
                         <span>Full Dispatch</span>
                         <ExternalLink size={14} />
                       </button>
                       <div className="flex items-center space-x-2">
                          <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><Bookmark size={16} /></button>
                          <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><Share2 size={16} /></button>
                       </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Side Bar / Sources */}
          <aside className="lg:col-span-4 space-y-8">
             <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-28">
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-50">
                   <h3 className="font-bold text-slate-900 flex items-center text-lg">
                     <Clock className="mr-3 text-rose-600" size={24} /> Field Citations
                   </h3>
                   <span className="bg-emerald-50 text-emerald-600 text-[10px] px-3 py-1 rounded-full font-black border border-emerald-100">LIVE FEED</span>
                </div>
                
                <div className="space-y-6">
                  {data.citations?.map((source: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group block p-6 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-rose-100 rounded-[2rem] transition-all hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                         <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                            <Globe size={16} className="text-slate-400 group-hover:text-rose-600 transition-colors" />
                         </div>
                         <ExternalLink size={14} className="text-slate-300 group-hover:text-rose-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-rose-600 mb-2">{source.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new URL(source.uri).hostname}</p>
                    </a>
                  ))}
                  {!data.citations?.length && (
                    <div className="text-center py-20 px-6">
                       <RadioIcon size={40} className="text-slate-200 mx-auto mb-4" />
                       <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">Direct bureau link established. Monitoring citations...</p>
                    </div>
                  )}
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100">
                   <div className="bg-gradient-to-br from-rose-50 to-indigo-50 p-6 rounded-[2rem] border border-white">
                      <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center"><Zap size={16} className="mr-2 text-rose-600" /> Desk Subscription</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">
                        Receive instant alerts for breaking news in the {activeDesk} sector.
                      </p>
                      <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:scale-[1.02] transition-transform">Enable Notifications</button>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default NewsApp;
