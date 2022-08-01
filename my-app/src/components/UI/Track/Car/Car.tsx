import BoxSvg from "../../BoxSvg/BoxSvg";
import classes from "./Car.module.css";

interface IPropsCar {
  color: string
}

const Car = ({ color }: IPropsCar) => {
  return (
    <div className={classes.car}>
      <BoxSvg color={color} id={'car'} />
    </div>
  );
};

export default Car;