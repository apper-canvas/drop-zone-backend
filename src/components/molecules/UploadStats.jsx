import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatFileSize } from "@/utils/formatters";

const UploadStats = ({ queue }) => {
  const stats = {
    total: queue.totalFiles,
    completed: queue.completedFiles,
    uploading: queue.files.filter(f => f.status === "uploading").length,
    failed: queue.files.filter(f => f.status === "error").length,
    totalSize: queue.totalSize,
    completedSize: queue.files
      .filter(f => f.status === "completed")
      .reduce((sum, f) => sum + f.size, 0),
  };

  const overallProgress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ApperIcon name="BarChart3" className="h-5 w-5 mr-2 text-primary" />
              Upload Progress
            </h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{overallProgress}%</div>
              <div className="text-xs text-secondary">Overall</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-secondary flex items-center justify-center">
                <ApperIcon name="Files" className="h-3 w-3 mr-1" />
                Total Files
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{stats.completed}</div>
              <div className="text-xs text-secondary flex items-center justify-center">
                <ApperIcon name="CheckCircle" className="h-3 w-3 mr-1" />
                Completed
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.uploading}</div>
              <div className="text-xs text-secondary flex items-center justify-center">
                <ApperIcon name="Upload" className="h-3 w-3 mr-1" />
                Uploading
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-error">{stats.failed}</div>
              <div className="text-xs text-secondary flex items-center justify-center">
                <ApperIcon name="XCircle" className="h-3 w-3 mr-1" />
                Failed
              </div>
            </div>
          </div>

          {/* Size Info */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm text-secondary">
              <span>Size: {formatFileSize(stats.completedSize)} / {formatFileSize(stats.totalSize)}</span>
              <span>{stats.total > 0 ? `${stats.completed} of ${stats.total} files` : "No files"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UploadStats;