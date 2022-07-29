import React, { useEffect, useState } from 'react';
import { ICard, IShoppingElement } from '../types/types';
import MyCardItem from './MyCardItem/MyCardItem';
import MyModalWindow from './UI/MyModalWindow/MyModalWindow';

interface CardListProps {
  cards: ICard[];
  put(el: IShoppingElement[]): void;
  shopping: IShoppingElement[];
  setShopping: React.Dispatch<React.SetStateAction<IShoppingElement[]>>
}

const CardList: React.FC<CardListProps> = (props) => {
  const [showModalWindow, setShowModalWindow] = useState<boolean>(false);
  const [isFullBasket, setIsFullBasket] = useState<boolean>(false);

  const addShopping = (newShopping: IShoppingElement) => {

    let isInShopping = false;

    for (const item of props.shopping) {
      item.id === newShopping.id
        ? isInShopping = true
        : isInShopping = false
    }

    if (isInShopping) {
      props.setShopping([...props.shopping.filter(element =>
        element.id !== newShopping.id
      )]);
    } else {

      if (!isFullBasket) {
        props.setShopping([...props.shopping, newShopping]);
      } else {
        setShowModalWindow(true);
        document.body.classList.add('body_hidden');
      }
    }
  }

  useEffect(() => {
    props.put(props.shopping);
    props.shopping.length > 19
      ? setIsFullBasket(true)
      : setIsFullBasket(false)
  }, [props, props.shopping]);

  if (props.cards.length === 0) {
    return <p className='cards__note'>Нет товаров соответсвующих вашему запросу..</p>
  }

  return (
    <div className='cards'>
      <MyModalWindow show={showModalWindow} setShow={setShowModalWindow} />
      {props.cards.map((card) => {
        let isInShopping = false;

        for (const item of props.shopping) {
          if (item.id === card.id) {
            isInShopping = true;
            break;
          }
        }

        return <MyCardItem
          element={{ ...card, 'inShopping': isInShopping }}
          add={addShopping}
          isFull={isFullBasket}
          key={card.id}
        />
      }
      )}

    </div>
  );
};

export default CardList;