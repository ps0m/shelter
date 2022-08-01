import Button from "../Button/Button";
import ControlField from "../ControlField/ControlField";
import classes from "./ControlPanel.module.css";

const ControlPanel = () => {
  return (
    <div className={classes.panel__container}>
      <ControlField />
      <ControlField />
      <div className={classes.panel__buttons}>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target);
        }} isActive={false} >RACE</Button>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target);
        }} isActive={false} >RESET</Button>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target);
        }} isActive={false} >GENERATE CARDS</Button>
      </div>
    </div>
  );
};

export default ControlPanel;