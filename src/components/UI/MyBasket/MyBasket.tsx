import React from 'react';
import classes from './MyBasket.module.css';

export interface BasketProps {
  shopping: number;
}

export const MyBasket = ({ shopping }: BasketProps) => {

  return (
    <div className={classes.basket}>
      <div className={classes.logo} />
      <div className={classes.screen}>
        {shopping}
      </div>
    </div>

  );
};

