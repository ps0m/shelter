import { createContext, Dispatch, SetStateAction } from "react";
import { namePage } from "../type/type";

interface IWinnersContext {
  amountCars: number,
  setAmountCars: Dispatch<SetStateAction<number>>,
  nameCurrentPage: namePage,
  setNameCurrentPage: Dispatch<SetStateAction<namePage>>,
  abortController: AbortController
  setAbortController: Dispatch<SetStateAction<AbortController>>
}


const InitialContext = {
  amountCars: 0,
  setAmountCars: () => '',
  nameCurrentPage: namePage.garage,
  setNameCurrentPage: () => '',
  abortController: new AbortController(),
  setAbortController: () => ''
}

export const WinnersContext = createContext<IWinnersContext>(InitialContext)