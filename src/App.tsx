import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { ICard } from './types/types';
import GeterCards from "./API/GeterCards";
import MyHeader from './components/UI/MyHeader/MyHeader';
import CardList from './components/CardList';
import MyFooter from './components/UI/MyFooter/MyFooter';
import MySelect from './components/UI/MySelect/MySelect';

const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [equalPurchase, setEqualPurchase] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<keyof ICard>('name');

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

  const sortCards = (sort: keyof ICard) => {
    console.log(sort);
    setSelectedSort(sort);
    setCards([...cards].sort((a, b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="container" >
      <MyHeader purchase={equalPurchase} />
      <MySelect
        defaultValue={'Сортировать по:'}
        options={[
          { value: "name", name: 'По имени' },
          { value: "equal", name: 'По количеству' }
        ]}
        value={selectedSort}
        onChange={sortCards}
      />
      <CardList cards={cards} put={putInBasket} />
      <MyFooter />
    </div>
  );
}
export default App