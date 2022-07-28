import React from 'react';
import classes from './MyButtonStar.module.css';
import logo from './full_star.svg'

const MyButtonStar = () => {
  return (
    <button className={classes.button}>
      <img className={classes.button__star} src={logo} alt="" />
    </button>
  );
};

export default MyButtonStar;