import React from 'react';
import classes from "./MyCheckbox.module.css";

export interface PropsMyCheckbox {
  name: string;
  id: string;
  isChecked: boolean
  changeFilter(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const MyCheckbox = (props: PropsMyCheckbox) => {
  return (
    <div className={classes.input__container}>
      <input
        type='checkbox'
        id={props.id}
        checked={props.isChecked}
        className={classes.input}
        onChange={(e) => props.changeFilter(e)} >
      </input>
      <label className={classes.input__title} htmlFor={props.id}>{props.name}</label>
    </div >
  );
};

export default MyCheckbox;