import React from "react";
import { motion } from "framer-motion";

const Loading = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 ${className}`}>
      {/* Spinner */}
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-primary"></div>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="text-secondary font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>

      {/* Shimmer Cards */}
      <div className="w-full max-w-md space-y-3 mt-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="h-16 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 rounded-lg shimmer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;