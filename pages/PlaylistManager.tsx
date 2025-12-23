
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  ListMusic, 
  Search, 
  Trash2, 
  Edit3, 
  Copy, 
  Play,
  GripVertical,
  Calendar
} from 'lucide-react';
import { MOCK_SCRIPTS } from '../constants';

const PlaylistManager: React.FC = () => {
  const [scripts, setScripts] = useState(MOCK_SCRIPTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = scripts.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout title="Playlist Manager">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search saved scripts..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
          New Script
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map((script, idx) => (
          <div key={script.id} className="group bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all hover:border-indigo-100">
            <div className="text-slate-300 cursor-move">
              <GripVertical size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest">#{idx + 1}</span>
                <h4 className="font-bold text-slate-800 text-lg">{script.title}</h4>
              </div>
              <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5"><Play size={14}/> {script.videoName}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14}/> {script.createdAt}</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 uppercase text-[9px] font-bold">{script.resolution} @ {script.fps}fps</span>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-3 bg-slate-50 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all" title="Duplicate"><Copy size={18}/></button>
              <button className="p-3 bg-slate-50 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all" title="Edit"><Edit3 size={18}/></button>
              <button className="p-3 bg-slate-50 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all" title="Delete"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PlaylistManager;
