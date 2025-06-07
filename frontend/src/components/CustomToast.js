// /frontend/src/components/CustomToast.js
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const toastVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const CustomToast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={toastVariants}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 border border-gray-300 shadow-lg px-6 py-4 rounded-xl z-50 flex items-center gap-3"
        >
          <span className="text-green-600 text-xl">✅</span>
          <div className="text-sm">
            <div className="font-semibold">{message.title}</div>
            <div>{message.body}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomToast;
