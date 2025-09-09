import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DropZone = ({ onFilesSelected, accept = "*", maxSize = 10 * 1024 * 1024, multiple = true }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setIsDragActive(false);
    
    const files = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e) => {
    const files = [...e.target.files];
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  }, [onFilesSelected]);

  const openFileDialog = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = multiple;
    input.accept = accept;
    input.onchange = handleFileInput;
    input.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        className={`
          relative border-3 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? "border-primary bg-gradient-to-br from-blue-50 to-blue-100 scale-[1.02] shadow-lg" 
            : isDragOver 
            ? "border-primary/70 bg-blue-50/50" 
            : "border-slate-300 hover:border-slate-400 hover:bg-slate-50/50"
          }
          ${isDragActive ? "drag-active" : ""}
        `}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {/* Background Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        
        {/* Upload Icon */}
        <motion.div
          animate={isDragActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6, repeat: isDragActive ? Infinity : 0 }}
          className="relative z-10"
        >
          <div className="mx-auto h-16 w-16 mb-6 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
            {isDragActive ? (
              <ApperIcon name="Download" className="h-8 w-8 text-primary animate-bounce" />
            ) : (
              <ApperIcon name="Upload" className="h-8 w-8 text-primary" />
            )}
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            {isDragActive ? "Drop files here!" : "Drop files to upload"}
          </h3>
          <p className="text-secondary mb-6 text-sm sm:text-base">
            {isDragActive 
              ? "Release to start uploading" 
              : "Drag and drop your files here, or click to browse"
            }
          </p>

          {!isDragActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="mb-4">
                <ApperIcon name="FolderOpen" className="h-5 w-5 mr-2" />
                Browse Files
              </Button>
              
              <div className="text-xs text-secondary/70 mt-4">
                <p>Maximum file size: {Math.round(maxSize / (1024 * 1024))}MB</p>
                <p>Multiple files supported</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Animated Border Effect */}
        {isDragActive && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-primary"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default DropZone;