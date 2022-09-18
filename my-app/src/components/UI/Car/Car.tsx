import { ForwardedRef, forwardRef } from "react";
import BoxSvg from "../BoxSvg/BoxSvg";
import classes from "./Car.module.css";


interface IPropsCar {
  color: string
}
const Car = forwardRef(function Hello({ color }: IPropsCar, ref: ForwardedRef<HTMLDivElement>) {

  return (
    <div
      className={classes.car}
      ref={ref} >
      <BoxSvg color={color} id={'car'} />
    </div>
  );
}
)

export default Car;


