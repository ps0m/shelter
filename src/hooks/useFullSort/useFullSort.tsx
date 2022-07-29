import { ICard, ISelectParameters } from '../../types/types';
import useFilter from "../useFilter/useFilter";
import useSearch from "../useSearch/useSearch";
import useSlider from "../useSlider/useSlider";
import useSort from "../useSort/useSort";

const useFullSort = (
  cards: ICard[],
  selectedSort: ISelectParameters,
  searchLine: string,
  filterParameters: string[],
  equalParameters: number[],
  priceParameters: number[]) => {

  const sortCards = useSort(cards, selectedSort);
  const searchCards = useSearch(sortCards, searchLine);
  const filterCards = useFilter(searchCards, filterParameters);
  const sliderCards = useSlider(filterCards, equalParameters, priceParameters);

  return sliderCards;
}

export default useFullSort;