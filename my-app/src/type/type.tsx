export interface ICar {
  id: number,
  name: string,
  color: string
}

export type ICarCreate = Pick<ICar, 'name' | 'color'>;

export interface IWinner {
  id: number,
  wins: number,
  time: number
}

export enum Sort {
  'id' = 'id',
  'wins' = 'wins',
  'time' = 'time'
}

export enum Order {
  'asc' = 'ASC',
  'desc' = 'DESC',
}

export type statusEngine = 'started' | 'stopped'
export type statusCar = 'started' | 'stopped' | 'waiting'

export interface IEngine {
  id: number,
  status: statusEngine
}



// export type IWinnerCreate = Pick<IWinner, 'wins' | 'time'>;
