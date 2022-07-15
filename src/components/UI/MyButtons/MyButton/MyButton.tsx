import React from 'react';
import classes from "./MyButton.module.css";

interface MyButtonProps {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  active: boolean;
  children?: React.ReactNode
}

const MyButton = (props: MyButtonProps) => {

  const cardClasses = [classes.button]
  if (props.active) {
    cardClasses.push(classes.button_select)
  }

  return (
    <button {...props} className={cardClasses.join(" ")} >
      {props.children}
    </button>
  );
};
export default MyButton;