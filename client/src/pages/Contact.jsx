import { motion } from 'framer-motion';

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55-] text-black">
      <motion.div
         initial={{opacity: 0, scale: 0.9}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        <h1 className="text-3xl font-bold text-black mb-4">Contact Us</h1>
        <p className="text-black mb-2">Have any questions or feedback? We'd love to hear from you.</p>
        <p className="text-blak font-medium">📧aasthayadav815@gmail.com</p>

      </motion.div>
      </div>
   
  );
}

export default Contact;
