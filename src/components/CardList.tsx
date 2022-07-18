import React, { useEffect, useState } from 'react';
import { ICard } from '../types/types'
import MyCardItem from './MyCardItem/MyCardItem';
import MyModalWindow from './UI/MyModalWindow/MyModalWindow';

interface CardListProps {
  cards: ICard[];
  put(el: number): void;
}

const CardList: React.FC<CardListProps> = (props) => {
  const [shopping, setShopping] = useState<ICard[]>([]);
  const [isFullBasket, setIsFullBasket] = useState<boolean>(false);
  const [showModalWindow, setShowModalWindow] = useState<boolean>(false);

  const addShopping = (newShopping: ICard) => {
    if (shopping.includes(newShopping)) {
      setShopping([...shopping.filter(card => card.id !== newShopping.id)]);
    } else {
      if (!isFullBasket) {
        setShopping([...shopping, newShopping]);
      } else {
        setShowModalWindow(true);
        document.body.classList.add('body_hidden');
      }
    }
  }

  useEffect(() => {
    props.put(shopping.length);
    shopping.length > 2
      ? setIsFullBasket(true)
      : setIsFullBasket(false)
  }, [shopping]);

  if (props.cards.length === 0) {
    return <p className='cards__note'>Нет товаров соответсвующих вашему запросу..</p>
  }
  return (
    <div className='cards'>
      <MyModalWindow show={showModalWindow} setShow={setShowModalWindow} />
      {props.cards.map((card) =>
        <MyCardItem
          card={card}
          add={addShopping}
          isFull={isFullBasket}
          key={card.id} />
      )}
    </div>
  );
};
export default CardList;