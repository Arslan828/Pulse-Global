
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  TrendingUp, 
  Clock, 
  ExternalLink, 
  Loader2,
  Sparkles,
  BookOpen,
  Share2,
  Bookmark,
  Volume2,
  Newspaper,
  Zap,
  Radio as RadioIcon,
  Trophy
} from 'lucide-react';
import { fetchGlobalNews } from '../services/geminiService';

const NewsApp: React.FC = () => {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('World');

  const getNews = async (query?: string) => {
    setLoading(true);
    try {
      const data = await fetchGlobalNews(query);
      setNews(data);
    } catch (error) {
      console.error("Feed Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getNews(searchQuery);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-10">
        <div className="max-w-xl">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-3">
            <RadioIcon size={14} className="animate-pulse" />
            <span>Reporting from our Global Desks</span>
          </div>
          <h2 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
            The <span className="text-rose-600 underline decoration-rose-200 underline-offset-8">Global Record</span>
          </h2>
          <p className="text-slate-500 mt-5 text-lg leading-relaxed font-medium">
            Curated coverage from verified correspondents worldwide, updated every minute for clarity and precision.
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md w-full">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors" size={20} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports or countries..."
              className="w-full pl-14 pr-5 py-4 bg-white border-2 border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 outline-none focus:border-rose-500/50 transition-all text-sm font-medium"
            />
          </div>
        </form>
      </div>

      {/* Modern Filter Strip */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-4 no-scrollbar">
        {['World', 'Politics', 'Finance', 'Sports', 'Tech', 'Energy', 'Science', 'Health'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setFilter(tag);
              getNews(`Top ${tag} global reports today`);
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border-2 flex items-center space-x-2 ${
              filter === tag 
                ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-200' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:text-slate-800 shadow-sm'
            }`}
          >
            {tag === 'Sports' && <Trophy size={14} />}
            <span>{tag}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-8">
          <div className="relative">
            <div className="h-24 w-24 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
            <Newspaper className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-400" size={32} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-serif font-bold text-slate-900 mb-2">Refreshing Global Desk</p>
            <p className="text-slate-400 font-medium animate-pulse">Our networks are verifying incoming reports...</p>
          </div>
        </div>
      ) : news ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-3 text-rose-600 font-black text-xs uppercase tracking-tighter mb-1">
                        <BookOpen size={16} />
                        <span>Lead Editorial Briefing</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">By Pulse Editorial Staff • Today</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Volume2 size={18} /></button>
                  <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Share2 size={18} /></button>
                  <button className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><Bookmark size={18} /></button>
                </div>
              </div>
              
              <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed font-serif">
                {news.text}
              </div>

              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl"></div>
            </div>

            <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                   <TrendingUp className="text-rose-500" size={20} />
                   <span className="text-rose-400 font-bold text-xs uppercase tracking-widest">Global Desk Dispatch</span>
                </div>
                <h3 className="text-3xl font-serif font-bold mb-5 group-hover:text-rose-400 transition-colors">Shift in Transcontinental Trade Routes: Analysis</h3>
                <p className="text-slate-400 mb-8 max-w-xl text-lg leading-relaxed">Our economics desk evaluates the ripples sent through logistics sectors following recent policy updates in the Asia-Pacific region.</p>
                <button className="flex items-center space-x-3 bg-white text-slate-900 px-8 py-3.5 rounded-2xl font-bold hover:bg-rose-50 transition-all shadow-xl shadow-rose-900/40">
                  <BookOpen size={20} />
                  <span>Read the Full Dispatch</span>
                </button>
              </div>
              <div className="absolute bottom-[-10%] right-[-5%] text-white/5 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Globe size={320} />
              </div>
            </div>
          </div>

          {/* Side Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-28">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 flex items-center text-lg">
                  <Clock className="mr-3 text-rose-600" size={20} /> Field Reports
                </h3>
                <span className="flex items-center px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] rounded-lg font-black border border-emerald-100">AUTHENTICATED</span>
              </div>
              
              <div className="space-y-5">
                {news.sources && news.sources.length > 0 ? (
                  news.sources.map((source: any, idx: number) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex flex-col p-5 bg-slate-50 hover:bg-white rounded-2xl transition-all border-2 border-transparent hover:border-rose-100 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 bg-white rounded-lg shadow-sm border border-slate-100">
                           <Globe size={14} className="text-slate-400 group-hover:text-rose-600" />
                        </div>
                        <ExternalLink size={12} className="text-slate-300 group-hover:text-rose-400" />
                      </div>
                      <p className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug group-hover:text-rose-700">{source.title || 'Original Dispatch'}</p>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new URL(source.uri).hostname}</span>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-10 px-4">
                    <p className="text-sm text-slate-400 italic">Reports currently being drafted by our worldwide desk. Direct citations pending final audit.</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                 <div className="bg-rose-50 p-5 rounded-2xl">
                    <h4 className="font-bold text-rose-900 text-sm mb-2 flex items-center"><Zap size={14} className="mr-2" /> Staff Insight</h4>
                    <p className="text-xs text-rose-700/80 leading-relaxed font-medium">
                      Pulse Global leverages deep verification networks to ensure every report meets our rigorous journalistic standards.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[2.5rem] border-4 border-dashed border-slate-100 animate-pulse">
           <div className="max-w-xs mx-auto space-y-4">
              <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <Globe size={32} />
              </div>
              <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Initializing Global Dispatch Connection</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default NewsApp;
