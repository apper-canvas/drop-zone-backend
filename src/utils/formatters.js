export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatUploadTime = (date) => {
  if (!date) return "";
  
  const now = new Date();
  const uploadTime = new Date(date);
  const diffInSeconds = Math.floor((now - uploadTime) / 1000);
  
  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return uploadTime.toLocaleDateString();
  }
};

export const formatProgress = (progress) => {
  return `${Math.round(progress)}%`;
};

export const truncateFileName = (fileName, maxLength = 30) => {
  if (fileName.length <= maxLength) return fileName;
  
  const extension = fileName.split(".").pop();
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));
  const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4);
  
  return `${truncatedName}...${extension}`;
};