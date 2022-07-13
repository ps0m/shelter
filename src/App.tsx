import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MyHeader from './components/UI/MyHeader/MyHeader';
import MyFooter from './components/UI/MyFooter/MyFooter';
import { ICard } from './types/types';
import CardList from './components/UI/CardList';
import GeterCards from "./API/GeterCards";

const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    const data = await GeterCards.getCards();
    data ? setCards(data) : setCards([]);
  }

  return (
    <div className=".container" >
      <MyHeader />
      <CardList cards={cards} />
      <MyFooter />
    </div>
  );
}
export default App