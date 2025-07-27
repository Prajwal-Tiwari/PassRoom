import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55-] text-black">
      <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}} 
      >
         <h1 className="text-3xl font-bold  mb-4 p-4 ">About PassRoom</h1>
        <p className="text-black p-4 ">
         Passroom is the personal vault for saving your personal credential like passwords,
          passkeys or some notes you want to hidden and it also generate a strong password, and also checks your password health, this is the most simple but most secure app to help you to manage your passwords, and it's your room to store your personal belongings with privacy
        </p>
      </motion.div>
      </div>
  );
}

export default About;
