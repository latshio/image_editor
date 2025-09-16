
/**
 * Converts a File object to a base64 encoded string and extracts its MIME type.
 * @param file The image file to convert.
 * @returns A promise that resolves to an object containing the base64 string and mimeType.
 */
export const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // The result includes the data URL prefix (e.g., "data:image/jpeg;base64,"), we need to remove it.
      const base64 = result.split(',')[1];
      if (base64) {
        resolve({ base64, mimeType: file.type });
      } else {
        reject(new Error("Failed to extract base64 string from file."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
