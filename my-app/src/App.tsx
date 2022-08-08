import { useEffect, useState } from 'react';
import { controlEngine, getCars } from './API/API';
import ControlPanel from './components/UI/ControlPanel/ControlPanel';
import PageControl from './components/UI/PageControl/PageControl';
import Title from './components/UI/Title/Title';
import Track from './components/UI/Track/Track';
import './styles/App.css';
import { ICar, ICarsWithStatus, IVelocityAndDistance, statusEngine } from './type/type';

function App() {
  const [cars, setCars] = useState<ICar[]>([])
  const [selectCar, setSelectCar] = useState<ICar>({ id: 0, name: '', color: '#000000' })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [amountCars, setAmountCars] = useState<number>(0)
  const [carsWithStatus, setCarsWithStatus] = useState<ICarsWithStatus[]>([])
  const [winner, setWinner] = useState<ICarsWithStatus | null>(null)
  const [currentResultOfCar, setCurrentResultOfCar] = useState<ICarsWithStatus>()
  const [isRace, setIsRace] = useState<boolean>(false)


  useEffect(() => {
    const statusArray: ICarsWithStatus[] = [];

    cars.map(car => statusArray.push({ 'car': car, status: 'stopped', time: null }))
    setCarsWithStatus(statusArray);
  }, [cars]);
  const writeCars = async () => {
    const answer = await getCars(currentPage)

    setCars(answer[0]);
    setAmountCars(answer[1]);
  }

  const setTimeTripAllCars = async (cars: ICarsWithStatus[]) => {
    const newCars = [...cars]
    const promiseArr = []

    for (let i = 0; i < newCars.length; i++) {
      if (newCars[i].status === 'started') {
        promiseArr.push(controlEngine({ id: newCars[i].car.id, status: 'started' }))
      }
    }
    const resultArray: PromiseSettledResult<IVelocityAndDistance>[] = await Promise.allSettled(promiseArr)

    resultArray.map((promise, index) => {
      if (promise.status === 'fulfilled') {
        newCars[index].time = promise.value.distance / promise.value.velocity
        console.log(newCars[index].time);
      }
    })

    return newCars;
  }

  const setTimeTripCar = async (car: ICarsWithStatus, command: statusEngine) => {
    const response: IVelocityAndDistance = await controlEngine({ id: car.car.id, status: command })

    return response.distance / response.velocity;
  }

  const changeStatusOneCar = async (currentCar: ICarsWithStatus, command: statusEngine) => {
    const newCarsWithStatus: ICarsWithStatus[] = [...carsWithStatus]

    const timeTripCar = await setTimeTripCar(currentCar, command)

    newCarsWithStatus.map(item => {
      if (item.car.id === currentCar.car.id) {
        item.status = command
        item.time = timeTripCar
      }

      newCarsWithStatus
    })

    setCarsWithStatus(newCarsWithStatus)
  }

  const changeStatusAllCars = async (command: statusEngine) => {
    const newCarsWithStatus: ICarsWithStatus[] = [...carsWithStatus]

    newCarsWithStatus.map(item => item.status = command)

    setCarsWithStatus(await setTimeTripAllCars(newCarsWithStatus))

    if (command === 'started') {
      setIsRace(true)
    } else {
      setIsRace(false)
      setWinner(null)
    }
  }


  const checkWinner = () => {
    if (winner === null && currentResultOfCar !== undefined) {
      setWinner(currentResultOfCar);
    }
  }

  useEffect(() => { writeCars() }, [currentPage])
  useEffect(() => { checkWinner() }, [currentResultOfCar])

  return (
    <div className="App">
      <div className="panel">
        <ControlPanel
          writeCars={writeCars}
          carSelect={selectCar}
          setSelect={(car: ICar) => { setSelectCar(car) }}
          changeStatus={changeStatusAllCars}
          isRace={isRace}
        // cars={carsWithStatus}
        />
        {/* <div className="img" /> */}
        {winner !== null
          ? <p className='winner__title'>&quot;{winner.car.name}&quot; - you a Winner! Your time is {winner?.time?.toFixed()} milliseconds</p>
          : ''
        }
      </div>

      <Title
        amountCars={amountCars}
        currentPage={currentPage} />

      {carsWithStatus.map(carWithStatus => {
        return <Track
          carWithStatus={carWithStatus}
          writeCars={writeCars}
          setSelect={(car: ICar) => { setSelectCar(car) }}
          changeStatus={changeStatusOneCar}
          setCurrentResultOfCar={setCurrentResultOfCar}
          isRace={isRace}
          key={carWithStatus.car.id} />
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
