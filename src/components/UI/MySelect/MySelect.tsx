import React from 'react';
import { ICard, ISelectorParameters, Direction } from '../../../types/types';
import classes from './MySelect.module.css'
import arrow from './arrow_down.svg'


interface IOptionMySelect {
  value: string,
  name: string
  direction: Direction
}

interface MySelectProps {
  options: IOptionMySelect[],
  defaultValue: string,
  value: ISelectorParameters,
  onChange(value: ISelectorParameters): void,
  children?: React.ReactNode[];
}

const MySelect = (props: MySelectProps) => {
  return (
    <div className={classes.select}>
      <img className={classes.select__arrow} src={arrow} alt="" />
      <select
        className={classes.select__body}
        value={props.value.keygen}
        onChange={event => {
          console.log(event.target.selectedIndex);
          const dir = (event.target.selectedIndex % 2
            ? Direction.Up
            : Direction.Down
          )
          return props.onChange({ keygen: event.target.value as keyof ICard, direction: dir })
        }
        }
      >
        <option disabled={true} value="">{props.defaultValue}</option>
        {props.options.map((option, index) =>
          <option id={option.direction.toString()} value={option.value} key={[option.value, index].join(',')}>
            {option.direction === Direction.Up
              ? option.name + ' ˄'
              : option.name + ' ˅'}
          </option>
        )}
      </select>
    </div>


  );
};
export default MySelect;