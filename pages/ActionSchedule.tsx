
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  CalendarClock, 
  Plus, 
  Play, 
  Square, 
  MoreVertical, 
  Terminal,
  Activity,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { MOCK_SCHEDULES } from '../constants';
import { StreamStatus } from '../types';

const ActionSchedule: React.FC = () => {
  const [projects, setProjects] = useState(MOCK_SCHEDULES);

  return (
    <Layout title="Action Schedule">
      <div className="flex justify-between items-center mb-8">
        <div>
           <p className="text-sm text-slate-500">Manage your automated streaming projects</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
          <Plus size={20} /> New Stream Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-5 ${project.status === StreamStatus.ONLINE ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
            
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${project.status === StreamStatus.ONLINE ? 'bg-emerald-50 bg-opacity-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {project.status === StreamStatus.ONLINE ? <Activity size={24} className="animate-pulse"/> : <CalendarClock size={24}/>}
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-600"><MoreVertical size={20}/></button>
            </div>

            <h4 className="font-bold text-slate-800 text-xl mb-1">{project.name}</h4>
            <p className="text-xs text-slate-500 font-medium mb-6 flex items-center gap-2">
               <Terminal size={12}/> {project.scriptTitle}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Status</p>
                  <p className={`text-xs font-bold ${project.status === StreamStatus.ONLINE ? 'text-emerald-600' : 'text-slate-600'}`}>{project.status}</p>
               </div>
               <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Uptime</p>
                  <p className="text-xs font-bold text-slate-800">{project.uptime || '--:--:--'}</p>
               </div>
            </div>

            <div className="flex gap-3">
              {project.status === StreamStatus.ONLINE ? (
                <button className="flex-1 py-3.5 bg-rose-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-700 shadow-lg shadow-rose-100">
                  <Square size={16} fill="white" /> Stop
                </button>
              ) : (
                <button className="flex-1 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100">
                  <Play size={16} fill="white" /> Start
                </button>
              )}
              <button className="px-4 py-3.5 bg-slate-100 text-slate-500 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                <Trash2 size={20}/>
              </button>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 rounded-[32px] p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/20 transition-all gap-4">
           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
             <Plus size={32} />
           </div>
           <span className="font-bold text-sm">Add New Canvas Project</span>
        </button>
      </div>

      <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
         <AlertCircle className="text-amber-500 shrink-0" size={24} />
         <div>
            <h5 className="font-bold text-amber-900 text-sm">Scheduler Persistence</h5>
            <p className="text-xs text-amber-800 leading-relaxed">Semua jadwal streaming akan tetap aktif meskipun server di-reboot. Sistem menggunakan crontab dan PM2 untuk menjaga proses FFmpeg tetap berjalan di background secara otomatis.</p>
         </div>
      </div>
    </Layout>
  );
};

export default ActionSchedule;
