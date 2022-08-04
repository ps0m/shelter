import { Dispatch, SetStateAction } from "react";
import { AMOUNT_PER_PAGES } from "../../../API/API";
import Button from "../Button/Button";
import classes from "./PageControl.module.css";

interface IPropsPageControl {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>
  amountCars: number
}

const PageControl = ({ current, setCurrent, amountCars }: IPropsPageControl) => {
  const increase = () => {

    if (amountCars / AMOUNT_PER_PAGES > current) {
      setCurrent(current + 1)
    }

    console.log(amountCars, AMOUNT_PER_PAGES, current);
  }

  const decrease = () => {
    if (current > 1) {
      setCurrent(current - 1)
    }
  }

  return (
    <div className={classes.buttons__container}>
      <Button
        onClick={decrease}
        isActive={current === 1}>
        Prev
      </Button>
      <Button
        onClick={increase}
        isActive={(amountCars / AMOUNT_PER_PAGES) < current}>
        Next
      </Button>
    </div >
  );
};

export default PageControl;