import React from 'react';
import cross from "./cross.svg";
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
      <img className={classes.input__icon} onClick={props.clearValue} src={cross} alt="" />
    </div>
  );
};

export default MyInput;

