import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-200 to-blue-900">
      <motion.div 
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        <h1 className="text-4xl font-bold mb-4 text-black-700">Welcome to PassRoom</h1>
        <p className="text-black">
          Your secure and private Password Manager.
        </p>
      </motion.div>
      
      </div>
  );
}

export default Home;
