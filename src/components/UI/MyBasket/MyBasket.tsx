import React from 'react';
import classes from './MyBasket.module.css';

interface BasketProps {
  counter: number;
}

const MyBasket = ({ counter }: BasketProps) => {
  return (
    <div className={classes.basket}>
      <div className={classes.logo} />
      <div className={classes.screen}>
        {counter}
      </div>
    </div>

  );
};
export default MyBasket;
