import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

type GeminiMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export const generateChatResponse = async (messages: Array<{ role: string; content: string }>) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro-latest', // Updated model name
    });

    // Transform messages to Gemini format
    const chatHistory = messages.slice(0, -1).map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user' as const,
      parts: [{ text: message.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('Last message must be from user');
    }

    const chat = model.startChat({
      history: chatHistory,
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};