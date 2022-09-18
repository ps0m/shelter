// import React from 'react';
import classes from "./Button.module.css";

interface MyButtonProps {
  className?: string
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  isActive: boolean;
  children?: React.ReactNode
  disabled?: boolean
}

const MyButton = ({ className, onClick, isActive, children, disabled }: MyButtonProps) => {

  const cardClasses = [classes.button, className];

  if (isActive) {
    cardClasses.push(classes.button_select)
  }

  return (
    <button onClick={onClick} disabled={disabled} className={cardClasses.join(" ")} >
      {children}
    </button>
  );
};

export default MyButton;