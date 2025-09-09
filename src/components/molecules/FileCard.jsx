import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Progress from "@/components/atoms/Progress";
import ApperIcon from "@/components/ApperIcon";
import { formatFileSize } from "@/utils/formatters";

const FileCard = ({ file, onRetry, onRemove }) => {
  const getFileIcon = (type) => {
    if (type.includes("image")) return "Image";
    if (type.includes("video")) return "Video";
    if (type.includes("audio")) return "Music";
    if (type.includes("pdf")) return "FileText";
    if (type.includes("text")) return "FileText";
    if (type.includes("zip") || type.includes("rar")) return "Archive";
    return "File";
  };

  const getStatusBadge = () => {
    switch (file.status) {
      case "uploading":
        return <Badge variant="info">Uploading</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "error":
        return <Badge variant="error">Failed</Badge>;
      case "pending":
        return <Badge variant="default">Pending</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (file.status) {
      case "uploading":
        return <ApperIcon name="Loader2" className="h-4 w-4 text-primary animate-spin" />;
      case "completed":
        return <ApperIcon name="CheckCircle" className="h-4 w-4 text-success" />;
      case "error":
        return <ApperIcon name="XCircle" className="h-4 w-4 text-error" />;
      case "pending":
        return <ApperIcon name="Clock" className="h-4 w-4 text-secondary" />;
      default:
        return <ApperIcon name="FileQuestion" className="h-4 w-4 text-secondary" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="file-card">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            {/* File Icon */}
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <ApperIcon name={getFileIcon(file.type)} className="h-5 w-5 text-secondary" />
              </div>
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </h3>
                  <p className="text-xs text-secondary mt-1">
                    {formatFileSize(file.size)} • {file.type}
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getStatusIcon()}
                  {getStatusBadge()}
                </div>
              </div>

              {/* Progress Bar */}
              {file.status === "uploading" && (
                <div className="mt-3">
                  <Progress value={file.progress} showPercentage={true} />
                </div>
              )}

              {/* Error Message */}
              {file.status === "error" && file.error && (
                <div className="mt-2 p-2 rounded-md bg-red-50 border border-red-200">
                  <p className="text-xs text-red-600">{file.error}</p>
                </div>
              )}

              {/* Upload Success with timestamp */}
              {file.status === "completed" && file.uploadedAt && (
                <div className="mt-2">
                  <p className="text-xs text-success">
                    Uploaded at {new Date(file.uploadedAt).toLocaleTimeString()}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              {(file.status === "error" || file.status === "completed") && (
                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-2">
                    {file.status === "error" && onRetry && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRetry(file.id)}
                        className="h-7 px-2 text-xs"
                      >
                        <ApperIcon name="RotateCcw" className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                  
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(file.id)}
                      className="h-7 px-2 text-xs text-secondary hover:text-error"
                    >
                      <ApperIcon name="X" className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileCard;