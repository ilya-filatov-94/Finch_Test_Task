import { FC, memo } from 'react';
import Card from '../Card/Card';
import ResultCard from './ResultCard';

const ResultTicket: FC<{ headerTicket: string }> = memo(({ headerTicket }) => {
  return <Card content={<ResultCard headerTicket={headerTicket} />} />;
});

export default ResultTicket;
