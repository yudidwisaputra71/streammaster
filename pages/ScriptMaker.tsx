
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Save, 
  Copy, 
  Settings,
  Terminal,
  PlayCircle,
  Hash
} from 'lucide-react';
import { MOCK_VIDEOS } from '../constants';

const ScriptMaker: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    videoId: '',
    streamKey: '',
    loopCount: -1, // Default to infinite
  });

  const [generatedScript, setGeneratedScript] = useState('');

  useEffect(() => {
    const video = MOCK_VIDEOS.find(v => v.id === formData.videoId);
    const videoName = video ? video.name : 'input.mp4';
    
    const script = `#!/bin/bash
# StreamMaster VPS Dashboard Generated Script
# Optimized for Direct Stream Copy (No Re-encoding)
# Title: ${formData.title || 'Untitled'}

RECONNECT_WAIT=3
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  ffmpeg -nostdin -loglevel warning -re \\
    -fflags +genpts+igndts \\
    -stream_loop ${formData.loopCount} \\
    -i "${videoName}" \\
    -c:v copy \\
    -c:a copy \\
    -f flv rtmps://a.rtmp.youtube.com/live2/${formData.streamKey || 'STREAM_KEY'}

  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 0 ]; then
    break
  else
    echo "Stream interrupted. Retrying in $RECONNECT_WAIT seconds..."
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep $RECONNECT_WAIT
  fi
done`;
    setGeneratedScript(script);
  }, [formData]);

  return (
    <Layout title="Script Maker">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Settings className="text-indigo-600" /> Stream Configuration
            </h3>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-full border border-emerald-100">
              Mode: Copy (Direct)
            </span>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Judul Script</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="Contoh: Streaming 24/7 Channel A" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Pilih Video</label>
                <div className="relative">
                  <select 
                    value={formData.videoId} 
                    onChange={e => setFormData({...formData, videoId: e.target.value})} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                  >
                    <option value="">-- Pilih dari Gallery --</option>
                    {MOCK_VIDEOS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <PlayCircle size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Loop Count</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.loopCount} 
                    onChange={e => setFormData({...formData, loopCount: parseInt(e.target.value) || 0})} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                    placeholder="-1 untuk infinite" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Hash size={18} />
                  </div>
                </div>
                <p className="mt-1.5 text-[10px] text-slate-400 italic font-medium ml-1">*Isi -1 untuk streaming tanpa henti (infinite loop)</p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">YouTube Stream Key</label>
              <input 
                type="password" 
                value={formData.streamKey} 
                onChange={e => setFormData({...formData, streamKey: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="Paste stream key anda di sini" 
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100">
              <Save size={20} /> Simpan ke Playlist Manager
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Technical Note:</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Script ini menggunakan parameter <code className="text-indigo-600 font-bold">-c:v copy</code> dan <code className="text-indigo-600 font-bold">-c:a copy</code>. 
              Ini berarti video tidak di-encode ulang oleh VPS, menghemat penggunaan CPU secara signifikan. Pastikan video asal sudah sesuai dengan standar streaming (H.264/AAC).
            </p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-indigo-400 font-mono flex flex-col h-[600px] lg:h-auto">
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-white" />
                <h3 className="text-white font-bold font-sans">Preview Script (.sh)</h3>
              </div>
              <button 
                onClick={() => {navigator.clipboard.writeText(generatedScript); alert("Script copied to clipboard!")}} 
                className="p-2.5 bg-slate-800 rounded-xl hover:bg-slate-700 text-white transition-all flex items-center gap-2 text-xs font-bold"
              >
                <Copy size={16}/> Copy
              </button>
           </div>
           <div className="flex-1 bg-slate-950 p-6 rounded-2xl overflow-y-auto whitespace-pre-wrap text-[13px] leading-relaxed border border-slate-800 scrollbar-hide">
             {generatedScript}
           </div>
           <div className="mt-6 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
             <span>Status: Ready to deploy</span>
             <span>Bash v4.0+ Recommended</span>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScriptMaker;
