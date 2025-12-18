import React from 'react';
import clsx from 'clsx';
import styles from './KeyTakeaways.module.css';

// Define the type for our props
type KeyTakeawaysProps = {
  items: string[];
};

// Default CSS class for the component
const defaultProps = {
  className: undefined,
};

export default function KeyTakeaways({
  items,
  className,
}: KeyTakeawaysProps & typeof defaultProps): JSX.Element {
  return (
    <section className={clsx('margin-bottom--lg', className)}>
      <h3>Key Takeaways</h3>
      <ul className={styles.keyTakeawaysList}>
        {items.map((item, index) => (
          <li key={index} className={styles.keyTakeawayItem}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}