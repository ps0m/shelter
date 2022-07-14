import React from 'react';
import classes from "./MyButton.module.css";

interface MyButtonProps {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  inBasket: boolean
}

const MyButton = (props: MyButtonProps) => {

  const cardClasses = [classes.button]
  if (props.inBasket) {
    cardClasses.push(classes.button_select)
  }

  return (
    <button {...props} className={cardClasses.join(" ")} >
      <p>Купить</p>
      <div className={classes.button__image}></div>
    </button>
  );
};
export default MyButton;