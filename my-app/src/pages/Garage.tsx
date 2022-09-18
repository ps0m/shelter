import { useContext, useEffect, useState } from 'react';
import { getCars } from '../API/API';
import Car from '../components/UI/Car/Car';
import ControlPanel from '../components/UI/ControlPanel/ControlPanel';
import PageControl from '../components/UI/PageControl/PageControl';
import Title from '../components/UI/Title/Title';
import Track from '../components/UI/Track/Track';
import { WinnersContext } from '../context';
import { setTimeTripAllCars, setTimeTripCar, setWinnerToServer } from '../helpers/helpFunctions';
// import { writeWinners } from '../helpers/helpFunctions';
import { ICar, ICarsWithStatus, namePage, statusEngine } from '../type/type';


function Garage() {
  const [carsOfServer, setCarsOfServer] = useState<ICar[]>([])
  const [carsWithStatus, setCarsWithStatus] = useState<ICarsWithStatus[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectCar, setSelectCar] = useState<ICar>({ id: 0, name: '', color: '#000000' })
  const [winner, setWinner] = useState<ICarsWithStatus | null>(null)
  const [currentResultOfCar, setCurrentResultOfCar] = useState<ICarsWithStatus>()
  const [isRace, setIsRace] = useState<boolean>(false)

  const { amountCars, setAmountCars, nameCurrentPage } = useContext(WinnersContext)

  useEffect(() => {
    initCars(carsOfServer);
  }, [carsOfServer]);

  const initCars = (cars: ICar[]) => {
    const statusArray: ICarsWithStatus[] = cars.map(car => ({ 'car': car, status: 'stopped', time: null }))

    setCarsWithStatus(statusArray);
  }

  const writeCars = async () => {
    const answer = await getCars(currentPage)

    setCarsOfServer(answer[0]);
    setAmountCars(answer[1]);
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
    if (winner === null && currentResultOfCar !== undefined && isRace) {
      setWinner(currentResultOfCar);
    }
  }


  useEffect(() => { writeCars() }, [currentPage])
  useEffect(() => { checkWinner() }, [currentResultOfCar])
  useEffect(() => { setWinnerToServer(winner) }, [winner])

  return (
    <div className={
      nameCurrentPage === namePage.garage
        ? "garage"
        : "garage_hide"
    }
    >
      <div className="panel">
        <ControlPanel
          writeCars={writeCars}
          carSelect={selectCar}
          setSelect={(car: ICar) => { setSelectCar(car) }}
          changeStatus={changeStatusAllCars}
          isRace={isRace}
        />
        {winner !== null
          ? <div className='winner__title'>
            <div>&quot;{winner.car.name}&quot; - is a Winner! His time is {winner?.time} seconds
            </div>
            <Car color={winner.car.color}></Car>
          </div>
          : <div className='winner__title'>
            <div>Winner will be here!</div>
          </div>
        }
      </div>
      <div className='information'>
        <Title
          amount={amountCars}
          currentPage={currentPage}
          title={'Garage'} />
        <PageControl
          current={currentPage}
          setCurrent={setCurrentPage}
          amount={amountCars}
        />
      </div>

      {
        carsWithStatus.map(carWithStatus => {
          return <Track
            carWithStatus={carWithStatus}
            writeCars={writeCars}
            setSelect={(car: ICar) => { setSelectCar(car) }}
            changeStatus={changeStatusOneCar}
            setCurrentResultOfCar={setCurrentResultOfCar}
            isRace={isRace}
            key={carWithStatus.car.id} />
        })
      }



    </div >
  );
}

export default Garage;
