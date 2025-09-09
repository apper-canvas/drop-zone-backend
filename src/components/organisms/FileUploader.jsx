import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import DropZone from "@/components/molecules/DropZone";
import FileCard from "@/components/molecules/FileCard";
import UploadStats from "@/components/molecules/UploadStats";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { uploadService } from "@/services/api/uploadService";

const FileUploader = () => {
  const [uploadQueue, setUploadQueue] = useState({
    files: [],
    totalFiles: 0,
    completedFiles: 0,
    totalSize: 0,
  });

  // File validation
  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "image/jpeg", "image/png", "image/gif", "image/webp",
      "application/pdf", "text/plain", "text/csv",
      "application/zip", "application/x-zip-compressed",
      "video/mp4", "video/webm", "audio/mpeg", "audio/wav"
    ];

    if (file.size > maxSize) {
      return { valid: false, error: "File size exceeds 10MB limit" };
    }

    if (!allowedTypes.includes(file.type) && file.type !== "") {
      return { valid: false, error: "File type not supported" };
    }

    return { valid: true, error: null };
  };

  // Handle file selection
  const handleFilesSelected = useCallback(async (files) => {
    const newFiles = [];
    let totalSize = uploadQueue.totalSize;

    for (const file of files) {
      const validation = validateFile(file);
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const uploadFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        status: validation.valid ? "pending" : "error",
        progress: 0,
        error: validation.error,
        file: file, // Keep reference for upload
        uploadedAt: null,
      };

      newFiles.push(uploadFile);
      if (validation.valid) {
        totalSize += file.size;
      }
    }

    // Update queue
    setUploadQueue(prev => ({
      files: [...prev.files, ...newFiles],
      totalFiles: prev.totalFiles + newFiles.length,
      completedFiles: prev.completedFiles,
      totalSize: totalSize,
    }));

    // Start uploading valid files
    const validFiles = newFiles.filter(f => f.status === "pending");
    if (validFiles.length > 0) {
      toast.info(`Added ${validFiles.length} file${validFiles.length > 1 ? "s" : ""} to upload queue`);
      
      // Start uploads (you can batch these or upload sequentially)
      validFiles.forEach(file => {
        uploadFile(file.id);
      });
    }

    const invalidFiles = newFiles.filter(f => f.status === "error");
    if (invalidFiles.length > 0) {
      toast.error(`${invalidFiles.length} file${invalidFiles.length > 1 ? "s" : ""} failed validation`);
    }
  }, [uploadQueue.totalSize]);

  // Upload a single file
  const uploadFile = async (fileId) => {
    try {
      // Set uploading status
      setUploadQueue(prev => ({
        ...prev,
        files: prev.files.map(f =>
          f.id === fileId ? { ...f, status: "uploading", progress: 0 } : f
        ),
      }));

      const file = uploadQueue.files.find(f => f.id === fileId);
      if (!file) return;

      // Simulate upload with progress
      await uploadService.uploadFile(file.file, (progress) => {
        setUploadQueue(prev => ({
          ...prev,
          files: prev.files.map(f =>
            f.id === fileId ? { ...f, progress } : f
          ),
        }));
      });

      // Mark as completed
      setUploadQueue(prev => ({
        ...prev,
        files: prev.files.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: "completed",
                progress: 100,
                uploadedAt: new Date(),
                file: undefined, // Clear file reference
              }
            : f
        ),
        completedFiles: prev.completedFiles + 1,
      }));

      toast.success(`${file.name} uploaded successfully!`);
    } catch (error) {
      setUploadQueue(prev => ({
        ...prev,
        files: prev.files.map(f =>
          f.id === fileId
            ? { ...f, status: "error", error: error.message }
            : f
        ),
      }));

      toast.error(`Failed to upload: ${error.message}`);
    }
  };

  // Retry failed upload
  const handleRetry = useCallback((fileId) => {
    uploadFile(fileId);
    toast.info("Retrying upload...");
  }, []);

  // Remove file from queue
  const handleRemoveFile = useCallback((fileId) => {
    setUploadQueue(prev => {
      const fileToRemove = prev.files.find(f => f.id === fileId);
      const remainingFiles = prev.files.filter(f => f.id !== fileId);
      
      return {
        files: remainingFiles,
        totalFiles: remainingFiles.length,
        completedFiles: remainingFiles.filter(f => f.status === "completed").length,
        totalSize: remainingFiles.reduce((sum, f) => sum + f.size, 0),
      };
    });
  }, []);

  // Clear completed files
  const handleClearCompleted = useCallback(() => {
    setUploadQueue(prev => {
      const remainingFiles = prev.files.filter(f => f.status !== "completed");
      return {
        files: remainingFiles,
        totalFiles: remainingFiles.length,
        completedFiles: 0,
        totalSize: remainingFiles.reduce((sum, f) => sum + f.size, 0),
      };
    });
    
    toast.info("Cleared completed uploads");
  }, []);

  // Clear all files
  const handleClearAll = useCallback(() => {
    setUploadQueue({
      files: [],
      totalFiles: 0,
      completedFiles: 0,
      totalSize: 0,
    });
    
    toast.info("Cleared all files");
  }, []);

  const hasFiles = uploadQueue.files.length > 0;
  const hasCompleted = uploadQueue.completedFiles > 0;
  const isUploading = uploadQueue.files.some(f => f.status === "uploading");

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <DropZone
        onFilesSelected={handleFilesSelected}
        accept="image/*,application/pdf,text/*,application/zip,video/*,audio/*"
        maxSize={10 * 1024 * 1024}
        multiple={true}
      />

      {/* Upload Stats */}
      <AnimatePresence>
        {hasFiles && (
          <UploadStats queue={uploadQueue} />
        )}
      </AnimatePresence>

      {/* File Queue */}
      <AnimatePresence>
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Queue Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <ApperIcon name="List" className="h-5 w-5 mr-2 text-primary" />
                Upload Queue ({uploadQueue.files.length})
              </h2>
              
              <div className="flex space-x-2">
                {hasCompleted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCompleted}
                    disabled={isUploading}
                  >
                    <ApperIcon name="CheckCheck" className="h-4 w-4 mr-1" />
                    Clear Completed
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  disabled={isUploading}
                  className="text-error hover:text-error"
                >
                  <ApperIcon name="Trash2" className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* File List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {uploadQueue.files.map(file => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onRetry={handleRetry}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;