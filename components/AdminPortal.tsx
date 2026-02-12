
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Settings, 
  Database, 
  Server, 
  RefreshCw, 
  Search, 
  Filter, 
  MoreVertical,
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Cpu,
  Layers,
  Network,
  PenTool
} from 'lucide-react';
// Correct the import from getSystemInsights to getEditorialPerformanceInsights
import { getEditorialPerformanceInsights } from '../services/geminiService';

const NewsroomAdmin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any[]>([]);

  const fetchEditorialInsights = async () => {
    setLoading(true);
    try {
      // Use getEditorialPerformanceInsights instead of the undefined getSystemInsights
      const data = await getEditorialPerformanceInsights({
        activeEditors: 12,
        serverUptime: '99.99%',
        apiCrawlRate: '4,200/hr',
        contentAudit: 'Clear'
      });
      setInsights(data);
    } catch (error) {
      console.error("Editorial Insight Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditorialInsights();
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-10">
        <div>
          <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tight">Editorial <span className="text-rose-600">Operations Desk</span></h2>
          <p className="text-slate-500 mt-2 text-lg font-medium">Manage editorial staff, data ingestion, and journalistic infrastructure.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-6 py-3 border-2 border-slate-100 rounded-2xl bg-white hover:border-rose-200 transition-all text-sm font-bold text-slate-600">
            <RefreshCw size={18} className="mr-3" /> System Audit
          </button>
          <button className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all text-sm font-bold shadow-xl shadow-slate-900/20">
            <Database size={18} className="mr-3" /> Export Archives
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Data Clusters', value: '18 Active', icon: Network, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Feed Integration', value: '4.2k req/m', icon: Cpu, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Editorial Queue', value: '14 Pending', icon: Layers, color: 'bg-rose-50 text-rose-600' },
          { label: 'Network Integrity', value: 'Optimal', icon: Server, color: 'bg-amber-50 text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-5 hover:shadow-lg transition-all">
            <div className={`${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-xl font-bold text-slate-900">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-xl text-slate-900">Desk Correspondents</h3>
            <div className="flex space-x-3">
              <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                <Search size={20} />
              </button>
              <button className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                <Filter size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5">Correspondent</th>
                  <th className="px-8 py-5">Desk</th>
                  <th className="px-8 py-5">Authority</th>
                  <th className="px-8 py-5">Connectivity</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Muhammad Arslan', email: 'arslan@pulse.global', desk: 'Editorial Board', role: 'Editor-in-Chief', status: 'Online' },
                  { name: 'Fatima Zahra', email: 'fatima@pulse.global', desk: 'Geopolitics', role: 'Sr. Correspondent', status: 'Online' },
                  { name: 'Marcus Kane', email: 'marcus@pulse.global', desk: 'Finance', role: 'Staff Writer', status: 'Offline' },
                  { name: 'Omar Farooq', email: 'omar@pulse.global', desk: 'Technology', role: 'Specialist', status: 'Online' },
                  { name: 'Elena Rossi', email: 'elena@pulse.global', desk: 'Culture', role: 'Contributor', status: 'Away' },
                ].map((user, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center">
                        <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm shadow-inner overflow-hidden border border-slate-200">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-bold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter bg-slate-100 text-slate-600 border border-slate-200">
                        {user.desk}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-700">{user.role}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`flex items-center text-[10px] font-black uppercase tracking-widest ${user.status === 'Online' ? 'text-rose-600' : 'text-slate-400'}`}>
                        <div className={`w-2 h-2 rounded-full mr-3 ${user.status === 'Online' ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'}`}></div>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-300 hover:text-slate-600 p-2 hover:bg-white rounded-lg transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-[#1e1e2d] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="flex items-center space-x-3 mb-10">
              <div className="bg-rose-600/20 p-2.5 rounded-2xl backdrop-blur-md border border-rose-500/20 shadow-lg shadow-rose-900/20">
                <PenTool size={24} className="text-rose-400" />
              </div>
              <h3 className="font-bold font-serif text-2xl tracking-tight text-white">Editorial Strategy</h3>
            </div>
            
            <div className="space-y-5">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-5">
                  <div className="h-12 w-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin"></div>
                  <p className="text-rose-200 text-xs font-bold uppercase tracking-widest animate-pulse">Analyzing Desk Telemetry...</p>
                </div>
              ) : (
                insights.map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 group hover:bg-white/10 transition-all cursor-default shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-rose-300 group-hover:text-rose-200 transition-colors">{item.title}</h4>
                      {item.priority === 'High' ? (
                        <div className="p-1.5 bg-orange-500/20 rounded-lg"><AlertTriangle size={14} className="text-orange-400" /></div>
                      ) : (
                        <div className="p-1.5 bg-emerald-500/20 rounded-lg"><CheckCircle2 size={14} className="text-emerald-400" /></div>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{item.insight}</p>
                  </div>
                ))
              )}
            </div>
            
            {!loading && (
              <button 
                onClick={fetchEditorialInsights}
                className="w-full mt-10 py-4 bg-rose-600 hover:bg-rose-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-900/40"
              >
                Update Briefing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsroomAdmin;
