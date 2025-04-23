import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: updated.map((m) => m.content) }),
    });

    const { content } = await res.json();
    const botMessage: Message = { role: 'assistant', content };
    setMessages([...updated, botMessage]);
    setLoading(false);
  };

  return { messages, sendMessage, loading };
};
