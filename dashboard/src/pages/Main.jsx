import React from 'react';
import { motion } from 'framer-motion';

export default function Main() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="w-full max-w-6xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-10"
      >
        <h1 className="text-4xl font-bold text-slate-100 mb-2">
          Welcome to PassRoom
        </h1>

        <p className="text-slate-400 mb-10">
          Your secure password management dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          < button className="rounded-xl bg-white/8 p-4 text-black shadow-inner border border-white/10 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Your Vault</h2>
            <p className="text-slate-400 mb-10">Securely stored passwords and credentials.</p>
          </button>
          <button className="rounded-xl bg-white/8 p-4 text-black shadow-inner border border-white/10 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Password Health</h2>
            <p className="text-slate-400 mb-10" >Check reuse, weak, and strong password stats.</p>
          </button>
          <button className="rounded-xl bg-white/8 p-4 text-black shadow-inner border border-white/10 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h2 className= "text-2xl font-bold text-slate-100 mb-2">Password Manager</h2>
            <p className="text-slate-400 mb-10" >Manage your biometric/web-auth passkeys here.</p>
          </button>
          <button className="rounded-xl bg-white/8 p-4 text-black shadow-inner border border-white/10 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Settings</h2>
            <p className="text-slate-400 mb-10" >Configure encryption, export/import data.</p>
          </button>

        </div>
      </motion.div>
    </div>
  );
}
