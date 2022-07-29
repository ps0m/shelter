import { renderHook } from "@testing-library/react";
import someCards from "../../tests/someCards.json";
import { Direction } from "../../types/types";
import useSort from "./useSort";


describe('Sort test', () => {
  test('Check sort to Price Up', () => {
    const { result } = renderHook(() => useSort(someCards, { keygen: 'price', direction: Direction.Up }));

    expect(result.current.map(item => +item.price)).toEqual([20, 31, 61, 87]);
  })

  test('Check sort to Name Down', () => {
    const { result } = renderHook(() => useSort(someCards, { keygen: 'name', direction: Direction.Down }));

    expect(result.current.map(item => item.name)).toEqual([
      "Ель голубая, колючая",
      "Дуб красный",
      "Граб",
      "Барбарис обыкновенный пурпурнолистный ",
    ]);
  })
})