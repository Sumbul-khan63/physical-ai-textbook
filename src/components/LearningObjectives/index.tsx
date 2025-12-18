import React from 'react';
import clsx from 'clsx';
import styles from './LearningObjectives.module.css';

// Define the type for our props
type LearningObjectivesProps = {
  items: {
    title: string;
    description: string;
  }[];
};

// Default CSS class for the component
const defaultProps = {
  className: undefined,
};

export default function LearningObjectives({
  items,
  className,
}: LearningObjectivesProps & typeof defaultProps): JSX.Element {
  return (
    <section className={clsx('margin-bottom--lg', className)}>
      <h3>Learning Objectives</h3>
      <ul className={styles.learningObjectivesList}>
        {items.map((item, index) => (
          <li key={index} className={styles.learningObjectiveItem}>
            <strong>{item.title}:</strong> {item.description}
          </li>
        ))}
      </ul>
    </section>
  );
}