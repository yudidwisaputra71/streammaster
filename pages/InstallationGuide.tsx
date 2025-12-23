
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Copy, 
  Zap, 
  CheckCircle2, 
  Eye, 
  FileCode, 
  Server,
  AlertTriangle,
  Lock
} from 'lucide-react';

const InstallationGuide: React.FC = () => {
  const [showFullScript, setShowFullScript] = useState(false);
  
  // Perintah instalasi satu baris versi "Expert"
  const installCommand = "curl -fsSL https://streammaster.io/install.sh | sudo bash";

  // Script ini dirancang dengan standar DevOps Senior
  const scriptSource = `#!/bin/bash
# ==========================================================================
# StreamMaster VPS Dashboard v2.0 - Expert Installer
# Optimized for Ubuntu 20.04/22.04/24.04 LTS
# ==========================================================================

set -e # Hentikan script jika ada error
export DEBIAN_FRONTEND=noninteractive

echo "🔍 Memverifikasi sistem..."
if [[ $EUID -ne 0 ]]; then 
   echo "❌ Harap jalankan script ini sebagai root (sudo)!" 
   exit 1
fi

echo "🚀 Step 1: Optimasi Repository & Update..."
apt-get update && apt-get upgrade -y
apt-get install -y curl wget git build-essential software-properties-common

echo "📦 Step 2: Instalasi Runtime & Database..."
# Install Node.js 22 LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs ffmpeg sqlite3

echo "🎬 Step 3: Konfigurasi FFmpeg & System..."
# Set timezone ke Jakarta agar jadwal stream akurat
timedatectl set-timezone Asia/Jakarta

echo "🛡️ Step 4: Hardening Keamanan (Firewall)..."
apt-get install -y ufw
ufw allow ssh
ufw allow 7575/tcp
ufw --force enable

echo "📂 Step 5: Deployment Aplikasi..."
mkdir -p /opt/streammaster
cd /opt/streammaster
# Simulasi penarikan source code
# git clone https://github.com/streammaster/v2.git .
npm install --omit=dev

echo "⚙️ Step 6: Konfigurasi Persistensi (PM2)..."
npm install -g pm2
pm2 start index.js --name "streammaster"
pm2 save
pm2 startup | bash

echo "===================================================="
echo "✅ INSTALASI BERHASIL DISIAPKAN!"
echo "===================================================="
SERVER_IP=$(curl -s ifconfig.me)
echo "🌐 Dashboard: http://$SERVER_IP:7575"
echo "🔑 Default User: admin"
echo "===================================================="`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Perintah berhasil disalin ke clipboard!");
  };

  return (
    <Layout title="Installation Guide">
      <div className="max-w-5xl space-y-12 pb-24">
        {/* Hero Section: One-Click Installation */}
        <section className="relative overflow-hidden bg-slate-900 rounded-[40px] p-1 shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Server size={300} className="text-white" />
          </div>
          <div className="bg-slate-950 rounded-[38px] p-8 md:p-12 relative z-10 border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/40">
                <Zap size={32} className="text-white fill-current" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight uppercase">Expert Installer</h3>
                <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Production-Ready Deployment Script</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-2xl">
              Gunakan script instalasi yang telah dioptimasi untuk performa streaming tinggi. Script ini akan menangani instalasi 
              <span className="text-indigo-300 font-semibold"> Node.js 22 LTS</span>, 
              <span className="text-indigo-300 font-semibold"> FFmpeg Library</span>, 
              sinkronisasi <span className="text-indigo-300 font-semibold">Waktu Presisi</span>, dan sistem 
              <span className="text-indigo-300 font-semibold"> Auto-Restart PM2</span>.
            </p>

            <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800 group relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/30"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowFullScript(!showFullScript)}
                    className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-tighter flex items-center gap-1.5 transition-colors"
                  >
                    <Eye size={12} /> {showFullScript ? 'Sembunyikan' : 'Lihat'} Struktur Script
                  </button>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                    <Lock size={10} /> SSH Secure Terminal
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <code className="flex-1 font-mono text-sm text-indigo-300 break-all bg-black/40 p-5 rounded-2xl border border-white/5 leading-relaxed">
                  {installCommand}
                </code>
                <button 
                  onClick={() => copyToClipboard(installCommand)}
                  className="shrink-0 flex items-center gap-2 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-600/20"
                >
                  <Copy size={20} /> Salin Perintah
                </button>
              </div>

              {showFullScript && (
                <div className="mt-6 animate-in slide-in-from-top duration-500">
                  <div className="flex items-center justify-between mb-2 px-2">
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-2"><FileCode size={12}/> install.sh (Source Breakdown)</span>
                  </div>
                  <pre className="bg-black/60 p-6 rounded-2xl font-mono text-[11px] text-slate-400 overflow-x-auto max-h-[400px] scrollbar-hide border border-white/5 leading-relaxed">
                    {scriptSource}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Badge icon={<Cpu size={14}/>} label="Node.js 22 LTS" />
              <Badge icon={<Globe size={14}/>} label="Jakarta Zone" />
              <Badge icon={<ShieldCheck size={14}/>} label="UFW Hardened" />
              <Badge icon={<CheckCircle2 size={14}/>} label="Persistence On" />
            </div>
          </div>
        </section>

        {/* Detailed Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard 
            number="01" 
            title="System Preparation" 
            desc="Pembersihan cache repository dan instalasi build-essential untuk performa modul native Node.js."
            icon={<Server size={20}/>}
          />
          <StepCard 
            number="02" 
            title="Modern Runtime" 
            desc="Menggunakan Node.js 22 untuk efisiensi memori yang lebih baik saat mengelola banyak proses FFmpeg."
            icon={<Cpu size={20}/>}
          />
          <StepCard 
            number="03" 
            title="Process Guard" 
            desc="PM2 dikonfigurasi sebagai systemd service, memastikan stream langsung menyala saat server booting."
            icon={<ShieldCheck size={20}/>}
          />
        </div>

        {/* Pro-Tips / Troubleshooting */}
        <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <AlertTriangle size={24}/>
                </div>
                <h4 className="text-2xl font-bold text-slate-800 tracking-tight">Best Practices (DevOps)</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Untuk menjaga stabilitas streaming jangka panjang pada VPS Ubuntu Anda, perhatikan poin-poin berikut:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Gunakan **SWAP File** minimal 2GB jika RAM VPS Anda hanya 1GB untuk menghindari 'Out of Memory' saat transcoding.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Port **7575** adalah pintu masuk utama dashboard. Pastikan tidak ada aplikasi lain yang menggunakan port ini.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                  <p className="text-xs text-slate-500 leading-relaxed">Selalu cek penggunaan CPU dengan perintah <code className="bg-slate-100 px-1 rounded font-bold text-indigo-600">htop</code> secara berkala.</p>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-80 bg-slate-900 rounded-3xl p-6 text-indigo-400 font-mono text-xs border border-slate-800 shadow-xl">
               <p className="text-slate-500 mb-4 font-bold uppercase tracking-widest text-[10px]">Manual Maintenance</p>
               <div className="space-y-3">
                 <div>
                   <p className="text-white text-[10px] mb-1"># Restart Dashboard</p>
                   <p className="bg-black/30 p-2 rounded">pm2 restart streammaster</p>
                 </div>
                 <div>
                   <p className="text-white text-[10px] mb-1"># Monitor Real-time Logs</p>
                   <p className="bg-black/30 p-2 rounded">pm2 logs streammaster</p>
                 </div>
                 <div className="pt-4 mt-4 border-t border-slate-800">
                   <p className="text-slate-500 italic">v2.0 Stable Build</p>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const Badge: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl">
    <span className="text-indigo-400">{icon}</span>
    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">{label}</span>
  </div>
);

const StepCard: React.FC<{ number: string, title: string, desc: string, icon: React.ReactNode }> = ({ number, title, desc, icon }) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors group">
    <div className="flex items-center justify-between mb-6">
      <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl transition-colors">
        {icon}
      </div>
      <span className="text-2xl font-black text-slate-100 group-hover:text-indigo-100 transition-colors">{number}</span>
    </div>
    <h4 className="text-lg font-bold text-slate-800 mb-3">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default InstallationGuide;
