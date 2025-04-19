import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export const analyzePyqs = async (text: string) => {
  const prompt = `
    Analyze the given text containing multiple previous year questions (PYQs)

    ### **Exam Paper Format:**
    1. **Question 1** contains 10 sub-questions (a-j), each carrying **1 mark**.
    2. **Questions 2-11** each carry **10 marks** and are based on different topics.

    ### **Your Task:**
    - Identify **5 of the most frequently repeated 1-mark questions** (from Question 1).
    - Identify **5 of the most frequently repeated topics** from the **10-mark questions (Questions 2-11).**
    - Focus on recurring patterns, key concepts, and topics that have appeared in multiple exams.
    - For each question and topic, include a count of how many times it appears.
    - Provide your response in **strict JSON format** as follows:

    {
      "one_mark_questions": [
        {"text": "Question 1", "count": 3},
        {"text": "Question 2", "count": 2},
        {"text": "Question 3", "count": 2},
        {"text": "Question 4", "count": 2},
        {"text": "Question 5", "count": 1}
      ],
      "ten_mark_topics": [
        {"text": "Topic 1", "count": 4},
        {"text": "Topic 2", "count": 3},
        {"text": "Topic 3", "count": 3},
        {"text": "Topic 4", "count": 2},
        {"text": "Topic 5", "count": 2}
      ]
    }
    
    Input Text:
    ${text}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log(responseText);

    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;
    const cleanJson = responseText.substring(jsonStart, jsonEnd);

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { one_mark_questions: [], ten_mark_topics: [] };
  }
};
