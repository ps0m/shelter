import React, { useState, useEffect, useMemo } from 'react';
import './styles/App.css';
import { ICard, IFilterParameters, ISelectParameters, IInitialParameters, IShoppingElement, Direction } from './types/types';
import GeterCards from "./API/GeterCards";
import MyHeader from './components/UI/MyHeader/MyHeader';
import CardList from './components/CardList';
import MyFooter from './components/UI/MyFooter/MyFooter';
import MySelect from './components/UI/MySelect/MySelect';
import MyInput from './components/UI/MyInput/MyInput';
import MyCheckboxBlock from './components/UI/MyCheckboxBlock/MyCheckboxBlock';
import Slider from './components/UI/Slider/Slider';
import MyButton from './components/UI/MyButtons/MyButton/MyButton';


const App = () => {
  const initialParameters: IInitialParameters = getLocalStorage();

  const [cards, setCards] = useState<ICard[]>([]);
  const [shopping, setShopping] = useState<IShoppingElement[]>(initialParameters.shopping || []);
  const [selectedSort, setSelectedSort] = useState<ISelectParameters>(initialParameters.sort);
  const [searchLine, setSearchLine] = useState<string>('');
  const [filterParameters, setFilterParameters] = useState<string[]>(initialParameters.filter || []);
  const [sliderParametersPrice, setSliderParametersPrice] = useState<number[]>(initialParameters.sliderPrice || []);
  const [sliderParametersEqual, setSliderParametersEqual] = useState<number[]>(initialParameters.sliderEqual || []);



  useEffect(() => {
    getCards();
  }, []);

  async function getCards() {
    const data = await GeterCards.getCards();
    data ? setCards(data) : setCards([]);
  }

  const putInBasket = (equal: IShoppingElement[]) => {
    setShopping(equal);
  }

  const sortCarding = useMemo(() => {
    return [...cards].sort((a, b) => {
      const first = (selectedSort.direction === Direction.Up
        ? a[selectedSort.keygen]
        : b[selectedSort.keygen])

      const second = (selectedSort.direction === Direction.Up
        ? b[selectedSort.keygen]
        : a[selectedSort.keygen])

      return (isNaN(Number(first)) || isNaN(Number(second)))
        ? first.localeCompare(second)
        : (Number(first) - Number(second))
    })
  }, [cards, selectedSort]);

  const sortAndSearchCards = useMemo(() => {
    return sortCarding.filter(card => card.name.toUpperCase().includes(searchLine.toUpperCase()))
  }, [cards, searchLine, selectedSort])


  const sortCards = (sort: ISelectParameters) => {
    console.log(sort);
    setSelectedSort(sort);
  }

  function changeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target.id;

    filterParameters.includes(target)
      ? setFilterParameters([...filterParameters.filter(item => item !== target)])
      : setFilterParameters([...filterParameters, target])
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
  }, [cards, searchLine, selectedSort, filterParameters])

  const sortSlider = useMemo(() => {
    return sortAndFilterAndSearchCards.filter(card => {
      return (sliderParametersEqual[0] <= Number(card.equal)
        && Number(card.equal) <= sliderParametersEqual[1]
        && sliderParametersPrice[0] <= Number(card.price)
        && Number(card.price) <= sliderParametersPrice[1])
        ? true
        : false
    })
  }, [cards, searchLine, selectedSort, filterParameters, sliderParametersPrice, sliderParametersEqual])

  const onSetSliderPrice = (value: number[]) => {
    setSliderParametersPrice([value[0], value[1]])
  };

  const onSetSliderEqual = (value: number[]) => {
    setSliderParametersEqual([value[0], value[1]])
  };


  const setLocalStorage = () => {
    const allParameters = {
      'sort': selectedSort,
      'filter': filterParameters,
      'sliderPrice': sliderParametersPrice,
      'sliderEqual': sliderParametersEqual,
      'shopping': shopping
    }
    localStorage.setItem('ps0m_online_store', JSON.stringify(allParameters))
  }

  function getLocalStorage() {
    const initialRaw = localStorage.getItem('ps0m_online_store')
    return initialRaw
      ? JSON.parse(initialRaw)
      : {
        'sort': { keygen: 'name', direction: Direction.Up },
        'filter': [],
        'sliderPrice': [0, 100],
        'sliderEqual': [0, 100],
        'shopping': []
      }
  }

  useEffect(() => {
    setLocalStorage();
  }, [sortSlider, shopping]);




  return (
    <div className="container" >
      <MyHeader shopping={shopping.length} />
      <main className="main">
        <MyCheckboxBlock
          instructions={[
            { title: "Почва:", group: "soil", name: ['Кислая', 'Любая', 'Болотистая'] },
            { title: "Морозоустойчивость:", group: "frostresistance", name: ['4', '5'] },
            { title: "Освещенние:", group: "illumination", name: ['Солнечное', 'Затенненное', 'Любое'] },
            { title: "Выбор покупателей:", group: "popular", name: ["Поппулярные"] },
          ]}
          changeFilter={changeFilter}
          checkedFilter={filterParameters}
        >
          <Slider
            onSetSlider={onSetSliderPrice}
            name={'price'}
            initialValue={sliderParametersPrice}>
            Цена
          </Slider >
          <Slider
            onSetSlider={onSetSliderEqual}
            name={'equal'}
            initialValue={sliderParametersEqual}
          >
            Количество
          </Slider>
          <MyButton
            className="card__button"
            onClick={() => {
              setFilterParameters([]);
              setSliderParametersPrice([0, 100]);
              setSliderParametersEqual([0, 100]);
            }}
            isActive={false} >
            Очистить фильтры
          </MyButton>
          <MyButton
            className="card__button"
            onClick={() => {
              setSearchLine('');
              setSelectedSort({ keygen: 'name', direction: Direction.Up });
              setFilterParameters([]);
              setSliderParametersPrice([0, 100]);
              setSliderParametersEqual([0, 100]);
              setShopping([]);
              localStorage.removeItem('ps0m_online_store');
            }} isActive={false} >
            Очистить настройки
          </MyButton>
        </MyCheckboxBlock>
        <section className='content__container'>
          <div className='search_find'>
            <MyInput
              value={searchLine}
              onChange={event => {
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
                { value: "name&0", name: 'По имени ▲', direction: Direction.Up },
                { value: "name&1", name: 'По имени ▼', direction: Direction.Down },
                { value: "equal&0", name: 'По количеству ▲', direction: Direction.Up },
                { value: "equal&1", name: 'По количеству ▼', direction: Direction.Down },
                { value: "price&0", name: 'По цене ▲', direction: Direction.Up },
                { value: "price&1", name: 'По цене ▼', direction: Direction.Down },
              ]}
              value={selectedSort}
              onChange={sortCards}
            />
          </div>

          <CardList
            cards={sortSlider}
            put={putInBasket}
            shopping={shopping}
            setShopping={setShopping}
          />
        </section>
      </main>
      <MyFooter />
    </div >
  );
}
export default App


