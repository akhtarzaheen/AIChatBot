import React, { useState } from 'react';
import styles from './MessageInput.module.css';

const MessageInput = ({ onSubmit, onSave }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form className={styles.messageInputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Message Bot AI..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button 
          type="submit" 
          className={`${styles.button} ${styles.primary}`}
        >
          Ask
        </button>
        <button 
          type="button" 
          className={styles.button}
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default MessageInput;