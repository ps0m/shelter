// import React from 'react';
import classes from "./Button.module.css";

interface MyButtonProps {
  className?: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  isActive: boolean;
  children?: React.ReactNode
  disabled?: boolean
}

const MyButton = (props: MyButtonProps) => {

  const cardClasses = [classes.button, props.className];

  if (props.isActive) {
    cardClasses.push(classes.button_select)
  }

  return (
    <button onClick={props.onClick} disabled={props.disabled} className={cardClasses.join(" ")} >
      {props.children}
    </button>
  );
};

export default MyButton;