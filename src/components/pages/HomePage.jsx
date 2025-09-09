import React from "react";
import { motion } from "framer-motion";
import FileUploader from "@/components/organisms/FileUploader";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Drop Zone
            </span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Upload your files quickly and securely. Drag and drop multiple files, 
            track upload progress in real-time, and manage your uploads with ease.
          </p>
        </motion.div>

        {/* File Uploader */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FileUploader />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
              <motion.svg
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </motion.svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop</h3>
            <p className="text-secondary">Simply drag your files into the drop zone for instant uploading</p>
          </div>

          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-success/20 to-emerald-600/20 flex items-center justify-center">
              <motion.svg
                className="h-6 w-6 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </motion.svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Progress</h3>
            <p className="text-secondary">Track upload progress with detailed status for each file</p>
          </div>

          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-warning/20 to-yellow-600/20 flex items-center justify-center">
              <motion.svg
                className="h-6 w-6 text-warning"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </motion.svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Upload</h3>
            <p className="text-secondary">Your files are uploaded securely with validation and error handling</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;