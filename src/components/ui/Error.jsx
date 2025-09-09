import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong", 
  message = "An error occurred while processing your request. Please try again.", 
  onRetry,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center space-y-6 p-8 text-center ${className}`}
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="h-16 w-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center"
      >
        <ApperIcon name="AlertTriangle" className="h-8 w-8 text-error" />
      </motion.div>

      {/* Error Content */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-secondary leading-relaxed">{message}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onRetry && (
          <Button onClick={onRetry} className="min-w-[120px]">
            <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()} 
          className="min-w-[120px]"
        >
          <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
          Refresh Page
        </Button>
      </div>

      {/* Additional Help */}
      <div className="text-xs text-secondary/70 max-w-sm">
        <p>If the problem persists, please check your internet connection or try again later.</p>
      </div>
    </motion.div>
  );
};

export default Error;