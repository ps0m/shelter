import React from 'react';
import classes from './MyHeader.module.css';
import { MyBasket, BasketProps } from "../MyBasket/MyBasket";

const MyHeader = ({ purchase }: BasketProps) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>Plantify</h1>
      <div className={classes.header__logo}></div>
      <MyBasket purchase={purchase} ></MyBasket>
    </header >
  );
};
export default MyHeader;