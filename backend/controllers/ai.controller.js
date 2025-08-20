import { GoogleGenerativeAI } from "@google/generative-ai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Generate Interview Questions
export const generateQuestion = async (req, res) => {
  try {
    const { role, experience, topicToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicToFocus || !numberOfQuestions) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = questionAnswerPrompt(role, experience, topicToFocus, numberOfQuestions);

    const response = await model.generateContent(prompt);

    // Extract AI text
    const aiText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiText) {
      return res.status(500).json({ success: false, message: "Empty response from AI" });
    }

    let questions;
    try {
      // Try parsing JSON
      questions = JSON.parse(aiText);
    } catch (err) {
      console.error("❌ Failed to parse AI response:", aiText);
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: aiText // helpful for debugging
      });
    }

    return res.status(200).json({ success: true, data: questions });

  } catch (error) {
    console.error("🔥 Error in generateQuestion:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "AI request failed"
    });
  }
};

// ✅ Generate Explanation
export const generateExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ success: false, message: "Question is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = conceptExplainPrompt(question);

    const response = await model.generateContent(prompt);
    const aiText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!aiText) {
      return res.status(500).json({ success: false, message: "Empty response from AI" });
    }

    let explanation;
    try {
      explanation = JSON.parse(aiText);
    } catch (err) {
      console.error("❌ Failed to parse AI explanation:", aiText);
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON for explanation",
        raw: aiText
      });
    }

    return res.status(200).json({ success: true, data: explanation });

  } catch (error) {
    console.error("🔥 Error in generateExplanation:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "AI request failed"
    });
  }
};
