import { useRef } from "react";
import { deleteCar } from '../../../API/API';
import { ICar } from '../../../type/type';
import BoxSvg from '../BoxSvg/BoxSvg';
import Button from '../Button/Button';
import Car from '../Car/Car';
import classes from './Track.module.css';


interface ITrack {
  car: ICar
  writeCars(): void
  setSelect(car: ICar): void
}

const Track = ({ car, writeCars, setSelect }: ITrack) => {

  // const [drive, setDrive] = useState<boolean>(false)

  const removeCar = async () => {
    await deleteCar(car.id);
    writeCars();
  }

  const carRef = useRef<HTMLDivElement>(null);
  let stopAnimationNumber: number;

  const moveCar = (time: number) => {
    const frames = time / 1000 * 60;
    const clientWidth = document.documentElement.clientWidth;
    const delta = clientWidth / frames;

    if (carRef.current === null) {
      return;
    }
    let currentX = 0;
    const max = clientWidth - 2 * carRef.current.getBoundingClientRect().x;

    const animationCar = () => {
      const step = () => {
        currentX += delta;
        if (carRef.current === null) {
          return;
        }

        carRef.current.style.transform = `translate(${currentX}px)`;
        if (currentX < max) {
          stopAnimationNumber = requestAnimationFrame(step);
        }

      }

      step()
    }

    animationCar()
  }

  return (
    <div className={classes.track__container}>
      <div className={classes.track__buttons_vertical} >
        <Button
          onClick={() => {
            moveCar(3000)
            console.log(carRef)
          }
          }
          isActive={false} >
          GO
        </Button>
        <Button
          onClick={() => {
            cancelAnimationFrame(stopAnimationNumber)
            if (carRef.current === null) {
              return
            }

            carRef.current.style.transform = `translate(0px)`;
          }
          }
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
