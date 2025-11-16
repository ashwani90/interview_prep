import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import './styles/Chat.css';

const ChatWindow = ({ messages, onSendMessage }) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (message) => {
    onSendMessage(message);
    setIsTyping(true);
  };

  useEffect(() => {
    // Check if last message is from user to show typing indicator
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <Message 
            key={message.id} 
            text={message.text} 
            sender={message.sender} 
          />
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSend} />
    </div>
  );
};

export default ChatWindow;