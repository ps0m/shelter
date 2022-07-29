import { renderHook } from "@testing-library/react";
import someCards from "../../tests/someCards.json";
import useFilter from "./useFilter";


describe('Filter test', () => {

  test('Card matches with one filter parameters', () => {
    const { result } = renderHook(() => useFilter(someCards, ["illumination&Солнечное"]));

    expect(result.current.map(item => item.name)).toEqual([
      "Барбарис обыкновенный пурпурнолистный ",
    ]);
  })

  test('Card matches with two filter parameters', () => {
    const { result } = renderHook(() => useFilter(someCards, ["soil&Любая", "frostresistance&4"]));

    expect(result.current.map(item => item.name)).toEqual([
      "Барбарис обыкновенный пурпурнолистный ",
      "Дуб красный"
    ]);
  })

  test('Cards dos`nt match any filter parameters', () => {
    const { result } = renderHook(() => useFilter(someCards, ["soil&Любая", "frostresistance&4", "popular&Поппулярные"]));

    expect(result.current.map(item => item.name)).toEqual([]);
  })
})