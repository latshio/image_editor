
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Edits an image using the Gemini API based on a text prompt.
 * @param base64ImageData The base64 encoded image data string.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @param prompt The text prompt describing the desired edit.
 * @returns A promise that resolves to the base64 encoded string of the edited image.
 */
export const editImageWithAi = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string | null> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        // Must include both Modality.IMAGE and Modality.TEXT for this model
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Find the image part in the response
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part) => !!part.inlineData
    );

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    }

    // It's possible the model only returns text (e.g., if it can't fulfill the request)
    const textPart = response.candidates?.[0]?.content?.parts?.find(
      (part) => !!part.text
    );
    if (textPart && textPart.text) {
        throw new Error(`AI Response: ${textPart.text}`);
    }

    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process image with AI. Please check the console for details.");
  }
};
