import { useContext, useEffect, useState } from 'react';
import { controlEngine, createWinner, getCars, updateWinner } from '../API/API';
import ControlPanel from '../components/UI/ControlPanel/ControlPanel';
import PageControl from '../components/UI/PageControl/PageControl';
import Title from '../components/UI/Title/Title';
import Track from '../components/UI/Track/Track';
import { WinnersContext } from '../context';
import { writeWinners } from '../helpers/helpFunctions';
import '../styles/App.css';
import { ICar, ICarsWithStatus, IVelocityAndDistance, statusEngine } from '../type/type';


function Garage() {
  const [carsOfServer, setCarsOfServer] = useState<ICar[]>([])
  const [carsWithStatus, setCarsWithStatus] = useState<ICarsWithStatus[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectCar, setSelectCar] = useState<ICar>({ id: 0, name: '', color: '#000000' })
  const [winner, setWinner] = useState<ICarsWithStatus | null>(null)
  const [currentResultOfCar, setCurrentResultOfCar] = useState<ICarsWithStatus>()
  const [isRace, setIsRace] = useState<boolean>(false)

  const { amountCars, setAmountCars, winners, setWinners } = useContext(WinnersContext)

  // console.log('2', winners);

  useEffect(() => {
    initCars(carsOfServer);
    initWinners();
  }, [carsOfServer]);

  const initCars = (cars: ICar[]) => {
    const statusArray: ICarsWithStatus[] = [];

    cars.map(car => statusArray.push({ 'car': car, status: 'stopped', time: null }))
    setCarsWithStatus(statusArray);
  }


  const initWinners = async () => {
    setWinners(await writeWinners())
  }


  const writeCars = async () => {
    const answer = await getCars(currentPage)

    setCarsOfServer(answer[0]);
    setAmountCars(answer[1]);
  }

  const setTimeTripAllCars = async (carsOfServer: ICarsWithStatus[]) => {
    const newCars = [...carsOfServer]
    const promiseArr = []

    for (let i = 0; i < newCars.length; i++) {
      if (newCars[i].status === 'started') {
        promiseArr.push(controlEngine({ id: newCars[i].car.id, status: 'started' }))
      }
    }
    const resultArray: PromiseSettledResult<IVelocityAndDistance>[] = await Promise.allSettled(promiseArr)

    resultArray.map((promise, index) => {
      if (promise.status === 'fulfilled') {
        const time = Number(((promise.value.distance / promise.value.velocity) / 1000).toFixed(2))

        console.log('time', time);

        newCars[index].time = time
        // console.log(newCars[index].time);
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

  const setWinnerToServer = async (winnerCar: ICarsWithStatus | null) => {
    console.log('winnerCar', winnerCar);

    if (winnerCar === null) {
      return
    }
    const newWinners = [...winners]
    let isWinnersContainCurrentWinner = false

    newWinners.map(item => {
      if (item.car.id === winnerCar.car.id) {
        if (winnerCar.time === null) {
          return
        }

        console.log(item);

        item.wins += 1;
        if (item.time > winnerCar.time) {
          item.time = winnerCar.time
        }

        isWinnersContainCurrentWinner = true;

        console.log('update', item.car.id, item.wins, item.time);

        updateWinner({ id: item.car.id, wins: item.wins, time: item.time })
      }
    })

    if (isWinnersContainCurrentWinner) {
      setWinners([...newWinners])
    } else {
      if (winnerCar.time === null) {
        return
      }

      console.log('update', winnerCar.car.id, winnerCar.time, 1);

      createWinner({ id: winnerCar.car.id, wins: 1, time: winnerCar.time, })
      setWinners([...newWinners, { car: winnerCar.car, wins: 1, time: winnerCar.time }])
    }
  }

  useEffect(() => { writeCars() }, [currentPage])
  useEffect(() => { checkWinner() }, [currentResultOfCar])
  useEffect(() => { setWinnerToServer(winner) }, [winner])

  return (
    <div className="App">
      <div className="panel">
        <ControlPanel
          writeCars={writeCars}
          carSelect={selectCar}
          setSelect={(car: ICar) => { setSelectCar(car) }}
          changeStatus={changeStatusAllCars}
          isRace={isRace}
        />
        {winner !== null
          ? <div className='winner__title'>&quot;{winner.car.name}&quot; - is a Winner! Time is {winner?.time} seconds</div>
          : ''
        }
      </div>

      <Title
        amount={amountCars}
        currentPage={currentPage}
        title={'Garage'} />

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
        amount={amountCars}
      />

    </div>
  );
}

export default Garage;
