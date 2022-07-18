import React, { useState, useEffect, useMemo } from 'react';
import './styles/App.css';
import { ICard, IFilterParameters, ISliderParameters } from './types/types';
import GeterCards from "./API/GeterCards";
import MyHeader from './components/UI/MyHeader/MyHeader';
import CardList from './components/CardList';
import MyFooter from './components/UI/MyFooter/MyFooter';
import MySelect from './components/UI/MySelect/MySelect';
import MyInput from './components/UI/MyInput/MyInput';
import MyCheckboxBlock from './components/UI/MyCheckboxBlock/MyCheckboxBlock';
import Slider from './components/UI/Slider/Slider';


const App = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [equalPurchase, setEqualPurchase] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<keyof ICard>('id');
  const [searchLine, setSearchLine] = useState<string>('');
  const [filterParameters, setFilterParameters] = useState<string[]>([]);
  const [sliderParameters, setSliderParameters] = useState<ISliderParameters>(
    { price: [0, 100], equal: [0, 100] }
  );

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
    console.log('s', sliderParameters);

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

  const sortSlider = useMemo(() => {
    return sortAndFilterAndSearchCards.filter(card => {
      return (sliderParameters.equal[0] <= Number(card.equal)
        && Number(card.equal) <= sliderParameters.equal[1]
        && sliderParameters.price[0] <= Number(card.price)
        && Number(card.price) <= sliderParameters.price[1])
        ? true
        : false
    })
  }, [searchLine, selectedSort, filterParameters, sliderParameters])

  const onSetSlider = (name: string, value: number[]) => {
    name === 'price'
      ? setSliderParameters({
        price: [value[0], value[1]],
        equal: [sliderParameters.equal[0], sliderParameters.equal[1]]
      })
      : setSliderParameters({
        price: [sliderParameters.price[0], sliderParameters.price[1]],
        equal: [value[0], value[1]]
      });

  };

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
        >
          <Slider
            parameters={sliderParameters.price}
            onSetSlider={onSetSlider}
            name={'price'}>
            Цена
          </Slider >
          <Slider
            parameters={sliderParameters.equal}
            onSetSlider={onSetSlider}
            name={'equal'}>
            Количество
          </Slider>

        </MyCheckboxBlock>
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

          <CardList cards={sortSlider} put={putInBasket} />
        </section>
      </main>
      <MyFooter />
    </div>
  );
}
export default App


