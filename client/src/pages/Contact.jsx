import { motion } from 'framer-motion';

function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10">
      <motion.div
         initial={{opacity: 0, scale: 0.9}}
        animate={{opacity:1, scale: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        <h1 className="text-5xl font-bold mb-4 text-slate-100">Contact Us</h1>
        <p className="text-slate-300 text-lg mb-6">Have any questions or feedback? We'd love to hear from you.</p>
        <p className="text-slate-500 text-lg mb-6">📧aasthayadav815@gmail.com</p>

      </motion.div>
      </div>
   
  );
}

export default Contact;
