
import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Zap,
  Bookmark,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const consumptionData = [
  { name: 'Mon', newsCount: 12, briefings: 8 },
  { name: 'Tue', newsCount: 19, briefings: 15 },
  { name: 'Wed', newsCount: 15, briefings: 12 },
  { name: 'Thu', newsCount: 22, briefings: 20 },
  { name: 'Fri', newsCount: 30, briefings: 25 },
  { name: 'Sat', newsCount: 10, briefings: 8 },
  { name: 'Sun', newsCount: 8, briefings: 6 },
];

const NewsStats: React.FC = () => {
  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12">
      {/* Reader Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Reports Completed', value: '412', change: '+12%', icon: Bookmark, color: 'bg-rose-50 text-rose-600' },
          { label: 'Reading Efficiency', value: '4.2h', change: '85%', icon: Clock, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Desks Covered', value: '28', change: 'Global', icon: Zap, color: 'bg-amber-50 text-amber-600' },
          { label: 'Engagement Score', value: '98', change: 'Excellent', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.change}</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mt-2">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Engagement Pulse</h3>
              <p className="text-slate-500 mt-1 font-medium">Weekly report interaction vs editorial briefings.</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
               <button className="px-4 py-1.5 text-xs font-bold bg-white text-slate-900 rounded-lg shadow-sm">Week</button>
               <button className="px-4 py-1.5 text-xs font-bold text-slate-400">Month</button>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="newsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="newsCount" 
                  stroke="#e11d48" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#newsGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
             <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Top Desk Interests</h3>
             <div className="space-y-5 relative z-10">
                {[
                  { tag: 'Sports Coverage', weight: '88%', color: 'bg-rose-500' },
                  { tag: 'Clean Technology', weight: '72%', color: 'bg-indigo-500' },
                  { tag: 'EU Regulation', weight: '45%', color: 'bg-amber-500' },
                  { tag: 'Market Indices', weight: '31%', color: 'bg-emerald-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                       <span>{item.tag}</span>
                       <span className="text-slate-400">{item.weight}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                       <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: item.weight }}></div>
                    </div>
                  </div>
                ))}
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600 rounded-full -mr-16 -mt-16 opacity-20 blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
             <div className="flex items-center space-x-3 mb-6">
                <Calendar className="text-rose-600" size={20} />
                <h4 className="font-bold text-slate-900">Editorial Calendar</h4>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Thursday @ 10AM</p>
                   <p className="text-sm font-bold text-slate-900">Sports: Global Finals Preview</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Friday @ 4PM</p>
                   <p className="text-sm font-bold text-slate-900">Weekly Finance Digest</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsStats;
