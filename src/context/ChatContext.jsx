import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

// Sample AI responses
const AI_RESPONSES = {
  default: "Sorry, Did not understand your query!",
  greeting: "Hi There. How can I assist you today?",
  weather: "I don't have access to real-time weather data. You can check a weather service for that information.",
  location: "As an AI Language Model, I don't have the ability to detect your location.",
  help: "I'm here to help answer your questions. What would you like to know?",
  api:"Can you explain RESTful APIs?"
};

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState({
    id: `chat-${Date.now()}`,
    messages: [],
    rating: 0,
    feedback: ''
  });
  
  const [savedChats, setSavedChats] = useState(() => {
    const saved = localStorage.getItem('botAIChats');
    return saved ? JSON.parse(saved) : [];
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem('botAIChats', JSON.stringify(savedChats));
  }, [savedChats]);
  
  const startNewChat = () => {
    setCurrentChat({
      id: `chat-${Date.now()}`,
      messages: [],
      rating: 0,
      feedback: ''
    });
    navigate('/');
  };
  
  const addMessage = (message) => {
    setCurrentChat(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };
  
  const aiResponse = (userMessage) => {
    let response = AI_RESPONSES.default;
    
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
      response = AI_RESPONSES.greeting;
    } else if (lowercaseMessage.includes('weather')) {
      response = AI_RESPONSES.weather;
    } else if (lowercaseMessage.includes('location')) {
      response = AI_RESPONSES.location;
    } else if (lowercaseMessage.includes('help')) {
      response = AI_RESPONSES.help;
    } else if(lowercaseMessage.includes('apis')){
        response = AI_RESPONSES.api;
    }
    
    const aiMessage = {
      id: `ai-${Date.now()}`,
      sender: 'Soul AI',
      text: response,
      timestamp: new Date().toISOString()
    };
    
    addMessage(aiMessage);
  };
  
  const rateMessage = (messageId, rating) => {
    setCurrentChat(prev => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === messageId 
          ? { ...msg, rating: msg.rating === rating ? null : rating } 
          : msg
      )
    }));
  };
  
  const saveCurrentChat = (feedback = '') => {
    // Only save if there are messages
    if (currentChat.messages.length > 0) {
      const chatToSave = {
        ...currentChat,
        feedback,
        rating: currentChat.rating || 3, // Default to 3 stars if not rated
      };
      
      setSavedChats(prev => [chatToSave, ...prev]);
      startNewChat();
    }
  };
  
  const updateCurrentChatRating = (rating) => {
    setCurrentChat(prev => ({
      ...prev,
      rating
    }));
  };
  
  const loadChat = (chat) => {
    setCurrentChat(chat);
    navigate('/');
  };
  
  const value = {
    currentChat,
    savedChats,
    addMessage,
    aiResponse,
    rateMessage,
    saveCurrentChat,
    updateCurrentChatRating,
    startNewChat,
    loadChat
  };
  
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);