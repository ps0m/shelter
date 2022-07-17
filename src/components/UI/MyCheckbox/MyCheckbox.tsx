import React from 'react';
import classes from "./MyCheckbox.module.css";

export interface PropsMyCheckbox {
  option: string;
  group: string;
  changeFilter(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const MyCheckbox = (props: PropsMyCheckbox) => {
  return (
    <div className={classes.input__container}>
      <input
        type='checkbox'
        id={[props.group, props.option].join('&')}
        className={classes.input}
        onChange={(e) => props.changeFilter(e)} >
      </input>
      <label className={classes.input__title} htmlFor={[props.group, props.option].join('&')}>{props.option}</label>
    </div >
  );
};
export default MyCheckbox;