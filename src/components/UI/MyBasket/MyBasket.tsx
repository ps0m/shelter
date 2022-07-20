import React from 'react';
import classes from './MyBasket.module.css';
import logo from './MyBasket.svg';


export interface BasketProps {
  shopping: number;
}

export const MyBasket = ({ shopping }: BasketProps) => {

  return (
    <div className={classes.basket}>
      <img className={classes.logo} src={logo} alt="" />
      <div className={classes.screen}>
        {shopping}
      </div>
    </div>

  );
};

