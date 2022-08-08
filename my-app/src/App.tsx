import { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { WinnersContext } from './context';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import './styles/App.css';
import { IWinner } from './type/type';

function App() {
  const [amountCars, setAmountCars] = useState<number>(0)
  const [winners, setWinners] = useState<IWinner[]>([]);



  return (
    <WinnersContext.Provider value={{
      amountCars,
      setAmountCars,
      winners,
      setWinners
    }}>
      <BrowserRouter>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            alignItems: 'center'
          }}
        >
          <Link to="/garage">Garage</Link> |{" "}
          <Link to="/winners">Winners</Link>
        </nav>
        <Routes>
          <Route path="/garage" element={<Garage />} />
          <Route path="/winners" element={<Winners />} />
        </Routes>
      </BrowserRouter>
    </WinnersContext.Provider>
  );
}

export default App;
