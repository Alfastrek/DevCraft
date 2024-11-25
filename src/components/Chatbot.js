import React, { useState } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import Chatbot from "react-chatbot-kit";
import { FaRobot } from "react-icons/fa";
import "react-chatbot-kit/build/main.css";

const config = {
  initialMessages: [createChatBotMessage("Hello! How can I assist you today?")],
  botName: "AI Chatbot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4CAF50",
    },
    chatButton: {
      backgroundColor: "#4CAF50",
    },
  },
};

const fetchGeminiResponse = async (message, history) => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't understand that. Could you please try again?";
  }
};

const MessageParser = {
  parse: async (message, setState) => {
    const response = await fetchGeminiResponse(
      message,
      setState.chatHistory || []
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, createChatBotMessage(response)],
    }));
  },
};

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="chatbot-toggle-btn"
        onClick={toggleChatbot}
        title={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        <FaRobot size={30} />
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={{}} // You can add action providers for button actions
          />
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
