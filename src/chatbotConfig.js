// chatbotConfig.js
const config = {
  botName: "DevCraftBot",
  initialMessages: [
    {
      type: "text",
      text: "Hello! How can I assist you today?",
    },
  ],
  state: {},
  customComponents: {
    // Add any custom components for the chatbot UI
  },
  customStyles: {
    // Customize chatbot UI styles
    botMessageBox: {
      backgroundColor: "#0e76a8",
    },
    chatButton: {
      backgroundColor: "#0e76a8",
    },
  },
  // Define how the bot interacts with the user
  widgets: [
    {
      widgetName: "welcome",
      widgetFunc: (props) => {
        return <div>Welcome to DevCraft!</div>;
      },
    },
  ],
};

export default config;
