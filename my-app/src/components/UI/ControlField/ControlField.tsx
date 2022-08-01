import { MouseEvent, ReactNode } from "react";
import Button from "../Button/Button";
import classes from "./ControlField.module.css";

interface IPropsField {
  children?: ReactNode
}

const ControlField = ({ children }: IPropsField) => {
  return (
    <div className={classes.field__container}>
      <input type="text" />
      <input type="color" />
      <Button onClick={function (e: MouseEvent<HTMLButtonElement>): void {
        console.log(e.target);
      }} isActive={false} >{children}</Button>
    </div>
  );
};

export default ControlField;