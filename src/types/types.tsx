export interface ICard {
  id: string,
  name: string,
  equal: string,
  stratication: string,
  soil: string,
  depth: string,
  frostresistance: string,
  illumination: string,
  link: string
}

export interface ICardList {
  cards: ICard[];
}

