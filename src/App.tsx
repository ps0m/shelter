import { useState, useEffect, useMemo } from 'react';
import './styles/App.css';
import { ICard, IFilterParameters } from './types/types';
import GeterCards from "./API/GeterCards";
import MyHeader from './components/UI/MyHeader/MyHeader';
import CardList from './components/CardList';
import MyFooter from './components/UI/MyFooter/MyFooter';
import MySelect from './components/UI/MySelect/MySelect';
import MyInput from './components/UI/MyInput/MyInput';
import MyCheckboxBlock from './components/UI/MyCheckboxBlock/MyCheckboxBlock';


const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [equalPurchase, setEqualPurchase] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<keyof ICard>('id');
  const [searchLine, setSearchLine] = useState<string>('');
  const [filterParameters, setFilterParameters] = useState<string[]>([]);

  useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    const data = await GeterCards.getCards();
    data ? setCards(data) : setCards([]);
    setSelectedSort('name');
  }

  const putInBasket = (equal: number) => {
    setEqualPurchase(equal);
  }

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


  const sortCards = (sort: keyof ICard) => {
    setSelectedSort(sort);
  }

  function changeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.id;

    filterParameters.includes(target)
      ? setFilterParameters([...filterParameters.filter(item => item !== target)])
      : setFilterParameters([...filterParameters, target])

    console.log(target, filterParameters);
  }

  const sortAndFilterAndSearchCards = useMemo(() => {
    const filterObject: IFilterParameters = {
      soil: [],
      frostresistance: [],
      illumination: [],
      popular: [],
    };

    for (const iterator of filterParameters) {
      const key = iterator.split('&')[0] as keyof IFilterParameters;
      const value = iterator.split('&')[1];

      filterObject[key]
        ? filterObject[key].push(value)
        : filterObject[key].push(value)
    }

    const filterKeys = Object.keys(filterObject) as Array<keyof typeof filterObject>;

    return sortAndSearchCards.filter(card => {
      return filterKeys.every(key => {
        if (!filterObject[key].length) return true;

        return filterObject[key].includes(card[key]);
      })
    })
  }, [searchLine, selectedSort, filterParameters])


  return (
    <div className="container" >
      <MyHeader purchase={equalPurchase} />
      <main className="main">
        <MyCheckboxBlock
          instructions={[
            { title: "Почва:", group: "soil", options: ['Кислая', 'Любая', 'Болотистая'] },
            { title: "Морозоустойчивость:", group: "frostresistance", options: ['4', '5'] },
            { title: "Освещенние:", group: "illumination", options: ['Солнечное', 'Затенненное', 'Любое'] },
            { title: "Выбор покупателей:", group: "popular", options: ["Поппулярные"] },
          ]}
          changeFilter={changeFilter}
        />
        <section className='content__container'>
          <div className='search_find'>
            <MyInput
              value={searchLine}
              onChange={event => {
                console.log(event.target.value);

                setSearchLine(event.target.value)
              }}
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
          </div>

          <CardList cards={sortAndFilterAndSearchCards} put={putInBasket} />
        </section>
      </main>
      <MyFooter />
    </div>
  );
}
export default App


