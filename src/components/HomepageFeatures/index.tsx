import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/physical-ai-concept.svg').default,
    description: (
      <>
        This textbook focuses on Physical AI and Humanoid Robotics,
        exploring how intelligent systems interact with and operate in the physical world.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/human-robot-interaction.svg').default,
    description: (
      <>
        This textbook focuses on the essential concepts of Physical AI and Humanoid Robotics,
        helping learners understand intelligent systems that interact with the physical world.
      </>
    ),
  },
  {
    title: 'Physical AI in Action',
    Svg: require('@site/static/img/simulation-digital-twins.svg').default,
    description: (
      <>
        This textbook explores how intelligent systems combine perception,
        decision-making, and control to operate effectively in real-world physical environments.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
