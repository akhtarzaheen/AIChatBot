import React from 'react';
import styles from './QuickPrompts.module.css';

const SAMPLE_PROMPTS = [
  {
    id: 'weather',
    title: 'Hi, what is the weather',
    description: 'Get immediate AI generated response'
  },
  {
    id: 'location',
    title: 'Hi, what is my location',
    description: 'Get immediate AI generated response'
  },
  {
    id: 'temperature',
    title: 'Hi, what is the temperature',
    description: 'Get immediate AI generated response'
  },
  {
    id: 'greeting',
    title: 'Hi, how are you',
    description: 'Get immediate AI generated response'
  }
];

const QuickPrompts = ({ onPromptSelect }) => {
  return (
    <div className={styles.promptsContainer}>
      {SAMPLE_PROMPTS.map((prompt) => (
        <div 
          key={prompt.id}
          className={styles.promptCard}
          onClick={() => onPromptSelect(prompt.title)}
        >
          <h3>{prompt.title}</h3>
          <p>{prompt.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickPrompts;