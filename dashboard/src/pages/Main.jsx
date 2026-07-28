import React from 'react';
import { motion } from 'framer-motion';

export default function Main() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55-] text-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="w-full max-w-4xl rounded-2xl p-8 backdrop-blur-lg bg-white/10 shadow-2xl border border-white/20"
      >
        <h1 className="text-3xl font-semibold text-black mb-6">
          Welcome to PassRoom 
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          < button className="rounded-xl bg-white/2 p-4 text-black shadow-inner border border-white/10">
            <h2 className="text-xl font-bold">Your Vault</h2>
            <p className="text-sm mt-2">Securely stored passwords and credentials.</p>
          </button>
          <button className="rounded-xl bg-white/2 p-4 text-black shadow-inner border border-white/10">
            <h2 className="text-xl font-bold">Password Health</h2>
            <p className="text-sm mt-2">Check reuse, weak, and strong password stats.</p>
          </button>
          <button className="rounded-xl bg-white/2 p-4 text-black shadow-inner border border-white/10">
            <h2 className="text-xl font-bold">Passkey Manager</h2>
            <p className="text-sm mt-2">Manage your biometric/web-auth passkeys here.</p>
          </button>
          <button className="rounded-xl bg-white/2 p-4 text-black shadow-inner border border-white/10">
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="text-sm mt-2">Configure encryption, export/import data.</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
