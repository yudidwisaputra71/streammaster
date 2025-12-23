
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Wifi, 
  Play, 
  Square, 
  Eye, 
  TrendingUp,
  Terminal,
  History,
  DownloadCloud,
  UploadCloud,
  Layers
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StreamStatus } from '../types';

// Mock data reflecting realistic fluctuations
const MOCK_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  cpu: parseFloat((Math.random() * 40 + 20).toFixed(1)),
  ram: parseFloat((Math.random() * 2 + 1).toFixed(1)), // GB
  disk: parseFloat((Math.random() * 5 + 120).toFixed(1)), // GB
  netUp: parseFloat((Math.random() * 50 + 10).toFixed(1)), // Mbps
  netDown: parseFloat((Math.random() * 80 + 30).toFixed(1)), // Mbps
  activeStreams: Math.floor(Math.random() * 5) + 1,
}));

const METRICS_CONFIG = [
  { id: 'cpu', label: 'CPU', color: '#6366f1', unit: '%' },
  { id: 'ram', label: 'RAM', color: '#10b981', unit: ' GB' },
  { id: 'disk', label: 'Disk', color: '#f59e0b', unit: ' GB' },
  { id: 'netUp', label: 'Net Up', color: '#3b82f6', unit: ' Mbps' },
  { id: 'netDown', label: 'Net Down', color: '#ec4899', unit: ' Mbps' },
  { id: 'activeStreams', label: 'Streams', color: '#8b5cf6', unit: ' stream' },
];

const Overview: React.FC = () => {
  const [stats, setStats] = useState({
    cpu: "24.5%",
    ram: "1.6 GB",
    storage: "120.5 GB",
    netUp: "14.2 Mbps ↑",
    netDown: "42.8 Mbps ↓",
    active: "3 stream"
  });

  const [visibleMetrics, setVisibleMetrics] = useState({
    cpu: true,
    ram: true,
    disk: false,
    netUp: false,
    netDown: false,
    activeStreams: true,
  });

  const [streams, setStreams] = useState([
    { id: '1', name: 'Nature 24/7', status: StreamStatus.ONLINE, uptime: '12:45:02', pid: 14205 },
    { id: '2', name: 'Product Promo', status: StreamStatus.OFFLINE, uptime: '00:00:00', pid: null },
    { id: '3', name: 'News Stream', status: StreamStatus.ONLINE, uptime: '02:15:30', pid: 18992 },
  ]);

  const toggleMetric = (id: string) => {
    setVisibleMetrics(prev => ({ ...prev, [id]: !prev[id as keyof typeof visibleMetrics] }));
  };

  return (
    <Layout title="System Overview">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard icon={<Cpu className="text-indigo-600" />} label="CPU Usage" value={stats.cpu} color="indigo" />
        <StatCard icon={<Activity className="text-emerald-600" />} label="RAM Usage" value={stats.ram} color="emerald" />
        <StatCard icon={<HardDrive className="text-amber-600" />} label="Storage" value={stats.storage} color="amber" />
        <StatCard icon={<UploadCloud className="text-blue-600" />} label="Net Upload" value={stats.netUp} color="blue" />
        <StatCard icon={<DownloadCloud className="text-pink-600" />} label="Net Download" value={stats.netDown} color="pink" />
        <StatCard icon={<Play className="text-rose-600" />} label="Active Streams" value={stats.active} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Resource Utilization Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Resource Utilization</h3>
                <p className="text-xs text-slate-400 mt-1 italic">*Skala grafik otomatis menyesuaikan usage aktif</p>
              </div>
              
              {/* Checkbox Filters */}
              <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
                {METRICS_CONFIG.map(metric => (
                  <label 
                    key={metric.id} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all text-[10px] font-bold uppercase tracking-wider ${
                      visibleMetrics[metric.id as keyof typeof visibleMetrics] 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-white border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={visibleMetrics[metric.id as keyof typeof visibleMetrics]}
                      onChange={() => toggleMetric(metric.id)}
                    />
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: metric.color }}
                    ></span>
                    {metric.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" hide />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                    formatter={(value: any, name: string) => {
                      const config = METRICS_CONFIG.find(c => c.id === name);
                      return [`${value}${config?.unit || ''}`, config?.label || name];
                    }}
                  />
                  {METRICS_CONFIG.map(metric => visibleMetrics[metric.id as keyof typeof visibleMetrics] && (
                    <Area 
                      key={metric.id}
                      type="monotone" 
                      dataKey={metric.id} 
                      name={metric.id}
                      stroke={metric.color} 
                      strokeWidth={3} 
                      fillOpacity={0.05} 
                      fill={metric.color} 
                      animationDuration={1500}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Active Processes (RTMP)</h3>
              <div className="flex gap-2">
                 <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-tight">
                    <Play size={10} fill="currentColor" /> {stats.active} Running
                 </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stream Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">PID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Uptime</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {streams.map((stream) => (
                    <tr key={stream.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{stream.name}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-tight ${
                          stream.status === StreamStatus.ONLINE ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            stream.status === StreamStatus.ONLINE ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                          }`}></span>
                          {stream.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{stream.pid || '-'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{stream.uptime}</td>
                      <td className="px-6 py-4 text-right space-x-1">
                        {stream.status === StreamStatus.ONLINE ? (
                          <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Stop Stream"><Square size={16} fill="currentColor" /></button>
                        ) : (
                          <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all" title="Start Stream"><Play size={16} fill="currentColor" /></button>
                        )}
                        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all"><Eye size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
            <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Total Bandwidth</h4>
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold">1.2 TB</span>
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <TrendingUp size={16} />
                <span className="text-xs font-bold">+12%</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span>Usage: 1.2 TB</span>
                <span>Limit: 2.0 TB</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Packet Loss</p>
                <p className="text-lg font-bold text-white">0.02%</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Latency</p>
                <p className="text-lg font-bold text-white">14ms</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton icon={<Play size={20}/>} label="New Stream" color="indigo" />
              <QuickActionButton icon={<GalleryIcon size={20}/>} label="Gallery" color="emerald" />
              <QuickActionButton icon={<Terminal size={20}/>} label="Script Maker" color="amber" />
              <QuickActionButton icon={<History size={20}/>} label="History" color="slate" />
            </div>
          </div>

          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 text-sm mb-2 flex items-center gap-2">
              <Activity size={16} /> Server Advice
            </h4>
            <p className="text-xs text-indigo-700 leading-relaxed">
              Resource CPU Anda saat ini sangat stabil (24.5%). Anda dapat menjalankan hingga 4 stream tambahan tanpa mempengaruhi performa server utama.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`p-3 rounded-2xl bg-${color}-50`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-lg font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const QuickActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
  <button className={`flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all gap-2 group`}>
    <div className={`text-indigo-600 group-hover:scale-110 transition-transform`}>{icon}</div>
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{label}</span>
  </button>
);

const GalleryIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

export default Overview;
