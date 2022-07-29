import React, { Dispatch, SetStateAction } from 'react';
import { MyCheckbox } from '../MyCheckbox/MyCheckbox';
import classes from "./MyCheckboxBlock.module.css";

interface instruction {
  title: string;
  group: string;
  name: string[];
}

interface PropsMyCheckboxBlock {
  instructions: instruction[];
  children?: React.ReactNode;
  filterParam: string[]
  changeFilter: Dispatch<SetStateAction<string[]>>;
}

const MyCheckboxBlock = (props: PropsMyCheckboxBlock) => {
  function changeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.id;

    props.filterParam.includes(target)
      ? props.changeFilter([...props.filterParam.filter(item => item !== target)])
      : props.changeFilter([...props.filterParam, target])
  }

  return (
    <div className={classes.checkbox__container}>
      {props.instructions.map((item) =>
        <div key={item.title} className={classes.checkbox__block}>
          <p className={classes.checkbox__title}>{item.title}</p>
          {item.name.map((elem) => {
            const id = [item.group, elem].join('&');
            const checked = props.filterParam.includes(id);

            return <MyCheckbox
              key={elem}
              id={id}
              isChecked={checked}
              name={elem}
              changeFilter={changeFilter} />
          })}
        </div>
      )}
      {props.children}
    </div>
  );
};

export default MyCheckboxBlock;