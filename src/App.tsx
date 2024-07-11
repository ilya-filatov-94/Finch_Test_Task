import { FC } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Card from './components/Card/Card';
import GameCard from './components/GameCard/GameCard';
import ResultCard from './components/ResultCard/ResultCard';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<Card content={<GameCard headerTicket="Билет 1" />} />} />
          <Route path="result" element={<Card content={<ResultCard headerTicket="Билет 1" />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
