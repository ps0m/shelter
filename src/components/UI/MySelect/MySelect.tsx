import React from 'react';
import { ICard, ISelectParameters, Direction } from '../../../types/types';
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
  value: ISelectParameters,
  onChange(value: ISelectParameters): void,
  children?: React.ReactNode[];
}

const MySelect = (props: MySelectProps) => {
  return (
    <div className={classes.select}>
      <img className={classes.select__arrow} src={arrow} alt="" />
      <select
        className={classes.select__body}
        value={[props.value.keygen, props.value.direction].join('&')}
        onChange={event => {
          console.log(event.target.value.slice(0, -1), event.target.selectedIndex);
          const dir = (+event.target.selectedIndex % 2
            ? Direction.Up
            : Direction.Down
          )
          return props.onChange({ keygen: event.target.value.split('&')[0] as keyof ICard, direction: dir })
        }
        }
      >
        <option disabled={true} value="">{props.defaultValue}</option>
        {props.options.map((option, index) =>
          <option value={option.value} key={[option.value, index].join(',')}>
            {option.name}
            {/* option.direction === Direction.Up
              ? option.name + ' ▲'
              : option.name + ' ▼'} */}
          </option>
        )}
      </select>
    </div>


  );
};
export default MySelect;