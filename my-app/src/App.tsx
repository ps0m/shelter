import { useEffect, useState } from 'react';
import { getCars } from './API/API';
import ControlPanel from './components/UI/ControlPanel/ControlPanel';
import PageControl from './components/UI/PageControl/PageControl';
import Title from './components/UI/Title/Title';
import Track from './components/UI/Track/Track';
import './styles/App.css';
import { ICar } from './type/type';

function App() {
  const [cars, setCars] = useState<ICar[]>([])
  const [selectCar, setSelectCar] = useState<ICar>({ id: 0, name: '', color: '#000000' })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [amountCars, setAmountCars] = useState<number>(0)

  const writeCars = async () => {
    const answer = await getCars(currentPage)

    setCars(answer[0]);
    setAmountCars(answer[1]);
    console.log('wr', answer[0], answer[1]);

  }

  useEffect(() => { writeCars() }, [currentPage])

  return (
    <div className="App">
      <div className="panel">
        <ControlPanel
          writeCars={writeCars}
          carSelect={selectCar}
          setSelect={(car: ICar) => { setSelectCar(car) }}
        />
        <div className="img" />
      </div>

      <Title
        amountCars={amountCars}
        currentPage={currentPage} />

      {cars.map(car => {
        return <Track
          car={car}
          writeCars={writeCars}
          setSelect={(car: ICar) => { setSelectCar(car) }}
          key={car.id} />
      })}

      <PageControl
        current={currentPage}
        setCurrent={setCurrentPage}
        amountCars={amountCars}
      />
    </div>
  );
}

export default App;
