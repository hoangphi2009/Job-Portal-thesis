import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const ChatBoxBody = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const generateResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log(data);
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="fixed bottom-24 right-5 w-[450px] shadow-lg rounded-lg bg-white p-4 h-96 transition duration-300 ease-in-out">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 overflow-y-auto p-2">
          <div className="flex items-center space-x-2">
            <Bot className="text-blue-500" />
            <p className="bg-gray-200 mr-3 rounded-md ml-20 p-3 text-sm text-gray-700">
              Hey There! <br />
              How can I help you?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateResponse={generateResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxBody;
