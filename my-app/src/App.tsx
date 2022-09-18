import { useState } from 'react';
import MyFooter from './components/UI/MyFooter/MyFooter';
import Navigation from './components/UI/Navigation/Navigation';
import { WinnersContext } from './context';
import Garage from './pages/Garage';
import Winners from './pages/Winners';
import './styles/App.css';
import { namePage } from './type/type';

function App() {
  const [amountCars, setAmountCars] = useState<number>(0)
  const [nameCurrentPage, setNameCurrentPage] = useState<namePage>(namePage.garage)
  const [abortController, setAbortController] = useState<AbortController>(new AbortController())


  return (
    <WinnersContext.Provider value={{
      amountCars,
      setAmountCars,
      nameCurrentPage,
      setNameCurrentPage,
      abortController,
      setAbortController
    }}>
      <div className='container'>
        <MyFooter></MyFooter>
        <Navigation></Navigation>
        <Garage></Garage>
        <Winners></Winners>
      </div >
    </WinnersContext.Provider>

  );
}

export default App;
