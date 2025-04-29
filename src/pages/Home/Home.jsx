import React, { useState, useRef, useEffect } from 'react';
import { useChatContext } from '../../context/ChatContext';
import ChatHeader from '../../components/ChatHeader/ChatHeader.jsx';
import MessageList from '../../components/MessageList/MessageList.jsx';
import QuickPrompts from '../../components/QuickPrompts/QuickPrompts.jsx';
import MessageInput from '../../components/MessageInput/MessageInput.jsx';
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal.jsx';
import RatingModal from '../../components/RatingModal/RatingModal.jsx';
import styles from './Home.module.css';

const Home = () => {
  const { 
    currentChat, 
    addMessage, 
    aiResponse, 
    saveCurrentChat 
  } = useChatContext();
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat.messages]);

  useEffect(() => {
    setIsInitialState(currentChat.messages.length === 0);
  }, [currentChat.messages]);

  const handleMessageSubmit = (message) => {
    addMessage({ 
      id: Date.now().toString(),
      sender: 'You',
      text: message,
      timestamp: new Date().toISOString(),
    });

    // Simulate AI response
    setTimeout(() => {
      aiResponse(message);
    }, 1000);

    setIsInitialState(false);
  };

  const handleSaveChat = () => {
    if (currentChat.messages.length > 0) {
      setShowRatingModal(true);
    }
  };

  const handleRatingSubmit = (rating) => {
    setShowRatingModal(false);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = (feedback) => {
    saveCurrentChat(feedback);
    setShowFeedbackModal(false);
  };

  return (
    <div className={styles.homeContainer}>
      <ChatHeader />
      
      <div className={styles.chatContent}>
        {isInitialState ? (
          <div className={styles.initialState}>
            <h2>How Can I Help You Today?</h2>
            <div className={styles.botIcon}>
              <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Bot" alt="Bot AI" />
            </div>
            <QuickPrompts onPromptSelect={handleMessageSubmit} />
          </div>
        ) : (
          <MessageList messages={currentChat.messages} />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.inputContainer}>
        <MessageInput onSubmit={handleMessageSubmit} onSave={handleSaveChat} />
      </div>

      {showFeedbackModal && (
        <FeedbackModal 
          onClose={() => setShowFeedbackModal(false)} 
          onSubmit={handleFeedbackSubmit}
        />
      )}

      {showRatingModal && (
        <RatingModal
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  );
};

export default Home;