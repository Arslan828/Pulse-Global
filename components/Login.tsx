
import React, { useState } from 'react';
import { Radio, Lock, Mail, User, ArrowRight, X } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth with updated name
    onLogin({ name: 'Muhammad Arslan', email, role: 'Editor-in-Chief' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Close/Guest Button */}
      <button 
        onClick={onCancel}
        className="absolute top-8 right-8 p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-20 group"
      >
        <X size={24} />
      </button>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-600 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="bg-rose-600 p-4 rounded-2xl shadow-xl shadow-rose-900/20 mb-6">
              <Radio size={32} className="text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Pulse Global</h1>
            <p className="text-slate-500 font-medium">Correspondent Network Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arslan@pulse.global"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Access Token</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-rose-500 transition-all font-medium text-slate-900"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center space-x-3 group"
            >
              <span>{isSignup ? 'Create Account' : 'Verify Credentials'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center space-y-4">
            <button 
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors"
            >
              {isSignup ? 'Already a correspondent? Login' : 'Request network access'}
            </button>
            
            <button 
              onClick={onCancel}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>
        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          Secured by Pulse Global Encryption
        </p>
      </div>
    </div>
  );
};

export default Login;
