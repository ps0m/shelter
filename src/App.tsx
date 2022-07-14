import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { ICard } from './types/types';
import GeterCards from "./API/GeterCards";
import MyHeader from './components/UI/MyHeader/MyHeader';
import CardList from './components/CardList';
import MyFooter from './components/UI/MyFooter/MyFooter';

const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [equalPurchase, setEqualPurchase] = useState<number>(0);

  useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    const data = await GeterCards.getCards();
    data ? setCards(data) : setCards([]);
  }

  const putInBasket = (equal: number) => {
    setEqualPurchase(equal);
  }


  return (
    <div className=".container" >
      <MyHeader purchase={equalPurchase} />
      <CardList cards={cards} put={putInBasket} />
      <MyFooter />
    </div>
  );
}
export default App