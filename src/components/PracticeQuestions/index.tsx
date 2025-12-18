import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PracticeQuestions.module.css';

// Define the type for our props
type PracticeQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;  // Index of the correct option
  explanation: string;
};

type PracticeQuestionsProps = {
  questions: PracticeQuestion[];
};

// Default CSS class for the component
const defaultProps = {
  className: undefined,
};

export default function PracticeQuestions({
  questions,
  className,
}: PracticeQuestionsProps & typeof defaultProps): JSX.Element {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newShowResults = [...showResults];
    newShowResults[questionIndex] = true;
    setShowResults(newShowResults);
  };

  return (
    <section className={clsx('margin-bottom--lg', className)}>
      <h3>Practice Questions</h3>
      <div className={styles.practiceQuestionsContainer}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className={styles.questionContainer}>
            <p className={styles.questionText}>{q.question}</p>
            <ul className={styles.optionsList}>
              {q.options.map((option, oIndex) => (
                <li key={oIndex} className={styles.optionItem}>
                  <label className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={selectedAnswers[qIndex] === oIndex}
                      onChange={() => handleSelect(qIndex, oIndex)}
                      className={styles.optionInput}
                    />
                    <span className={styles.optionText}>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
            {showResults[qIndex] && (
              <div className={styles.feedback}>
                <div className={styles.explanation}>
                  <strong>Explanation:</strong> {q.explanation}
                </div>
                {selectedAnswers[qIndex] === q.correctAnswer ? (
                  <div className={styles.correctFeedback}>✅ Correct!</div>
                ) : (
                  <div className={styles.incorrectFeedback}>
                    ❌ Incorrect. The correct answer is: {q.options[q.correctAnswer]}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}