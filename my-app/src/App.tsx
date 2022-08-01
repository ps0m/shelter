import { useEffect, useState } from 'react';
import { getCars } from './API/API';
import ControlPanel from './components/UI/ControlPanel/ControlPanel';
import Track from './components/UI/Track/Track';
import './styles/App.css';
import { ICar } from './type/type';

function App() {
  const [cars, setCars] = useState<ICar[]>([])
  const [selectCar, setSelectCar] = useState<ICar>({ id: 0, name: '', color: '#000000' })
  const [currentPage, setCurrentPage] = useState<number>(1)

  const writeCars = async () => {
    setCars(await getCars(currentPage))
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
      {cars.map(car => {
        return <Track
          car={car}
          writeCars={writeCars}
          setSelect={(car: ICar) => { setSelectCar(car) }}
          key={car.id} />
      })}

    </div>
  );
}

export default App;
