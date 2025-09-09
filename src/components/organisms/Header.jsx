import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
              <ApperIcon name="Upload" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Drop Zone
              </h1>
              <p className="text-xs text-secondary -mt-1">File Uploader</p>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center space-x-2 text-sm text-secondary"
            >
              <ApperIcon name="Shield" className="h-4 w-4" />
              <span>Secure Upload</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center space-x-2 text-sm text-secondary"
            >
              <ApperIcon name="Zap" className="h-4 w-4" />
              <span>Fast & Reliable</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;