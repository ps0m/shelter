import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = () => {
  return (
    <button className={classes.button}>
      <p>Купить</p>
      <div className={classes.button__image}></div>
    </button>
  );
};
export default MyButton;