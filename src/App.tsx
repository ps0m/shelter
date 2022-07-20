import React, { useState, useEffect, useMemo } from 'react';
import './styles/App.css';
import { ICard, IFilterParameters, ISelectorParameters, IInitialParameters, IShoppingElement, Direction } from './types/types';
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

  function consLog() {
    console.log(`
  Добрый день.Спасибо, что подождали.
    Главная страница содержит все товары магазина а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10

    Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель и т.д., находится ли товар в корзине +10
    Карточки товаров добавляются динамически средствами JavaScript (на кросс-чеке этот пункт не проверяется)

    Добавление товаров в корзину +20
    кликая по карточке с товаром или по кнопке на нем, товар можно добавлять в корзину или удалять. Карточки добавленных в корзину товаров внешне отличаются от остальных +10
    на странице отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" +10
    
    Сортировка +20
    Сортируются только те товары, которые в данный момент отображаются на странице
    сортировка товаров по названию в возрастающем и убывающем порядке +10
    сортировка товаров по году их выхода на рынок в возрастающем и убывающем порядке +10
    
    Фильтры в указанном диапазоне от и до +30
    фильтры по количеству +10
    фильтры по году выпуска на рынок +10
    для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка +10
    
    Фильтры по значению +30
    Выбранные фильтры выделяются стилем.
    фильтры по производителю +5
    фильтры по цвету +5
    фильтры по размеру (в случае с Демо - по количеству камер) +5
    можно отобразить только популярные товары +5
    можно отфильтровать товары по нескольким фильтрам одного типа +10
    Если для выбранной Вами тематики интернет-магазина указанные выше фильтры неактуальны, Вы можете добавить свои фильтры в зависмости от категории товара. Для нескольких фильтров одного типа отображаются товары, которые соответствуют хоть одному выбранному фильтру. Например, можно отобразить Samsung и Apple; или белые, синие и красные товары; или товары с 2 и 3 камерами.
    Можно отфильтровать товары по нескольким фильтрам разного типа +20
    Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам.
    Например, можно отобразить только красные товары. Или популярные белые и красные товары впоступившие на рынок в 2010-2020 годах.
    Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, совпадений не обнаружено"
    
    Сброс фильтров +20
    есть кнопка reset для сброса фильтров +10
    Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или товары, добавленные в избранное.
    После использования кнопки reset фильтры остаются работоспособными
    при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом +10
    Сохранение настроек в local storage +30
    выбранные пользователем фильтры, порядок сортировки, добавленные в избранное товары сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage +10
    Поиск +30
    при открытии приложения курсор находится в поле поиска +2
    автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) +2
    есть placeholder +2
    в поле поиска есть крестик, позволяющий очистить поле поиска +2
    если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено" +2
    при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается +10
    Поиск ведётся только среди товаров, которые в данный момент отображаются на странице.
    если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам сортировки +10
    
    Итого: все пункты выполнены: 200 баллов
    `);
  }

  const [cards, setCards] = useState<ICard[]>([]);
  const [shopping, setShopping] = useState<IShoppingElement[]>(initialParameters.shopping);
  const [selectedSort, setSelectedSort] = useState<ISelectorParameters>({ keygen: 'id', direction: Direction.Up });
  const [searchLine, setSearchLine] = useState<string>('');
  const [filterParameters, setFilterParameters] = useState<string[]>(initialParameters.filter);
  const [sliderParametersPrice, setSliderParametersPrice] = useState<number[]>(initialParameters.sliderPrice);
  const [sliderParametersEqual, setSliderParametersEqual] = useState<number[]>(initialParameters.sliderEqual);

  useEffect(() => {
    getCards();
    consLog();
  }, []);

  async function getCards() {
    const data = await GeterCards.getCards();
    data ? setCards(data) : setCards([]);
    setSelectedSort(initialParameters.sort);
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
  }, [selectedSort]);

  const sortAndSearchCards = useMemo(() => {
    return sortCarding.filter(card => card.name.toUpperCase().includes(searchLine.toUpperCase()))
  }, [searchLine, selectedSort])


  const sortCards = (sort: ISelectorParameters) => {
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
  }, [searchLine, selectedSort, filterParameters])

  const sortSlider = useMemo(() => {
    return sortAndFilterAndSearchCards.filter(card => {
      return (sliderParametersEqual[0] <= Number(card.equal)
        && Number(card.equal) <= sliderParametersEqual[1]
        && sliderParametersPrice[0] <= Number(card.price)
        && Number(card.price) <= sliderParametersPrice[1])
        ? true
        : false
    })
  }, [searchLine, selectedSort, filterParameters, sliderParametersPrice, sliderParametersEqual])

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
                { value: "name", name: 'По имени', direction: Direction.Up },
                { value: "name", name: 'По имени', direction: Direction.Down },
                { value: "equal", name: 'По количеству', direction: Direction.Up },
                { value: "equal", name: 'По количеству', direction: Direction.Down },
                { value: "price", name: 'По цене', direction: Direction.Up },
                { value: "price", name: 'По цене', direction: Direction.Down },
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


