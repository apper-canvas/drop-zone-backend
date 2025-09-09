import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No files yet", 
  message = "Start by uploading your first file using the drop zone above.", 
  actionLabel = "Upload Files",
  onAction,
  icon = "Upload",
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center space-y-6 p-8 text-center ${className}`}
    >
      {/* Empty Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        className="h-20 w-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center"
      >
        <ApperIcon name={icon} className="h-10 w-10 text-secondary" />
      </motion.div>

      {/* Empty Content */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-secondary leading-relaxed">{message}</p>
      </div>

      {/* Action Button */}
      {onAction && actionLabel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button onClick={onAction} size="lg">
            <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
            {actionLabel}
          </Button>
        </motion.div>
      )}

      {/* Helper Text */}
      <div className="text-xs text-secondary/70 max-w-sm space-y-1">
        <p>Supported formats: Images, PDFs, Documents, Videos, Audio</p>
        <p>Maximum file size: 10MB per file</p>
      </div>
    </motion.div>
  );
};

export default Empty;