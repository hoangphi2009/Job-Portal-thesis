import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
const ChatForm = ({chatHistory, setChatHistory, generateResponse }) => {
  const inputRef = useRef();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      // Here we call generateResponse with the updated history including the new user message
      generateResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 600);
  };

  return (
    <form
      className="flex items-center space-x-2"
      action="#"
      onSubmit={handleFormSubmit}
    >
      <Input
        type="text"
        ref={inputRef}
        className="flex-grow rounded-full py-2 px-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Type your message here"
      />
      <Button
        type="submit"
        className="flex items-center justify-center p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Send size={20} />
      </Button>
    </form>
  );
};

export default ChatForm;
