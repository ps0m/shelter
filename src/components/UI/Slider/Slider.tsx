import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./SliderMyStyle.css";


interface ISlider {
  parameters: number[]
  onSetSlider(name: string, value: number[]): void
  name: string
  children: React.ReactNode
}


const Slider = (props: ISlider) => {
  const getValue = (value: number[]) => {
    props.onSetSlider(props.name, value)
  }
  return (
    <div className='slider__container'>
      <p className='slider__title'>{props.children}</p>
      <Nouislider
        connect
        start={[0, 100]}
        behaviour="tap"
        range={{
          min: [0],
          // "10%": [10, 10],
          // "50%": [50, 50],
          max: [100]
        }}
        format={
          {
            to: function (val) {
              return Number.parseInt(String(val));
            },
            from: function (val) {
              return typeof val === 'string'
                ? Number(val)
                : val
            },
          }
        }
        tooltips={[true, true]}
        onSet={getValue}
      />
      {/* {props.parameters[0] && props.parameters[1] && (
        <div>
          Value: {props.parameters[0]}, {props.parameters[1]}
        </div>
      )} */}
    </div>
  );
}
export default Slider;
