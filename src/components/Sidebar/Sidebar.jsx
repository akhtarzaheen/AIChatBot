import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useChatContext } from '../../context/ChatContext';
import { Brain } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  const { startNewChat } = useChatContext();
  
  const handleNewChat = () => {
    startNewChat();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Brain size={24} />
        <h2>Bot AI</h2>
      </div>
      
      <div className={styles.menuContainer}>
        <div className={styles.newChatContainer}>
          <Link to="/" className={styles.newChatButton} onClick={handleNewChat}>
            New Chat
          </Link>
          <button className={styles.editButton}>
            <i className="edit-icon">✏️</i>
          </button>
        </div>
        
        <Link 
          to="/history" 
          className={`${styles.menuItem} ${location.pathname === '/history' ? styles.active : ''}`}
        >
          Past Conversations
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;