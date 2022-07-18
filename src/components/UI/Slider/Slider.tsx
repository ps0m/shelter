import React from 'react';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./SliderMyStyle.css";

interface ISlider {
  parameters: number[]
  onSetSlider(name: string, value: number[]): void
  name: string
  initialValue: number[]
  children: React.ReactNode
}

const Slider = (props: ISlider) => {
  const getValue = (value: number[]) => {
    props.onSetSlider(props.name, value)
  }

  const initial = props.initialValue
  return (
    <div className='slider__container'>
      <p className='slider__title'>{props.children}</p>
      <Nouislider
        connect
        // start={[initial[0], initial[1]]}
        start={[0, 100]}
        behaviour="tap"
        range={{
          min: [0],
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
    </div>
  );
}
export default Slider;
