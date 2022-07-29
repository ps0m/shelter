import { useMemo } from "react";
import { ICard, IFilterParameters } from '../../types/types';

const useFilter = (cards: ICard[], filterParameters: string[]) => {

  const filterCards = useMemo(() => {
    const filterObject: IFilterParameters = {
      soil: [],
      frostresistance: [],
      illumination: [],
      popular: [],
    };

    for (const iterator of filterParameters) {
      const key = iterator.split('&')[0] as keyof IFilterParameters;
      const value = iterator.split('&')[1];

      filterObject[key]
        ? filterObject[key].push(value)
        : filterObject[key].push(value)
    }

    const filterKeys = Object.keys(filterObject) as Array<keyof typeof filterObject>;

    return cards.filter(card => {
      return filterKeys.every(key => {
        if (!filterObject[key].length) {
          return true;
        }

        return filterObject[key].includes(card[key]);
      })
    })
  }, [cards, filterParameters])

  return filterCards;
}

export default useFilter;