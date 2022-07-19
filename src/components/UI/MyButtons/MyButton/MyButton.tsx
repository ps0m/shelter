import React from 'react';
import classes from "./MyButton.module.css";

interface MyButtonProps {
  className?: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  isActive: boolean;
  children?: React.ReactNode
}

const MyButton = (props: MyButtonProps) => {

  const cardClasses = [classes.button, props.className];
  if (props.isActive) {
    cardClasses.push(classes.button_select)
  }

  return (
    <button onClick={props.onClick} className={cardClasses.join(" ")} >
      {props.children}
    </button>
  );
};
export default MyButton;