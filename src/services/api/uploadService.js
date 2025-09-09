// Simulated upload service for demonstration
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const generateImageDescription = async (file) => {
  try {
    if (!file.type.startsWith('image/')) {
      return null;
    }

    // Convert file to base64
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image in one concise sentence (maximum 10 words)."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64}`
              }
            }
          ]
        }
      ],
      max_tokens: 50
    });

    return response.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error('OpenAI description generation failed:', error);
    return null;
  }
};

export const uploadService = {
  generateImageDescription,
  
  async uploadFile(file, onProgress) {
    return new Promise(async (resolve, reject) => {
      // Simulate file validation
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error("File size exceeds 10MB limit"));
        return;
      }

      // Generate description for images
      let description = null;
      try {
        description = await generateImageDescription(file);
      } catch (error) {
        console.error('Failed to generate description:', error);
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
                description: description
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