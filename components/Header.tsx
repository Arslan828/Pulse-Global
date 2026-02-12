
import React, { useRef } from 'react';
import { AppView } from '../types';
import { Bell, Search, Zap, LogIn, Camera } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  toggleSidebar: () => void;
  onOpenNotifs: () => void;
  hasUnread: boolean;
  user: any;
  onSignInClick: () => void;
  onUpdateUser: (updates: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onOpenNotifs, hasUnread, user, onSignInClick, onUpdateUser }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getBreadcrumb = () => {
    switch(currentView) {
      case AppView.NEWS_APP: return 'Global News Desk';
      case AppView.USER_DASHBOARD: return 'Personal Briefings';
      case AppView.ADMIN_PORTAL: return 'Editorial Control';
      default: return 'Home';
    }
  };

  const handleAvatarClick = () => {
    if (!user) {
      onSignInClick();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm shadow-slate-200/20">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      
      <div className="flex items-center space-x-6">
        <div>
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-0.5">Pulse Global Network</p>
          <h1 className="text-xl font-bold text-slate-900 flex items-center">
            {getBreadcrumb()}
            {currentView === AppView.NEWS_APP && <span className="ml-3 flex items-center px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] rounded-full font-black animate-pulse border border-rose-100 uppercase tracking-tighter">Live Feed</span>}
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        {!user && (
          <button 
            onClick={onSignInClick}
            className="flex items-center space-x-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}
        
        {user && (
          <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md">
            <Zap size={14} className="text-amber-400" />
            <span>Full Access</span>
          </button>
        )}

        <div className="h-8 w-px bg-slate-200"></div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenNotifs}
            className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
          >
            <Bell size={20} />
            {hasUnread && <span className="absolute top-2.5 right-2.5 bg-rose-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>}
          </button>
          
          <div 
            onClick={handleAvatarClick}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                {user?.name || 'Guest User'}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                {user?.role || 'Limited Access'}
              </p>
            </div>
            <div className="relative bg-slate-100 h-10 w-10 rounded-xl flex items-center justify-center border-2 border-slate-200 group-hover:border-rose-400 group-hover:bg-rose-50 transition-all overflow-hidden shadow-inner">
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Guest'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
              {user && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={14} className="text-white" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
