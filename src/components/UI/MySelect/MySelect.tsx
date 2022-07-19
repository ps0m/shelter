import React from 'react';
import { ICard } from '../../../types/types';
import classes from './MySelect.module.css'

interface IOptionMySelect {
  value: string,
  name: string
}

interface MySelectProps {
  options: IOptionMySelect[],
  defaultValue: string,
  value: keyof ICard,
  onChange(value: keyof ICard): void,
  children?: React.ReactNode[];
}

const MySelect = (props: MySelectProps) => {
  return (
    <select
      className={classes.select}
      value={props.value}
      onChange={event => props.onChange(event.target.value as keyof ICard)}
    >
      <option disabled={true} value="">{props.defaultValue}</option>
      {props.options.map(option =>
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      )}
    </select>

  );
};
export default MySelect;