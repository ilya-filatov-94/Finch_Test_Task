import { FC } from 'react';
import styles from './ResultCard.module.css';
import { useAppSelector } from '../../hooks/useTypedRedux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const ResultCard: FC<{ headerTicket: string }> = ({ headerTicket }) => {
  const navigate = useNavigate();
  const { isWon } = useAppSelector(state => state.resultGame);

  return (
    <div className={styles.wrapperCard}>
      <div>
        <h1 className={styles.header}>{headerTicket}</h1>
        <p className={styles.resultText}>
          {isWon ? 'Ого, Вы выиграли! Поздравляем!' : 'К сожалению, Вы проиграли, повезёт в другой раз!'}
        </p>
      </div>
      <div className={styles.wrapperButton}>
        <Button text="Попробовать снова" onPointerDown={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default ResultCard;
