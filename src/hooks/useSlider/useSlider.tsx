import { useMemo } from "react";
import { ICard } from '../../types/types';

const useSlider = (cards: ICard[], equalParameters: number[], priceParameters: number[]) => {
  const sliderCards = useMemo(() => {
    cards
    return cards.filter(card => {
      return (equalParameters[0] <= Number(card.equal)
        && Number(card.equal) <= equalParameters[1]
        && priceParameters[0] <= Number(card.price)
        && Number(card.price) <= priceParameters[1])
        ? true
        : false
    })
  }, [cards, equalParameters, priceParameters])

  return sliderCards;
}

export default useSlider;