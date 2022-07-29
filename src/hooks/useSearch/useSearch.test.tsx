import { renderHook } from "@testing-library/react";
import someCards from "../../tests/someCards.json";
import useSearch from "./useSearch";


describe('Search test', () => {
  test('Search string contain matches', () => {
    const { result } = renderHook(() => useSearch(someCards, 'ба'));

    expect(result.current.map(item => item.name)).toEqual([
      "Барбарис обыкновенный пурпурнолистный ",
      "Ель голубая, колючая",
    ]);
  })

  test('Search string dos`nt contain matches, enter empty', () => {
    const { result } = renderHook(() => useSearch(someCards, 'Тополь'));

    expect(result.current.map(item => item.name)).toEqual([]);
  })
  test('Empty search string, enter all names', () => {
    const { result } = renderHook(() => useSearch(someCards, ''));

    expect(result.current.map(item => item.name)).toEqual([
      "Барбарис обыкновенный пурпурнолистный ",
      "Граб",
      "Дуб красный",
      "Ель голубая, колючая",
    ]);
  })
})