import { deleteCar } from '../../../API/API';
import { ICar } from '../../../type/type';
import BoxSvg from '../BoxSvg/BoxSvg';
import Button from '../Button/Button';
import Car from './Car/Car';
import classes from './Track.module.css';

interface ITrack {
  car: ICar
  writeCars(): void
  setSelect(car: ICar): void
}

const Track = ({ car, writeCars, setSelect }: ITrack) => {
  const removeCar = async () => {
    await deleteCar(car.id);
    writeCars();
  }


  return (
    <div className={classes.track__container}>
      <div className={classes.track__buttons_vertical} >
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target)
        }} isActive={false} >
          GO
        </Button>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target)
        }} isActive={false} >
          {/* <div> */}
          STOP
          {/* </div> */}
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
        <Car color={car.color} />
      </div>

      <div className={classes.track__title}>{car.name}</div>

      <div className={classes.track__flag}>
        <BoxSvg color={'#ff0000'} id={'flag'} />
      </div>

    </div >
  );
}

export default Track;
