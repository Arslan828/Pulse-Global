
import React from 'react';
import { AppView } from '../types';
import { Bell, Search, User, Zap } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const getBreadcrumb = () => {
    switch(currentView) {
      case AppView.NEWS_APP: return 'Global News Desk';
      case AppView.USER_DASHBOARD: return 'Personal Briefings';
      case AppView.ADMIN_PORTAL: return 'Editorial Control';
      default: return 'Home';
    }
  };

  return (
    <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm shadow-slate-200/20">
      <div className="flex items-center space-x-6">
        <div>
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-0.5">Pulse Global Network</p>
          <h1 className="text-xl font-bold text-slate-900 flex items-center">
            {getBreadcrumb()}
            {currentView === AppView.NEWS_APP && <span className="ml-3 flex items-center px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] rounded-full font-black animate-pulse border border-rose-100 uppercase tracking-tighter">Live Feed</span>}
          </h1>
        </div>
        <div className="hidden lg:flex bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 items-center group focus-within:ring-2 focus-within:ring-rose-500/10 transition-all">
          <Search size={16} className="text-slate-400 group-focus-within:text-rose-600 mr-3" />
          <input 
            type="text" 
            placeholder="Search our global archive..." 
            className="bg-transparent border-none outline-none text-sm w-72 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md">
          <Zap size={14} className="text-amber-400" />
          <span>Full Access</span>
        </button>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 bg-rose-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">Alex Thompson</p>
              <p className="text-[10px] text-slate-500 font-medium">Editor-in-Chief</p>
            </div>
            <div className="bg-slate-100 text-slate-700 h-10 w-10 rounded-xl flex items-center justify-center border-2 border-slate-200 group-hover:border-rose-200 group-hover:bg-rose-50 transition-all overflow-hidden shadow-inner">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
