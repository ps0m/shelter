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

export interface ISelectParameters {
  keygen: keyof ICard
  direction: Direction
}

export interface IInitialParameters {
  'sort': ISelectParameters,
  'filter': string[],
  'sliderPrice': number[],
  'sliderEqual': number[],
  'shopping': IShoppingElement[]
}

export interface IShoppingElement extends ICard {
  inShopping: boolean;
}

export enum Direction {
  Up,
  Down,
}