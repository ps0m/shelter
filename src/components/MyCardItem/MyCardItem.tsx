import React, { useState } from 'react';
import classes from './MyCardItem.module.css';
import { ICard } from '../../types/types';
import MyButtonStar from '../UI/MyButtons/MyButtonStar/MyButtonStar';
import MyButton from '../UI/MyButtons/MyButton/MyButton';

interface MyCardItemProps {
  card: ICard;
  add(el: ICard): void;
  isFull: boolean;
}

const MyCardItem = (props: MyCardItemProps) => {
  const [inBasket, setInBasket] = useState<boolean>(false);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.add(props.card);
    if (inBasket) {
      setInBasket(false)
    } else {
      if (!props.isFull) setInBasket(true)
    }
  }

  const cardClasses = [classes.card__item]
  if (inBasket) {
    cardClasses.push(classes.card__item_select)
  }

  return (
    <div className={cardClasses.join(' ')} key={props.card.id}>
      <img className={classes.card__image} src={props.card.link} alt={props.card.name} />
      <div className={classes.card__main}>
        <h3 className={classes.card__title}>{props.card.name}</h3>
      </div>
      <p className={classes.card__text}>Количество: {props.card.equal}</p>
      <p className={classes.card__text}>Стратисфакция: {props.card.stratication}</p>
      <p className={classes.card__text}>Почва: {props.card.soil}</p>
      <p className={classes.card__text}>Глубина: {props.card.depth}</p>
      <p className={classes.card__text}>Морозоустойчивость: {props.card.frostresistance}</p>
      <p className={classes.card__text}>Освещенние: {props.card.illumination}</p>
      <div className={classes.card__buttons}>
        <MyButtonStar />
        <MyButton
          onClick={clickHandler}
          isActive={inBasket}>
          <p>{props.card.price}р. Купить</p>
          <div className={classes.card__button_image}></div>
        </MyButton>

      </div>

    </div >
  );
};
export default MyCardItem;