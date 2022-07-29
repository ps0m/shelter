import { Direction, ISelectParameters, IShoppingElement } from '../../types/types';

export const setLocalStorage = (
  selectedSort: ISelectParameters,
  filterParameters: string[],
  sliderParametersPrice: number[],
  sliderParametersEqual: number[],
  shopping: IShoppingElement[]
) => {
  const allParameters = {
    'sort': selectedSort,
    'filter': filterParameters,
    'sliderPrice': sliderParametersPrice,
    'sliderEqual': sliderParametersEqual,
    'shopping': shopping
  }

  localStorage.setItem('ps0m_online_store', JSON.stringify(allParameters))
}

export const getLocalStorage = () => {
  const initialRaw = localStorage.getItem('ps0m_online_store')

  return initialRaw
    ? JSON.parse(initialRaw)
    : {
      'sort': { keygen: 'name', direction: Direction.Up },
      'filter': [],
      'sliderPrice': [0, 100],
      'sliderEqual': [0, 100],
      'shopping': []
    }
}