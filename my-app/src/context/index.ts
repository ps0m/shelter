import { createContext, Dispatch, SetStateAction } from "react";
import { IWinner } from "../type/type";

interface IWinnersContext {
  amountCars: number,
  setAmountCars: Dispatch<SetStateAction<number>>,
  winners: IWinner[],
  setWinners: Dispatch<SetStateAction<IWinner[]>>,
}

const InitialContext = {
  amountCars: 0,
  setAmountCars: () => '',
  winners: [],
  setWinners: () => ''
}

export const WinnersContext = createContext<IWinnersContext>(InitialContext)