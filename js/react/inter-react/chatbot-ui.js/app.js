import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);

  const handleSendMessage = (message) => {
    // Add user message
    const userMessage = { id: Date.now(), text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: getBotResponse(message), 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
      return "Hi there! What can I do for you?";
    } else if (message.includes('help')) {
      return "I can answer questions, provide information, or just chat!";
    } else if (message.includes('thank')) {
      return "You're welcome! Is there anything else I can help with?";
    } else if (message.includes('bye')) {
      return "Goodbye! Have a great day!";
    } else {
      const responses = [
        "That's interesting. Tell me more.",
        "I see. What else would you like to know?",
        "Thanks for sharing that with me.",
        "I'm still learning. Could you rephrase that?",
        "Let me think about that...",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  return (
    <div className="app">
      <h1>Chatbot UI</h1>
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;