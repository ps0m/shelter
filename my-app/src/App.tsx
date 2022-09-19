import { useMemo, useState } from 'react';
import MyFooter from './components/UI/MyFooter/MyFooter';
import Navigation from './components/UI/Navigation/Navigation';
import WinnersContext from './context';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import './styles/App.css';
import { namePage } from './type/type';

function App() {
  const [amountCars, setAmountCars] = useState<number>(0);
  const [nameCurrentPage, setNameCurrentPage] = useState<namePage>(namePage.garage);
  const [abortController, setAbortController] = useState<AbortController>(new AbortController());

  const value = useMemo(() => ({
    amountCars,
    setAmountCars,
    nameCurrentPage,
    setNameCurrentPage,
    abortController,
    setAbortController,
  }), [abortController, amountCars, nameCurrentPage]);

  return (
    <WinnersContext.Provider value={value}>
      <div className="container">
        <MyFooter />
        <Navigation />
        <Garage />
        <Winners />
      </div>
    </WinnersContext.Provider>

  );
}

export default App;
