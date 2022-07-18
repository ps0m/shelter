import React from 'react';
import classes from './MyHeader.module.css';
import { MyBasket, BasketProps } from "../MyBasket/MyBasket";

const MyHeader = ({ shopping }: BasketProps) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>Plantify</h1>
      <div className={classes.header__logo}></div>
      <MyBasket shopping={shopping} ></MyBasket>
    </header >
  );
};
export default MyHeader;