import React from 'react';
import classes from './MyHeader.module.css';
import MyBasket from "../MyBasket/MyBasket";

const MyHeader = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>Plantify</h1>
      <div className={classes.header__logo}></div>
      <MyBasket counter={20} ></MyBasket>
    </header >
  );
};
export default MyHeader;