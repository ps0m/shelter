import { ISelectParameters, IShoppingElement } from "../../types/types";
import { getLocalStorage, setLocalStorage } from "./LocalStor";


describe('LocalStorage test', () => {

  test('Object localstorage contains the required keys', () => {
    expect(Object.keys(getLocalStorage())).toEqual([
      "sort",
      "filter",
      "sliderPrice",
      "sliderEqual",
      "shopping",
    ])
  })

  test('Object localstorage contains the required keys', () => {
    const initialParameters = {
      sort: { keygen: "price", direction: 1 },
      filter: ["soil&Любая", "frostresistance&4", "popular&Поппулярные"],
      sliderPrice: [27, 79],
      sliderEqual: [32, 100],
      shopping: []
    }

    const valueParameters: [ISelectParameters, string[], number[], number[], IShoppingElement[]
    ] = [
        { keygen: "price", direction: 1 },
        ["soil&Любая", "frostresistance&4", "popular&Поппулярные"],
        [27, 79],
        [32, 100],
        []
      ]

    setLocalStorage(...valueParameters);
    const initialRaw = localStorage.getItem('ps0m_online_store');
    let result;

    if (initialRaw) {
      result = JSON.parse(initialRaw)
    }

    expect(initialParameters).toEqual(result)
  })
})