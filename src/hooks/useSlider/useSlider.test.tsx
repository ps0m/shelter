import { renderHook } from "@testing-library/react";
import someCards from "../../tests/someCards.json";
import useSlider from "./useSlider";


describe('Slider test', () => {

  test('Slider have default paramters and enter all cards', () => {
    const { result } = renderHook(() => useSlider(someCards, [0, 100], [0, 100]));

    expect(result.current.map(item => item.name)).toEqual([
      "Барбарис обыкновенный пурпурнолистный ",
      "Граб",
      "Дуб красный",
      "Ель голубая, колючая",
    ]);
  })

  test('When a reduced range slider reduce amount cards', () => {
    const { result } = renderHook(() => useSlider(someCards, [20, 85], [25, 90]));

    expect(result.current.map(item => item.name)).toEqual([
      "Граб"
    ]);
  })

})