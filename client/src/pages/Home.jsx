import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "🔐",
      title: "Secure Storage",
      desc: "Passwords are encrypted before storage. Only you can decrypt and view them.",
    },
    {
      icon: "📊",
      title: "Password Health Check",
      desc: "Analyze strength, detect duplicates, and keep your credentials clean.",
    },
    {
      icon: "🌐",
      title: "Multi-Device Access",
      desc: "Access your vault securely from any device — all synced and protected.",
    },
    {
      icon: "🧠",
      title: "Minimal & Focused Design",
      desc: "No clutter. Just a distraction-free space to manage your digital identity.",
    },
    {
      icon: "📁",
      title: "Organize with Ease",
      desc: "Group your credentials by folder, tag, or usage type for quicker access.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold mb-4 text-slate-100">
          Welcome to PassRoom
        </h1>
        <p className="text-slate-300 text-lg mb-6">
          Your secure and private Password Manager.
        </p>

        <Link to="/Login">
          <button className="px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all duration-300 hover:scale-105 shadow-lg">
            Get Started
          </button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl text-slate-100 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-blue-500/50 hover:shadow-blue-500/20"
          >
            <h2 className="text-xl font-semibold mb-2 text-slate-100">
              {feature.icon} {feature.title}
            </h2>
            <p className="text-sm text-slate-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
