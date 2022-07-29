import { renderHook } from "@testing-library/react";
import someCards from "../../tests/someCards.json";
import { Direction } from "../../types/types";
import useFullSort from "./useFullSort";


describe('Filter test', () => {

  test('Card matches with one filter parameters', () => {
    const { result } = renderHook(() => useFullSort(
      someCards,
      { keygen: 'price', direction: Direction.Up },
      '',
      ["illumination&Солнечное"],
      [15, 85],
      [33, 77]
    ));

    expect(result.current.map(item => item.name)).toEqual([]);
  })

  test('Card matches with one filter parameters', () => {
    const { result } = renderHook(() => useFullSort(
      someCards,
      { keygen: 'price', direction: Direction.Up },
      'уб',
      ["illumination&Любое"],
      [5, 100],
      [20, 80]
    ));

    expect(result.current.map(item => item.name)).toEqual([
      "Ель голубая, колючая",
      "Дуб красный"
    ]);
  })

})

