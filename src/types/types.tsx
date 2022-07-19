export interface ICard {
  id: string,
  name: string,
  equal: string,
  stratication: string,
  soil: string,
  depth: string,
  frostresistance: string,
  illumination: string,
  link: string,
  popular: string
  price: string
}

export interface ICardList {
  cards: ICard[];
}

export interface IFilterParameters {
  soil: string[],
  frostresistance: string[],
  illumination: string[],
  popular: string[],
}

export interface ISliderParameters {
  price?: number[],
  equal?: number[]
}

export interface IInitialParameters {
  'shopping': number
  'sort': keyof ICard,
  'filter': string[],
  'sliderPrice': number[],
  'sliderEqual': number[],
}