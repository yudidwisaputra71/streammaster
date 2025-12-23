
import React from 'react';
import Layout from '../components/Layout';
import { 
  History, 
  Trash2, 
  Download, 
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { MOCK_HISTORY } from '../constants';
import { StreamStatus } from '../types';

const HistoryStream: React.FC = () => {
  return (
    <Layout title="Stream History">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div>
              <h3 className="text-xl font-bold text-slate-800">Activity Log</h3>
              <p className="text-sm text-slate-500">Historical record of all streaming events</p>
           </div>
           <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2">
                 <Download size={18}/> Export CSV
              </button>
              <button className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-100 transition-all flex items-center gap-2">
                 <Trash2 size={18}/> Clear All
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-4">Stream Name</th>
                <th className="px-8 py-4">Platform</th>
                <th className="px-8 py-4">Start Time</th>
                <th className="px-8 py-4">End Time</th>
                <th className="px-8 py-4">Duration</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_HISTORY.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-800">{h.name}</td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded capitalize">{h.platform}</span>
                  </td>
                  <td className="px-8 py-5 text-xs text-slate-600">{h.startTime}</td>
                  <td className="px-8 py-5 text-xs text-slate-600">{h.stopTime}</td>
                  <td className="px-8 py-5 font-mono text-xs text-slate-800">{h.duration}</td>
                  <td className="px-8 py-5">
                     {h.status === StreamStatus.OFFLINE ? (
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                           <CheckCircle2 size={14}/> Success
                        </span>
                     ) : (
                        <span className="flex items-center gap-1.5 text-rose-500 text-xs font-bold">
                           <XCircle size={14}/> Error
                        </span>
                     )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryStream;
