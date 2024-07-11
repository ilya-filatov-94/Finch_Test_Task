import { FC, ReactNode, memo } from 'react';
import styles from './Card.module.css';

interface ICardProps {
  content: ReactNode;
}

const Card: FC<ICardProps> = memo(({ content }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
});

export default Card;
