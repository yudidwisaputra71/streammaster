
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulasi pengecekan database
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'password123') {
        localStorage.setItem('isAuth', 'true');
        navigate('/overview');
        window.location.reload(); // Memastikan state rute diperbarui
      } else {
        setError('Username atau Password salah! (Hint: admin / password123)');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="flex items-center gap-3 justify-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-2xl shadow-indigo-500/50">
             <Activity className="text-white" size={32} />
          </div>
          <div className="text-white">
             <h1 className="text-2xl font-black leading-tight tracking-tight uppercase">StreamMaster</h1>
             <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">VPS Dashboard v2.0</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-slate-100 animate-in zoom-in duration-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Login Administrator</h2>
          <p className="text-slate-500 text-sm mb-8">Gunakan akun VPS Master untuk mengakses sistem</p>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-xs font-bold animate-in shake duration-300">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Username</label>
              <input 
                type="text" 
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
               <button type="button" className="text-[10px] font-bold text-indigo-600 uppercase hover:underline">Lupa Password?</button>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-xl shadow-slate-200"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
             <ShieldCheck size={16}/>
             <span className="text-[10px] font-bold uppercase tracking-widest">Secure Admin Access Only</span>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-500 text-xs font-medium">
          Default: <span className="text-indigo-400 font-bold">admin</span> / <span className="text-indigo-400 font-bold">password123</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
