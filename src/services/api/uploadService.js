// Simulated upload service for demonstration
export const uploadService = {
  async uploadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
      // Simulate file validation
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error("File size exceeds 10MB limit"));
        return;
      }

      // Simulate network delay and progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Simulate success/failure
          const success = Math.random() > 0.1; // 90% success rate
          
          if (success) {
            onProgress(progress);
            setTimeout(() => {
              resolve({
                id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                fileName: file.name,
                fileSize: file.size,
                uploadedAt: new Date(),
                url: `https://example.com/uploads/${file.name}`,
              });
            }, 200);
          } else {
            reject(new Error("Upload failed due to network error"));
          }
        } else {
          onProgress(progress);
        }
      }, 100 + Math.random() * 200); // Variable interval to simulate real network conditions
    });
  },

  async deleteFile(fileId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, fileId });
      }, 500);
    });
  },

  async getUploadHistory() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            fileName: "document.pdf",
            fileSize: 2048000,
            uploadedAt: new Date(Date.now() - 3600000),
            status: "completed",
          },
          {
            id: "2", 
            fileName: "image.jpg",
            fileSize: 1024000,
            uploadedAt: new Date(Date.now() - 7200000),
            status: "completed",
          },
        ]);
      }, 300);
    });
  },
};