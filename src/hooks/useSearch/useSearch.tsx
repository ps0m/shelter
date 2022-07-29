import { useMemo } from "react";
import { ICard } from '../../types/types';


const useSearch = (cards: ICard[], searchLine: string) => {
  const searchCards = useMemo(() => {
    return cards.filter(card => card.name.toUpperCase().includes(searchLine.toUpperCase()))
  }, [cards, searchLine])

  return searchCards
}

export default useSearch;