import React, { useState } from 'react';
import classes from './MyCardItem.module.css';
import { ICard } from '../../../types/types';
import MyButtonStar from '../MyButtons/MyButtonStar/MyButtonStar';
import MyButton from '../MyButtons/MyButton/MyButton';

interface MyCardItemProps {
  card: ICard;
  add(el: ICard): void;
}

const MyCardItem = (props: MyCardItemProps) => {
  const [inBasket, setInBasket] = useState(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inBasket ? setInBasket(false) : setInBasket(true);
    props.add(props.card)
  }

  const cardClasses = [classes.card__item]
  if (inBasket) {
    cardClasses.push(classes.card__item_select)
  }

  return (
    <div className={cardClasses.join(' ')} key={props.card.id}>
      <img className={classes.card__image} src={props.card.link} alt={props.card.name} />
      <h3 className={classes.card__title}>{props.card.name}</h3>
      <p className={classes.card__text}>Количество: {props.card.equal}</p>
      <p className={classes.card__text}>Стратисфакция: {props.card.stratication}</p>
      <p className={classes.card__text}>Почва: {props.card.soil}</p>
      <p className={classes.card__text}>Глубина: {props.card.depth}</p>
      <p className={classes.card__text}>Морозоустойчивость: {props.card.frostresistance}</p>
      <p className={classes.card__text}>Освещенние: {props.card.illumination}</p>
      <div className={classes.card__buttons}>
        <MyButtonStar />
        <MyButton onClick={clickHandler} inBasket={inBasket} />
      </div>

    </div >
  );
};
export default MyCardItem;