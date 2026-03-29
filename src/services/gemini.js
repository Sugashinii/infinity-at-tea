import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateBusinessKit = async (formData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
    Act as an expert digital marketer and brand strategist.
    I need a complete digital starter kit for a local business with the following details:
    - Business Name: ${formData.businessName}
    - Business Type: ${formData.businessType}
    - Location: ${formData.location}
    - Short Description: ${formData.description}
    - Language to output in: ${formData.language}

    Please generate:
    1. A Catchy Tagline for the business.
    2. A Professional Business Description (3-4 sentences).
    3. An engaging Instagram Bio (with emojis).
    4. A promotional WhatsApp Status text suitable to update customers about the business.
    5. A recommended color palette for their brand (provide exactly 5 hex codes in an array).

    Respond ONLY with a valid JSON object strictly following this structure:
    {
      "tagline": "string",
      "description": "string",
      "instagramBio": "string",
      "whatAppStatus": "string",
      "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON from the markdown code block if present
    const jsonStr = text.replace(/```(json)?|```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating kit:", error);
    throw new Error("Failed to generate digital kit. Please check your API key and try again.");
  }
};
