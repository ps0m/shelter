import { Dispatch, SetStateAction } from "react";
import { AMOUNT_PER_PAGES } from "../../../API/API";
import Button from "../Button/Button";
import classes from "./PageControl.module.css";

interface IPropsPageControl {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>
  amount: number
}

const PageControl = ({ current, setCurrent, amount }: IPropsPageControl) => {
  const increase = () => {

    if (amount / AMOUNT_PER_PAGES > current) {
      setCurrent(current + 1)
    }

    console.log(amount, AMOUNT_PER_PAGES, current);
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
        isActive={(amount / AMOUNT_PER_PAGES) < current}>
        Next
      </Button>
    </div >
  );
};

export default PageControl;