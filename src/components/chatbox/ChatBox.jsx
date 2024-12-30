import { BotMessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import ChatBoxBody from "./ChatBoxBody";

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const toggleChatBox = () => setOpen(!open);
  return (
    <>
      <Button
        className="fixed bottom-5 right-5 p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none w-16 h-16 flex items-center justify-center"
        onClick={toggleChatBox} // Thêm sự kiện onClick
      >
        <BotMessageSquare
          color="#0fa5f0"
          style={{ width: "30px", height: "30px" }}
        />
      </Button>
      {open && ( 
        <ChatBoxBody/>
      )}
    </>
  );
};

export default ChatBox;
