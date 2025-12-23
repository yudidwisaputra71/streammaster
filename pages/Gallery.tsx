
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Plus, 
  Upload, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Clock,
  HardDrive
} from 'lucide-react';
import { MOCK_VIDEOS } from '../constants';

const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImport = () => {
    setImporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setImporting(false);
        setIsImportModalOpen(false);
        setImportUrl('');
        setProgress(0);
        alert("Video imported successfully from Google Drive!");
      }
      setProgress(p);
    }, 500);
  };

  return (
    <Layout title="Gallery Management">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 font-semibold text-sm"
          >
            <Plus size={18} />
            Import from Drive
          </button>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer font-semibold text-sm">
            <Upload size={18} />
            Upload Local
            <input type="file" className="hidden" accept="video/*" />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search videos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
            />
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_VIDEOS.map((video) => (
            <div key={video.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
                    <Play fill="white" size={24} />
                  </button>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-slate-800 truncate mb-3" title={video.name}>{video.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><HardDrive size={12}/> {video.size}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {video.uploadedAt}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit3 size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_VIDEOS.map((video) => (
                <tr key={video.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-3">
                    <div className="w-20 aspect-video bg-slate-200 rounded-lg overflow-hidden relative">
                      <img src={video.thumbnail} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">{video.name}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm font-medium">{video.duration}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{video.size}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{video.uploadedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 size={16} /></button>
                       <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">Showing <span className="text-slate-800 font-bold">1-3</span> of <span className="text-slate-800 font-bold">3</span> videos</p>
        <div className="flex items-center gap-2">
          <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 disabled:opacity-50"><ChevronLeft size={20} /></button>
          <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">1</button>
          <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 disabled:opacity-50"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ExternalLink className="text-indigo-600" size={24} />
                Import from Google Drive
              </h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="p-8">
              {!importing ? (
                <>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Paste your shared Google Drive link below. Ensure the file permissions are set to "Anyone with the link".
                  </p>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="https://drive.google.com/file/d/..."
                      value={importUrl}
                      onChange={(e) => setImportUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button 
                      onClick={handleImport}
                      disabled={!importUrl}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:bg-slate-300 shadow-xl shadow-indigo-100"
                    >
                      Start Download
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                  <h4 className="font-bold text-slate-800 mb-2">Downloading Video...</h4>
                  <p className="text-xs text-slate-500 mb-6">Processing gdown validator ({Math.round(progress)}%)</p>
                  <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                    <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const Play: React.FC<{ fill?: string, size?: number }> = ({ fill = "none", size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

export default Gallery;
