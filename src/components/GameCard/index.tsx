import { FC, memo } from 'react';
import Card from '../Card/Card';
import GameCard from './GameCard';

const GameTicket: FC<{ headerTicket: string }> = memo(({ headerTicket }) => {
  return <Card content={<GameCard headerTicket={headerTicket} />} />;
});

export default GameTicket;
