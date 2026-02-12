
import React from 'react';
import { AppView } from '../types';
import { 
  ShieldCheck, 
  Menu,
  ChevronLeft,
  Globe,
  Radio,
  Bookmark,
  History,
  PenTool,
  Lock
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  toggle: () => void;
  isLoggedIn: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, toggle, isLoggedIn }) => {
  const navItems = [
    { id: AppView.NEWS_APP, label: 'Global Feed', icon: Globe, protected: false },
    { id: AppView.USER_DASHBOARD, label: 'Daily Briefing', icon: Radio, protected: true },
    { id: AppView.ADMIN_PORTAL, label: 'Editorial Desk', icon: ShieldCheck, protected: true },
  ];

  return (
    <aside className={`bg-[#0f172a] text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col border-r border-slate-800`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-800/50">
        <div className={`flex items-center space-x-3 overflow-hidden ${!isOpen && 'justify-center'}`}>
          <div className="bg-rose-600 p-2 rounded-lg shadow-lg shadow-rose-900/20">
            <Radio size={20} className="animate-pulse" />
          </div>
          {isOpen && <span className="font-serif font-bold text-xl tracking-tight whitespace-nowrap">Pulse Global</span>}
        </div>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1.5">
        <p className={`text-[10px] uppercase font-bold text-slate-500 mb-2 px-4 ${!isOpen && 'hidden'}`}>
          Newsroom
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center p-3 rounded-xl transition-all relative group ${
              currentView === item.id 
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <item.icon size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
            {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            {item.protected && !isLoggedIn && (
               <div className={`absolute ${isOpen ? 'right-3' : 'top-1 right-1'} text-slate-500`}>
                 <Lock size={12} />
               </div>
            )}
          </button>
        ))}

        <div className="pt-6 mt-6 border-t border-slate-800/50">
          <p className={`text-[10px] uppercase font-bold text-slate-500 mb-2 px-4 ${!isOpen && 'hidden'}`}>
            My Pulse
          </p>
          <button 
            disabled={!isLoggedIn}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${isLoggedIn ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-700 cursor-not-allowed opacity-50'}`}
          >
            <Bookmark size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
            {isOpen && <span className="text-sm font-medium">Saved Reports</span>}
          </button>
          <button 
            disabled={!isLoggedIn}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${isLoggedIn ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-700 cursor-not-allowed opacity-50'}`}
          >
            <History size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
            {isOpen && <span className="text-sm font-medium">Reading History</span>}
          </button>
          <button 
            disabled={!isLoggedIn}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${isLoggedIn ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white' : 'text-slate-700 cursor-not-allowed opacity-50'}`}
          >
            <PenTool size={20} className={isOpen ? 'mr-3' : 'mx-auto'} />
            {isOpen && <span className="text-sm font-medium">Editorial Tools</span>}
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <button 
          onClick={toggle}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-slate-400"
        >
          {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
