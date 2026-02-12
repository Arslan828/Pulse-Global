
import React from 'react';
import { X, Bell, Zap, Radio, Clock } from 'lucide-react';
import { Notification } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 transition-opacity" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[60] animate-in slide-in-from-right duration-300">
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center">
              <Bell className="mr-3 text-rose-600" size={24} />
              Editorial Alerts
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif.id} className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:shadow-lg ${notif.read ? 'bg-white border-slate-100' : 'bg-rose-50/50 border-rose-100 shadow-sm'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      {notif.type === 'breaking' ? <Zap size={14} className="text-rose-600" /> : <Radio size={14} className="text-indigo-600" />}
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{notif.type}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center"><Clock size={10} className="mr-1" /> {notif.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1 group-hover:text-rose-600 transition-colors">{notif.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{notif.message}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Bell size={48} className="text-slate-100 mb-4" />
                <p className="text-slate-400 font-bold text-sm">No new dispatches</p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
