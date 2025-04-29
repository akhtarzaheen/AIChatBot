import React, { useState } from 'react';
import styles from './FeedbackModal.module.css';
import { Lightbulb as LightBulb } from 'lucide-react';

const FeedbackModal = ({ onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = () => {
    onSubmit(feedback);
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <LightBulb size={20} />
            <h2>Provide Additional Feedback</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        
        <textarea
          className={styles.feedbackInput}
          placeholder="Share your thoughts about this conversation..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        
        <div className={styles.modalFooter}>
          <button 
            className={styles.submitButton}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;