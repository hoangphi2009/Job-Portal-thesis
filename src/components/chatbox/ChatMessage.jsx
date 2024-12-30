import { Bot } from "lucide-react";

const ChatMessage = ({ chat }) => {
  // Determine class names based on the role of the chat
  const messageClasses =
    chat.role === "model"
      ? "flex items-center bg-gray-200 rounded-md ml-4 p-3 text-sm text-gray-700"
      : "bg-green-200 rounded-md ml-20 mr-4 p-3 text-sm text-gray-700";

  return (
    <div className={chat.role === "model" ? "flex items-center space-x-2" : ""}>
      {chat.role === "model" && <Bot className="text-blue-500" />}
      <p className={messageClasses}>{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
