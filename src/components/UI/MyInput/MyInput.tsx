import React, { ChangeEvent } from 'react';
import classes from "./MyInput.module.css";

interface PropsMyInput {
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  clearValue(): void;
  children?: React.ReactNode;
}

const MyInput = (props: PropsMyInput) => {
  return (
    <div className={classes.input}>
      <input
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={classes.input__body}
        autoFocus>
      </input >
      {props.children}
      < div className={classes.input__icon} onClick={props.clearValue}></ div>
    </div>
  );
};
export default MyInput;

