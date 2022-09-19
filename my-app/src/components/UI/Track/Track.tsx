/* eslint-disable no-unused-vars */
import {
  Dispatch, SetStateAction, useContext, useEffect, useRef,
} from 'react';
import {
  controlEngine, deleteCar, deleteWinner, switchEngine,
} from '../../../API/API';
import WinnersContext from '../../../context';
import { ICar, ICarsWithStatus, statusEngine } from '../../../type/type';
import BoxSvg from '../BoxSvg/BoxSvg';
import Button from '../Button/Button';
import Car from '../Car/Car';
import './Track.css';

interface ITrack {
  carWithStatus: ICarsWithStatus
  writeCars(): void
  setSelect(car: ICar): void
  changeStatus: (car: ICarsWithStatus, command: statusEngine) => void
  setCurrentResultOfCar: Dispatch<SetStateAction<ICarsWithStatus | undefined>>
  isRace: boolean
}

const Track = ({
  carWithStatus, writeCars, setSelect, changeStatus, setCurrentResultOfCar, isRace,
}: ITrack) => {
  const { abortController } = useContext(WinnersContext);

  const carRef = useRef<HTMLDivElement>(null);

  const removeCar = async () => {
    deleteCar(carWithStatus.car.id);
    deleteWinner(carWithStatus.car.id);
    writeCars();
  };

  const moveCar = (time: number) => {
    if (carRef.current === null) {
      return;
    }

    const { clientWidth } = document.documentElement;
    const clientRect = carRef.current.getBoundingClientRect();
    const maxDistance = clientWidth - clientRect.left - 1.5 * clientRect.width;

    carRef.current.style.cssText = `--from-translate:0; --to-translate:${maxDistance}px;
      animation:slide ${time}s linear 1 forwards`;
  };

  const startCar = () => {
    if (carWithStatus.time !== null) {
      moveCar(carWithStatus.time);
    }
  };

  const stopCar = async () => {
    controlEngine({ id: carWithStatus.car.id, status: 'stopped' });
    if (carRef.current === null) {
      return;
    }

    carRef.current.style.animationPlayState = 'paused';
  };

  const returnToStart = () => {
    if (carRef.current === null) {
      return;
    }

    carRef.current.style.cssText = '';
  };

  const switchStatus = async (status: statusEngine) => {
    switch (status) {
      case 'started':
        startCar();
        switchEngine(carWithStatus.car.id, abortController)
          .then(() => {
            if (isRace) {
              setCurrentResultOfCar(carWithStatus);
            }
          })
          .catch(() => stopCar());
        break;
      case 'stopped':
        stopCar();
        returnToStart();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switchStatus(carWithStatus.status);
  }, [carWithStatus.status]);

  return (
    <div className="track__container">
      <div className="track__background" />
      <div className="track__buttons_vertical">
        <Button
          disabled={isRace || carWithStatus.status === 'started'}
          onClick={async () => {
            changeStatus(carWithStatus, 'started');
          }}
          isActive={isRace}
        >
          GO
        </Button>
        <Button
          disabled={isRace || carWithStatus.status === 'stopped'}
          onClick={() => {
            changeStatus(carWithStatus, 'stopped');
          }}
          isActive={isRace}
        >
          STOP
        </Button>
      </div>

      <div className="track__body">
        <div className="track__buttons">
          <Button
            disabled={isRace}
            onClick={() => { setSelect(carWithStatus.car); }}
            isActive={isRace}
          >
            SELECT
          </Button>
          <Button
            disabled={isRace}
            onClick={() => removeCar()}
            isActive={isRace}
          >
            REMOVE
          </Button>
        </div>
        <Car
          color={carWithStatus.car.color}
          ref={carRef}
        />
      </div>

      <div className="track__title">{carWithStatus.car.name}</div>

      <div className="track__flag">
        <BoxSvg color="#ff0000" id="flag" />
      </div>

    </div>
  );
};

export default Track;
