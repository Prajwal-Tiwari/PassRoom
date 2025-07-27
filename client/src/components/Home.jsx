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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55-] text-black px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold mb-4 text-black-700">
          Welcome to PassRoom
        </h1>
        <p className="text-black text-lg mb-6">
          Your secure and private Password Manager.
        </p>

        <Link to="/login">
          <button className="px-6 py-2 bg-blue-900 text-white font-semibold rounded hover:bg-blue-700 transition">
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
            className="bg-white/30 text-black backdrop-blur-md p-6 rounded-xl shadow-md border border-white/40 hover:shadow-lg hover:bg-white/40 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {feature.icon} {feature.title}
            </h2>
            <p className="text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
