import Button from "../Button/Button";
import classes from "./ControlField.module.css";

const ControlField = () => {
  return (
    <div className={classes.field__container}>
      <input type="text" />
      <input type="color" />
      <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
        console.log(e.target);
      }} isActive={false} ></Button>
    </div>
  );
};

export default ControlField;