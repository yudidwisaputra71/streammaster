
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Activity, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/login');
    window.location.reload(); // Memastikan rute diproteksi ulang
  };

  return (
    <div className="w-64 bg-slate-900 h-screen fixed left-0 top-0 flex flex-col shadow-xl z-50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Activity className="text-white" size={24} />
        </div>
        <h1 className="text-white font-bold text-lg leading-tight">
          StreamMaster<br/>
          <span className="text-xs text-indigo-400 font-normal">VPS Dashboard v2.0</span>
        </h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
