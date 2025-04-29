import React, { useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import styles from './Message.module.css';

const Message = ({ message }) => {
  const { rateMessage } = useChatContext();
  const [isHovered, setIsHovered] = useState(false);
  
  const isAiMessage = message.sender === 'Soul AI';
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleLike = (e) => {
    e.stopPropagation();
    rateMessage(message.id, 'like');
  };
  
  const handleDislike = (e) => {
    e.stopPropagation();
    rateMessage(message.id, 'dislike');
  };

  return (
    <div 
      className={`${styles.messageContainer} ${isAiMessage ? styles.aiMessage : styles.userMessage}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.avatar}>
        {isAiMessage ? (
          <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Bot" alt="Bot AI" />
        ) : (
          <img src="https://api.dicebear.com/7.x/personas/svg?seed=User" alt="User" />
        )}
      </div>
      
      <div className={styles.messageContent}>
        <div className={styles.header}>
          <div className={styles.sender}>{message.sender}</div>
          <div className={styles.timestamp}>{formatTime(message.timestamp)}</div>
        </div>
        
        {isAiMessage ? (
          <p>{message.text}</p>
        ) : (
          <div>{message.text}</div>
        )}
        
        {isAiMessage && isHovered && (
          <div className={styles.feedbackButtons}>
            <button 
              className={`${styles.feedbackButton} ${message.rating === 'like' ? styles.active : ''}`} 
              onClick={handleLike}
            >
              <ThumbsUp size={16} />
            </button>
            <button 
              className={`${styles.feedbackButton} ${message.rating === 'dislike' ? styles.active : ''}`} 
              onClick={handleDislike}
            >
              <ThumbsDown size={16} />
            </button>
          </div>
        )}
        
        {isAiMessage && message.rating && !isHovered && (
          <div className={styles.ratingIndicator}>
            {message.rating === 'like' ? (
              <ThumbsUp size={14} className={styles.likeIcon} />
            ) : (
              <ThumbsDown size={14} className={styles.dislikeIcon} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;