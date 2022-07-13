import React from 'react';
import classes from './MyCardItem.module.css';
import { ICard } from '../../../types/types';
import MyButtonStar from '../MyButtons/MyButtonStar/MyButtonStar';
import MyButton from '../MyButtons/MyButton/MyButton';


const MyCardItem = (props: ICard) => {
  return (
    <div className={classes.card__item}>
      <img className={classes.card__image} src={props.link} alt='' />
      <h3 className={classes.card__title}>{props.name}</h3>
      <p className={classes.card__text}>Количество: {props.equal}</p>
      <p className={classes.card__text}>Стратисфакция: {props.stratication}</p>
      <p className={classes.card__text}>Почва: {props.soil}</p>
      <p className={classes.card__text}>Глубина: {props.depth}</p>
      <p className={classes.card__text}>Морозоустойчивость: {props.frostresistance}</p>
      <p className={classes.card__text}>Освещенние: {props.illumination}</p>
      <div className={classes.card__buttons}>
        <MyButtonStar />
        <MyButton />
      </div>

    </div >
  );
};
export default MyCardItem;