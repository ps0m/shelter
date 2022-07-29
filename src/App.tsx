import { useEffect, useState } from 'react';
import GeterCards from "./API/GeterCards";
import CardList from './components/CardList';
import { getLocalStorage, setLocalStorage } from './components/LocalStor/LocalStor';
import MyButton from './components/UI/MyButtons/MyButton/MyButton';
import MyCheckboxBlock from './components/UI/MyCheckboxBlock/MyCheckboxBlock';
import MyFooter from './components/UI/MyFooter/MyFooter';
import MyHeader from './components/UI/MyHeader/MyHeader';
import MyInput from './components/UI/MyInput/MyInput';
import MySelect from './components/UI/MySelect/MySelect';
import Slider from './components/UI/Slider/Slider';
import useFullSort from './hooks/useFullSort/useFullSort';
import './styles/App.css';
import { Direction, ICard, IInitialParameters, ISelectParameters, IShoppingElement } from './types/types';

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

  const sortCards = useFullSort(cards, selectedSort, searchLine, filterParameters, sliderParametersEqual, sliderParametersPrice)

  useEffect(() => {
    setLocalStorage(selectedSort,
      filterParameters,
      sliderParametersPrice,
      sliderParametersEqual,
      shopping
    );
  }, [shopping, selectedSort, filterParameters, sliderParametersPrice, sliderParametersEqual]);

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
          filterParam={filterParameters}
          changeFilter={setFilterParameters}
        >

          <Slider
            onSetSlider={(value: number[]) => setSliderParametersPrice([value[0], value[1]])}
            name={'price'}
            initialValue={sliderParametersPrice}>
            Цена
          </Slider >

          <Slider
            onSetSlider={(value: number[]) => setSliderParametersEqual([value[0], value[1]])}
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
              onChange={(sort: ISelectParameters) => setSelectedSort(sort)}
            />
          </div>

          <CardList
            cards={sortCards}
            put={(equal: IShoppingElement[]) => setShopping(equal)}
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


