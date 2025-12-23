
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
  Lock,
  Github
} from 'lucide-react';

const InstallationGuide: React.FC = () => {
  const [showFullScript, setShowFullScript] = useState(false);
  
  // Perintah instalasi satu baris khusus untuk repository user
  const repoUrl = "https://github.com/yudidwisaputra71/streammaster";
  const installCommand = `curl -fsSL ${repoUrl}/raw/main/install.sh | sudo bash`;

  // Struktur script yang dirancang untuk repository spesifik ini
  const scriptSource = `#!/bin/bash
# ==========================================================================
# StreamMaster VPS Dashboard v2.0 - Expert Installer
# Target Repo: yudidwisaputra71/streammaster
# Optimized for Ubuntu 20.04/22.04 LTS
# ==========================================================================

set -e
export DEBIAN_FRONTEND=noninteractive

echo "🔍 Memverifikasi akses Root..."
if [[ $EUID -ne 0 ]]; then 
   echo "❌ Jalankan sebagai root!" 
   exit 1
fi

echo "🚀 Step 1: Update & Install Dependencies..."
apt-get update && apt-get upgrade -y
apt-get install -y curl wget git ffmpeg sqlite3 build-essential

echo "📦 Step 2: Setup Node.js 22 LTS..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

echo "📂 Step 3: Cloning Repository..."
cd /opt
rm -rf streammaster
git clone ${repoUrl}.git streammaster
cd streammaster

echo "⚙️ Step 4: Installing App Dependencies..."
npm install --omit=dev

echo "🕐 Step 5: System Configuration..."
timedatectl set-timezone Asia/Jakarta
ufw allow 7575/tcp
ufw --force enable

echo "🚀 Step 6: Starting with PM2 Persistence..."
npm install -g pm2
pm2 start index.js --name "streammaster"
pm2 save
pm2 startup | bash

echo "===================================================="
echo "✅ INSTALASI BERHASIL!"
echo "🌐 URL: http://$(curl -s ifconfig.me):7575"
echo "===================================================="`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Berhasil disalin ke clipboard!");
  };

  return (
    <Layout title="Installation Guide">
      <div className="max-w-5xl space-y-12 pb-24">
        {/* Hero Section: One-Click Installation */}
        <section className="relative overflow-hidden bg-slate-900 rounded-[40px] p-1 shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Github size={300} className="text-white" />
          </div>
          <div className="bg-slate-950 rounded-[38px] p-8 md:p-12 relative z-10 border border-white/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/40">
                <Zap size={32} className="text-white fill-current" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight uppercase">Quick Deploy</h3>
                <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest">Target: yudidwisaputra71/streammaster</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-2xl">
              Gunakan script otomatis untuk mendeply dashboard langsung dari repository GitHub Anda. 
              Script ini mengonfigurasi <span className="text-indigo-300 font-semibold">Node.js 22</span>, 
              <span className="text-indigo-300 font-semibold">FFmpeg</span>, dan mengamankan server dengan 
              <span className="text-indigo-300 font-semibold">UFW Firewall</span> pada port 7575.
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
                    <Lock size={10} /> Secure SSH
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <code className="flex-1 font-mono text-sm text-indigo-300 break-all bg-black/40 p-5 rounded-2xl border border-white/5 leading-relaxed">
                  {installCommand}
                </code>
                <button 
                  onClick={() => copyToClipboard(installCommand)}
                  className="shrink-0 flex items-center gap-2 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-indigo-600/20"
                >
                  <Copy size={20} /> Copy Command
                </button>
              </div>

              {showFullScript && (
                <div className="mt-6 animate-in slide-in-from-top duration-500">
                  <div className="flex items-center justify-between mb-2 px-2 text-[10px] font-bold text-slate-500 uppercase">
                    <span className="flex items-center gap-2"><FileCode size={12}/> install.sh preview</span>
                    <span className="text-indigo-400">Branch: Main</span>
                  </div>
                  <pre className="bg-black/60 p-6 rounded-2xl font-mono text-[11px] text-slate-400 overflow-x-auto max-h-[400px] scrollbar-hide border border-white/5 leading-relaxed">
                    {scriptSource}
                  </pre>
                </div>
              )}
            </div>

            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Badge icon={<Cpu size={14}/>} label="Node.js 22 LTS" />
              <Badge icon={<Globe size={14}/>} label="Jakarta Time" />
              <Badge icon={<ShieldCheck size={14}/>} label="UFW Protected" />
              <Badge icon={<CheckCircle2 size={14}/>} label="Auto-Restart" />
            </div>
          </div>
        </section>

        {/* Requirements & Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl"><Server size={24}/></div>
                <h4 className="text-xl font-bold text-slate-800">VPS Requirements</h4>
             </div>
             <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> Ubuntu 20.04 / 22.04 LTS</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> RAM minimal 1GB (Recommended 2GB)</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> Port 7575 Open (Inbound)</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500"/> Root Access / Sudo Privileges</li>
             </ul>
           </section>

           <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl"><Github size={24}/></div>
                <h4 className="text-xl font-bold text-slate-800">Manual Setup</h4>
             </div>
             <div className="space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Jika auto-install gagal, jalankan secara manual:</p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-[10px] text-indigo-300 border border-slate-800">
                  git clone {repoUrl}.git<br/>
                  cd streammaster<br/>
                  npm install<br/>
                  pm2 start index.js --name "streammaster"
                </div>
             </div>
           </section>
        </div>

        {/* Post-Install Advice */}
        <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <AlertTriangle size={28}/>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Penting Setelah Instalasi</h3>
              <p className="text-slate-500 text-sm">Langkah wajib agar sistem berjalan lancar</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Setelah script selesai, akses dashboard melalui IP server di port 7575. Gunakan kredensial default untuk login pertama.
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                   <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Monitor Log FFmpeg:</p>
                   <code className="text-xs text-indigo-600 font-bold">pm2 logs streammaster</code>
                </div>
             </div>
             <div className="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100">
                <h4 className="font-bold text-indigo-900 text-sm mb-3">Tips Produksi:</h4>
                <ul className="text-xs text-indigo-800 space-y-3 list-disc ml-4 font-medium leading-relaxed">
                   <li>Pastikan Anda telah menambahkan file <code className="bg-white px-1">install.sh</code> ke root repository GitHub Anda agar perintah satu baris di atas dapat berfungsi.</li>
                   <li>Untuk performa streaming terbaik, gunakan VPS dengan lokasi server terdekat dari target platform streaming Anda (misal: Singapore untuk target Asia).</li>
                </ul>
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
