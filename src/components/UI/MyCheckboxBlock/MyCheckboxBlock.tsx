import React from 'react';
import { MyCheckbox } from '../MyCheckbox/MyCheckbox';
import classes from "./MyCheckboxBlock.module.css";


interface instruction {
  title: string;
  group: string;
  name: string[];
}


interface PropsMyCheckboxBlock {
  instructions: instruction[];
  changeFilter(e: React.ChangeEvent<HTMLInputElement>): void;
  checkedFilter: string[]
  children?: React.ReactNode;
}

const MyCheckboxBlock = (props: PropsMyCheckboxBlock) => {
  return (
    <div className={classes.checkbox__container}>
      {props.instructions.map((item) =>
        <div key={item.title} className={classes.checkbox__block}>
          <p className={classes.checkbox__title}>{item.title}</p>
          {item.name.map((elem) => {
            const id = [item.group, elem].join('&');
            const checked = props.checkedFilter.includes(id);
            return <MyCheckbox
              key={elem}
              id={id}
              isChecked={checked}
              name={elem}
              changeFilter={props.changeFilter} />
          })}
        </div>
      )}
      {props.children}
    </div>
  );
};
export default MyCheckboxBlock;