import { group } from 'console';
import React from 'react';
import { MyCheckbox, PropsMyCheckbox } from '../MyCheckbox/MyCheckbox';
import classes from "./MyCheckboxBlock.module.css";


interface instruction {
  title: string;
  group: string;
  options: string[];
}


interface PropsMyCheckboxBlock {
  instructions: instruction[];
  changeFilter(e: React.ChangeEvent<HTMLInputElement>): void;
}

const MyCheckboxBlock = (props: PropsMyCheckboxBlock) => {
  return (
    <div className={classes.checkbox__container}>
      {props.instructions.map((item) =>
        <div key={item.title} className={classes.checkbox__block}>
          <p className={classes.checkbox__title}>{item.title}</p>
          {item.options.map((elem) =>
            <MyCheckbox key={elem} option={elem} group={item.group} changeFilter={props.changeFilter} />)}
        </div>

      )}
    </div>
  );
};
export default MyCheckboxBlock;