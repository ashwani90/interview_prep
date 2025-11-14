import React from 'react';
import './styles/Chat.css';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
};

export default Message;