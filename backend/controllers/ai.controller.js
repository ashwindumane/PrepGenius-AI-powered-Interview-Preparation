import { GoogleGenAI } from "@google/genai";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompt.js";

const ai = new GoogleGenAI({ apiKey: " AIzaSyBG21g3kCjcpYxj7h405Pp8h-2RpabX7aU " });

export const generateQuestion = async (req, res) => {
  try {
    const { role, experience, topicToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicToFocus || !numberOfQuestions) {
      return res.status(500).json({ message: "one of the fields are missing" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);

    // const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    })



    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Raw Gemini Response:", rawText);
    const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    const data = JSON.parse(cleanedText);

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};


export const generateExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(404).json({ message: "missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    })

    const rawText = response.text;


    const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
    const data = JSON.parse(cleanedText);

    return res.status(200).json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
