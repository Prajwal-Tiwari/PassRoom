import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function PasswordHealth() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    setResult(null);

    try {
      const res = await api.post("/credentials/check-password", { password });
      setResult(res.data);
    } catch (err) {
      setError("Could not check password right now.Try again.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
       <h2 className="text-2xl font-semibold mb-4">🩺 Password Health</h2>

      <form onSubmit={handleCheck} className="space-y-3 mb-6">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to check"
          className="w-full px-4 py-2 rounded border border-gray-400 text-black"
          required
        />
        <button
          type="submit"
          disabled={checking}
          className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {checking ? "Checking..." : "Check Password"}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 p-2 rounded">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-3 text-sm">
          {result.breached === null && (
            <div className="bg-gray-500/20 p-3 rounded-lg border border-gray-500/40">
              Could not verify against the breach database right now.
            </div>
          )}
          {result.breached === true && (
            <div className="bg-red-500/20 p-3 rounded-lg border border-red-500/40">
              <strong>This password has appeared in {result.breachCount} known breaches.</strong>{" "}
              Consider changing it.
            </div>
          )}
          {result.breached === false && (
            <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/40">
              <strong>Good news</strong> — this password wasn't found in any known breaches.
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-bold">Tips to improve password health</h3>
        <ul className="list-disc ml-6 mt-2 text-white/80 space-y-1">
          <li>Use long passphrases with symbols</li>
          <li>Don't reuse passwords across sites</li>
          <li>Use 2FA wherever possible</li>
        </ul>
      </div>
    </motion.div>
  );
}
