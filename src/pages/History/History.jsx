import React, { useState } from 'react';
import { useChatContext } from '../../context/ChatContext';
import { Link } from 'react-router-dom';
import styles from './History.module.css';

const History = () => {
  const { savedChats, loadChat } = useChatContext();
  const [filterRating, setFilterRating] = useState(0);
  
  // Group chats by date
  const groupedChats = savedChats.reduce((acc, chat) => {
    const date = new Date(chat.messages[0]?.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(chat);
    return acc;
  }, {});

  const filteredChats = Object.keys(groupedChats).reduce((acc, date) => {
    const filteredDateChats = groupedChats[date].filter(chat => 
      filterRating === 0 || chat.rating === filterRating
    );
    
    if (filteredDateChats.length > 0) {
      acc[date] = filteredDateChats;
    }
    
    return acc;
  }, {});

  const handleFilterChange = (rating) => {
    setFilterRating(rating === filterRating ? 0 : rating);
  };

  const handleLoadChat = (chat) => {
    loadChat(chat);
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.header}>
        <h1>Conversation History</h1>
        
        <div className={styles.filters}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button 
              key={rating}
              className={`${styles.filterButton} ${filterRating === rating ? styles.active : ''}`}
              onClick={() => handleFilterChange(rating)}
            >
              {rating} ★
            </button>
          ))}
        </div>
      </div>
      
      {Object.keys(filteredChats).length > 0 ? (
        Object.keys(filteredChats).map((date) => (
          <div key={date} className={styles.dateGroup}>
            <h2 className={styles.dateHeader}>{date}</h2>
            
            {filteredChats[date].map((chat) => (
              <div key={chat.id} className={styles.chatCard}>
                <div className={styles.chatPreview}>
                  <div className={styles.userMessage}>
                    <div className={styles.avatar}>
                      <img src="https://api.dicebear.com/7.x/personas/svg?seed=User" alt="User" />
                    </div>
                    <div>
                      <div className={styles.sender}>You</div>
                      <div className={styles.message}>
                        {chat.messages[0]?.text}
                      </div>
                      <div className={styles.timestamp}>
                        {new Date(chat.messages[0]?.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {chat.messages[1] && (
                    <div className={styles.aiMessage}>
                      <div className={styles.avatar}>
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Bot" alt="Bot AI" />
                      </div>
                      <div>
                        <div className={styles.sender}>Soul AI</div>
                        <div className={styles.message}>
                          {chat.messages[1]?.text}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={styles.chatMeta}>
                  <div className={styles.rating}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span 
                        key={i}
                        className={i < chat.rating ? styles.starFilled : styles.starEmpty}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {chat.feedback && (
                    <div className={styles.feedback}>
                      <strong>Feedback:</strong> {chat.feedback}
                    </div>
                  )}
                  
                  <Link 
                    to="/history" 
                    className={styles.viewButton}
                    onClick={() => handleLoadChat(chat)}
                  >
                    View Conversation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className={styles.noResults}>
          <p>No saved conversations found.</p>
          {filterRating > 0 && (
            <p>Try removing the rating filter to see all conversations.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default History;