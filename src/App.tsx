import { FC } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameTicket from './components/GameCard';
import ResultTicket from './components/ResultCard';

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route index element={<GameTicket headerTicket="Билет 1" />} />
          <Route path="result" element={<ResultTicket headerTicket="Билет 1" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
