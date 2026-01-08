import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";




const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
export const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function geminiModel(content:any) {
  const response = await ai.models.generateContent({
    // model: "gemini-2.5-flash",
    model: "gemini-1.5-flash",
    
    // model: "gemini-1.5-pro"
    contents: content,
    config:{
        safetySettings,
        
    },
    

  });

  console.log(response.text);
  return response.text;
}





// Model	Free tier quota	Cost	Notes
// gemini-2.5-flash	Very low	Cheap	Fast, easiest to burn
// gemini-1.5-flash	Low	Cheap	Similar limits
// gemini-1.5-pro	Lower	Expensive	Slower, still capped