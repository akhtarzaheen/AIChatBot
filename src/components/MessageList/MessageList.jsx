import React from 'react';
import Message from '../Message/Message';
import styles from './MessageList.module.css';

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;