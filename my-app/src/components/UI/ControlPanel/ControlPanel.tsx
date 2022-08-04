import { useEffect, useState } from "react";
import { createCar, updateCar } from "../../../API/API";
import { getRandomColor, getRandomName } from "../../../helpers/helpFunctions";
import { ICar } from "../../../type/type";
import Button from "../Button/Button";
import classes from "./ControlPanel.module.css";

const AMOUNT_CREATE_CARS = 100;

interface IControlProps {
  writeCars(): void
  carSelect: ICar
  setSelect(car: ICar): void
}

const ControlPanel = ({ writeCars, carSelect, setSelect }: IControlProps) => {
  const [newName, setNewName] = useState<string>('');
  const [newColor, setNewColor] = useState<string>('#ff0000');
  const [selectName, setSelectName] = useState<string>('');
  const [selectColor, setSelectColor] = useState<string>('#ff0000');

  useEffect(() => {
    setSelectName(carSelect.name)
    setSelectColor(carSelect.color)
  },
    [carSelect])

  const addCar = async () => {
    const carName = newName.length ? newName : getRandomName()

    await createCar({ 'name': carName, 'color': newColor });
    writeCars();
    setNewName('');
  }

  const carUpdate = async () => {
    if (carSelect.id === 0) {
      return
    }
    const carName = selectName.length ? selectName : getRandomName()

    await updateCar({ id: carSelect.id, 'name': carName, 'color': selectColor });
    writeCars();
    setSelect({ id: 0, name: '', color: selectColor })
  }

  const createCards = async () => {
    for (let i = 0; i < AMOUNT_CREATE_CARS; i++) {
      const name = getRandomName();
      const color = getRandomColor();

      await createCar({ 'name': name, 'color': color });
    }

    writeCars();
  }

  return (
    <div className={classes.panel__container}>

      <div className={classes.field__container}>
        <input
          type="text"
          placeholder="Please, enter a brand car"
          title="If you do`nt enter a name, it will be selected automatically"
          value={newName}
          onChange={(event) => setNewName(event.target.value)} />
        <input
          type="color"
          value={newColor}
          onChange={(event) => setNewColor(event.target.value)} />
        <Button
          onClick={() => addCar()}
          isActive={false} >CREATE</Button>
      </div>

      <div className={classes.field__container}>
        <input
          type="text"
          placeholder="Please, select a car"
          title="If you do`nt enter a name, it will be selected automatically"
          value={selectName}
          onChange={(event) => setSelectName(event.target.value)}
        />
        <input
          type="color"
          value={selectColor}
          onChange={(event) => setSelectColor(event.target.value)}
        />
        <Button
          onClick={() => carUpdate()}
          isActive={false}
        >
          UPDATE
        </Button>
      </div>

      <div className={classes.panel__buttons}>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target);
        }} isActive={false} >RACE</Button>
        <Button onClick={function (e: React.MouseEvent<HTMLButtonElement>): void {
          console.log(e.target);
        }} isActive={false} >RESET</Button>
        <Button
          onClick={createCards}
          isActive={false}
        >
          GENERATE CARDS
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;