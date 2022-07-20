import React from 'react';
import classes from './MyCardItem.module.css';
import logoBasket from '../UI/MyBasket/MyBasket.svg';
import { IShoppingElement } from '../../types/types';
import MyButtonStar from '../UI/MyButtons/MyButtonStar/MyButtonStar';
import MyButton from '../UI/MyButtons/MyButton/MyButton';

interface MyCardItemProps {
  element: IShoppingElement;
  add(el: IShoppingElement): void;
  isFull: boolean;
}

const MyCardItem = (props: MyCardItemProps) => {
  const currentElement = { ...props.element }

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(currentElement.inShopping);

    if (currentElement.inShopping) {
      currentElement.inShopping = false
    } else {
      if (!props.isFull) {
        currentElement.inShopping = true
      }
    }
    console.log(currentElement.inShopping);

    props.add(currentElement);
  }

  const cardClasses = [classes.card__item]
  if (currentElement.inShopping) {
    cardClasses.push(classes.card__item_select)
  }

  return (
    <div className={cardClasses.join(' ')} key={props.element.id}>
      <img className={classes.card__image} src={props.element.link} alt={props.element.name} />
      <div className={classes.card__main}>
        <h3 className={classes.card__title}>{props.element.name}</h3>
      </div>
      <p className={classes.card__text}>Количество: {props.element.equal}</p>
      {/* <p className={classes.card__text}>Стратисфакция: {props.element.stratication}</p> */}
      <p className={classes.card__text}>Почва: {props.element.soil}</p>
      <p className={classes.card__text}>Глубина посадки: {props.element.depth}cм</p>
      <p className={classes.card__text}>Морозоустойчивость: {props.element.frostresistance}</p>
      <p className={classes.card__text}>Освещенние: {props.element.illumination}</p>
      <div className={classes.card__buttons}>
        {props.element.popular
          ? <MyButtonStar />
          : <div></div>
        }
        <MyButton
          onClick={clickHandler}
          isActive={props.element.inShopping}>
          <p>{props.element.price}р. Купить</p>
          <img className={classes.card__button_image} src={logoBasket} alt="" />
        </MyButton>

      </div>

    </div >
  );
};
export default MyCardItem;