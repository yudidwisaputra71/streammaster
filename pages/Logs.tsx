
import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { 
  Download, 
  Trash2, 
  RefreshCw, 
  Filter, 
  Search,
  BrainCircuit,
  Terminal,
  Clock
} from 'lucide-react';
import { analyzeLogs } from '../services/geminiService';

const MOCK_LOGS = [
  "[2023-12-23 13:05:01] INFO: Starting FFmpeg stream 'Nature 24/7'",
  "[2023-12-23 13:05:02] DEBUG: PID 14205 assigned",
  "[2023-12-23 13:05:04] FFmpeg: frame=  120 fps= 30 q=28.0 size=     850kB time=00:00:04.00 bitrate=1740.0kbits/s speed=1.0x",
  "[2023-12-23 13:05:08] FFmpeg: frame=  240 fps= 30 q=28.0 size=    1700kB time=00:00:08.00 bitrate=1740.0kbits/s speed=1.0x",
  "[2023-12-23 13:05:10] WARNING: Network packet delay detected (200ms)",
  "[2023-12-23 13:05:12] FFmpeg: frame=  360 fps= 29 q=28.0 size=    2550kB time=00:00:12.00 bitrate=1734.0kbits/s speed=0.98x",
  "[2023-12-23 13:05:16] ERROR: RTMP publish failed (retrying in 5s...)",
  "[2023-12-23 13:05:21] INFO: Stream re-established successfully",
];

const Logs: React.FC = () => {
  const [logs, setLogs] = useState(MOCK_LOGS);
  const [filter, setFilter] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await analyzeLogs(logs.join('\n'));
    setAiAnalysis(result || "Unable to analyze.");
    setIsAnalyzing(false);
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <Layout title="System & Stream Logs">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search logs..." 
                    className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select 
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Logs</option>
                  <option value="error">Errors Only</option>
                  <option value="warning">Warnings</option>
                  <option value="ffmpeg">FFmpeg Output</option>
                </select>
             </div>
             <div className="flex gap-2">
                <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all" title="Refresh">
                  <RefreshCw size={20} />
                </button>
                <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all" title="Download">
                  <Download size={20} />
                </button>
                <button className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Clear All">
                  <Trash2 size={20} />
                </button>
             </div>
          </div>

          <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
            <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm">
                <Terminal size={16} /> console@streammaster:~$ tail -f /var/log/streams.log
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            <div className="p-6 h-[500px] overflow-y-auto font-mono text-sm leading-relaxed scrollbar-hide">
              {filteredLogs.map((log, idx) => (
                <div key={idx} className={`mb-1.5 group flex gap-4 ${
                  log.includes('ERROR') ? 'text-rose-400' : 
                  log.includes('WARNING') ? 'text-amber-400' : 
                  'text-slate-300'
                }`}>
                  <span className="text-slate-600 select-none">{idx + 1}</span>
                  <span>{log}</span>
                </div>
              ))}
              <div ref={logEndRef}></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit size={120} />
            </div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BrainCircuit size={24} />
              AI Log Insight
            </h3>
            <p className="text-sm text-indigo-100 mb-8 leading-relaxed">
              Use Gemini Pro to analyze your recent logs for errors, optimizations, and performance patterns.
            </p>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : 'Analyze Logs Now'}
            </button>
          </div>

          {aiAnalysis && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 animate-in slide-in-from-right duration-300">
               <h4 className="text-indigo-600 font-bold mb-4 flex items-center gap-2">
                 <Filter size={18} /> AI Summary
               </h4>
               <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                 {aiAnalysis}
               </div>
               <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 <span>Analysis generated by Gemini 3</span>
                 <button onClick={() => setAiAnalysis(null)}>Dismiss</button>
               </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Clock size={18} /> System Status
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Log File Size</span>
                <span className="font-bold text-slate-800">42.5 MB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Auto-Rotate</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md font-bold text-[10px]">ENABLED</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Last Cleanup</span>
                <span className="text-slate-800">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Logs;
