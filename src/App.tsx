import { useState, useEffect, useMemo } from 'react';
import './styles/App.css';
import { ICard } from './types/types';
import GeterCards from "./API/GeterCards";
import MyHeader from './components/UI/MyHeader/MyHeader';
import CardList from './components/CardList';
import MyFooter from './components/UI/MyFooter/MyFooter';
import MySelect from './components/UI/MySelect/MySelect';
import MyInput from './components/UI/MyInput/MyInput';


const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [equalPurchase, setEqualPurchase] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<keyof ICard>('id');
  const [searchLine, setSearchLine] = useState<string>('');

  useEffect(() => {
    getCards();
  }, []);

  const sortCarding = useMemo(() => {
    return [...cards].sort((a, b) => {
      const first = a[selectedSort];
      const second = b[selectedSort];

      return (isNaN(Number(first)) || isNaN(Number(second)))
        ? first.localeCompare(second)
        : (Number(first) - Number(second))
    })
  }, [selectedSort]);

  const sortAndSearchCards = useMemo(() => {
    return sortCarding.filter(card => card.name.toUpperCase().includes(searchLine.toUpperCase()))
  }, [searchLine, selectedSort])

  async function getCards() {
    const data = await GeterCards.getCards();
    data ? setCards(data) : setCards([]);
    setSelectedSort('name');
  }

  const putInBasket = (equal: number) => {
    setEqualPurchase(equal);
  }

  const sortCards = (sort: keyof ICard) => {
    setSelectedSort(sort);
  }


  return (
    <div className="container" >
      <MyHeader purchase={equalPurchase} />
      <MyInput
        value={searchLine}
        onChange={event => setSearchLine(event.target.value)}
        clearValue={() => setSearchLine('')}
        placeholder="Что поищем?"
        autoComplete='off'
      >
      </MyInput >

      <MySelect
        defaultValue={'Сортировать по:'}
        options={[
          { value: "name", name: 'По имени' },
          { value: "equal", name: 'По количеству' }
        ]}
        value={selectedSort}
        onChange={sortCards}
      />
      <CardList cards={sortAndSearchCards} put={putInBasket} />
      <MyFooter />
    </div>
  );
}
export default App