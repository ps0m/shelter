import { useMemo } from "react";
import { Direction, ICard, ISelectParameters } from '../../types/types';
console.log(useMemo)


const useSort = (cards: ICard[], selectedSort: ISelectParameters) => {
  const sortCards = useMemo(() => {
    return [...cards].sort((a, b) => {
      const first = (selectedSort.direction === Direction.Up
        ? a[selectedSort.keygen]
        : b[selectedSort.keygen])

      const second = (selectedSort.direction === Direction.Up
        ? b[selectedSort.keygen]
        : a[selectedSort.keygen])

      return (isNaN(Number(first)) || isNaN(Number(second)))
        ? first.localeCompare(second)
        : (Number(first) - Number(second))
    })
  }, [cards, selectedSort]);

  return sortCards;
}

export default useSort;