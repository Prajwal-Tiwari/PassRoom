import { motion } from 'framer-motion';

export default function PasswordHealth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4 ">🩺 Password Health</h2>
      <ul className="space-y-4 text-sm text-white/90">
        <li className="bg-red-500/20 p-3 rounded-lg border border-red-500/40">
          <strong>3 reused passwords</strong> detected. Try using unique passwords.
        </li>
        <li className="bg-yellow-500/20 p-3 rounded-lg border border-yellow-500/40">
          <strong>5 weak passwords</strong> found. Consider updating them.
        </li>
        <li className="bg-green-500/20 p-3 rounded-lg border border-green-500/40">
          <strong>12 strong passwords</strong> – Great job!
        </li>
      </ul>

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
