import React from 'react';

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./SliderMyStyle.css";

interface ISlider {
  onSetSlider(value: number[]): void
  name: string
  initialValue: number[]
  children: React.ReactNode
}

const Slider = (props: ISlider) => {
  let initial;
  if (props.initialValue !== undefined) {
    initial = [props.initialValue[0] || 0, props.initialValue[1] || 0]
  } else {
    initial = [0, 100]
  }

  return (
    <div className='slider__container'>
      <p className='slider__title'>{props.children}</p>
      <Nouislider
        connect
        start={[initial[0], initial[1]]}
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
        onSet={props.onSetSlider}
      />
    </div>
  );
}
export default Slider;
