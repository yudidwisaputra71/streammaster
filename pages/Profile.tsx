
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Shield, Key, Mail, Save } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <Layout title="Admin Profile">
      <div className="max-w-2xl">
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-32 bg-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="flex justify-between items-end -mt-12 mb-8">
               <img src="https://picsum.photos/seed/user1/120/120" className="w-24 h-24 rounded-[28px] border-4 border-white shadow-lg" />
               <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm">Change Avatar</button>
            </div>

            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Username</label>
                    <div className="relative">
                       <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input type="text" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" defaultValue="admin_master" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input type="email" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" defaultValue="admin@streammaster.io" />
                    </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Key size={20} className="text-indigo-600"/> Change Password</h4>
                  <div className="space-y-4">
                     <input type="password" placeholder="Current Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                     <input type="password" placeholder="New Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                  </div>
               </div>

               <button className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                  <Save size={20} /> Save Changes
               </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-indigo-900 rounded-[32px] p-8 text-white">
           <div className="flex items-center gap-4 mb-4">
              <Shield className="text-indigo-400" size={32} />
              <h4 className="text-xl font-bold">Two-Factor Authentication</h4>
           </div>
           <p className="text-indigo-200 text-sm leading-relaxed mb-6">Securing your account with 2FA adds an extra layer of protection. We recommend using Google Authenticator.</p>
           <button className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold text-sm">Enable 2FA Now</button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
