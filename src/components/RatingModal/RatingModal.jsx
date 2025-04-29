import React, { useState } from 'react';
import styles from './RatingModal.module.css';
import { Star } from 'lucide-react';

const RatingModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Rate this conversation</h2>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        
        <div className={styles.ratingContainer}>
          <div className={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`${styles.starButton} ${
                  (hoveredRating || rating) >= star ? styles.active : ''
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star fill={(hoveredRating || rating) >= star ? '#FFD700' : 'none'} />
              </button>
            ))}
          </div>
          <div className={styles.ratingText}>
            {rating > 0 ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button 
            className={`${styles.submitButton} ${rating === 0 ? styles.disabled : ''}`}
            onClick={handleSubmit}
            disabled={rating === 0}
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;