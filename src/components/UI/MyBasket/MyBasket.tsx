import React from 'react';
import classes from './MyBasket.module.css';

export interface BasketProps {
  purchase: number;
}

export const MyBasket = ({ purchase }: BasketProps) => {
  return (
    <div className={classes.basket}>
      <div className={classes.logo} />
      <div className={classes.screen}>
        {purchase}
      </div>
    </div>

  );
};

