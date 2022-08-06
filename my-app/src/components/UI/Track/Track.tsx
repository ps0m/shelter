import { useEffect, useRef, useState } from "react";
import { controlEngine, deleteCar, switchEngine } from '../../../API/API';
import { ICar, statusCar } from '../../../type/type';
import BoxSvg from '../BoxSvg/BoxSvg';
import Button from '../Button/Button';
import Car from '../Car/Car';
import classes from './Track.module.css';


interface ITrack {
  car: ICar
  writeCars(): void
  setSelect(car: ICar): void
  command: statusCar
}

const Track = ({ car, writeCars, setSelect, command }: ITrack) => {

  const [drive, setDrive] = useState<statusCar>(command)



  const carRef = useRef<HTMLDivElement>(null);
  let stopAnimationFlag: number;


  const removeCar = async () => {
    await deleteCar(car.id);
    writeCars();
  }

  const moveCar = (time: number) => {
    const frames = time / 1000 * 60;
    const clientWidth = document.documentElement.clientWidth;
    const delta = clientWidth / frames;

    if (carRef.current === null) {
      return;
    }

    const clientRect = carRef.current.getBoundingClientRect()
    const maxDistance = clientWidth - clientRect.left - 1.5 * clientRect.width;

    const animationCar = () => {
      let currentX = 0;
      const step = () => {
        currentX += delta;

        if (carRef.current === null) {
          return;
        }

        carRef.current.style.transform = `translate(${currentX}px)`;

        if (currentX < maxDistance) {
          stopAnimationFlag = requestAnimationFrame(step);
        }

      }

      step()
    }

    animationCar()
  }



  const startCar = async () => {
    const response = await controlEngine({ id: car.id, status: 'started' });
    const time = response.distance / response.velocity;

    moveCar(time);

    await switchEngine(car.id).catch(() => stopCar());
  }



  const stopCar = async () => {
    cancelAnimationFrame(stopAnimationFlag);
    await controlEngine({ id: car.id, status: 'stopped' });
  }


  const returnToStart = () => {

    if (carRef.current === null) {
      return
    }

    carRef.current.style.transform = `translate(0px)`;

  }

  if (command !== drive) {
    setDrive(command);
  }

  useEffect(() => {
    switch (drive) {
      case 'started':
        startCar()
        break;
      case 'stopped':
        stopCar();
        returnToStart();
        break;
      default:
        break;
    }

  }, [drive]);



  // switch (drive) {
  //   case 'started':
  //     startCar()
  //     break;
  //   case 'stopped':
  //     stopCar();
  //     returnToStart();
  //     break;
  //   default:
  //     break;
  // }


  return (
    <div className={classes.track__container}>
      <div className={classes.track__buttons_vertical} >
        <Button
          // onClick={startCar}
          onClick={() => setDrive('started')}
          isActive={false} >
          GO
        </Button>
        <Button
          // onClick={() => {
          //   stopCar();
          //   returnToStart();
          // }
          // }
          onClick={() => setDrive('stopped')}
          isActive={false} >
          STOP
        </Button>
      </div>

      <div className={classes.track__body}>
        <div className={classes.track__buttons} >
          <Button
            onClick={() => { setSelect(car) }} isActive={false} >
            SELECT
          </Button>
          <Button
            onClick={() => removeCar()}
            isActive={false} >
            REMOVE
          </Button>
        </div>
        <Car
          color={car.color}
          ref={carRef}
        />
      </div>

      <div className={classes.track__title}>{car.name}</div>

      <div className={classes.track__flag}>
        <BoxSvg color={'#ff0000'} id={'flag'} />
      </div>

    </div >
  );
}

export default Track;
