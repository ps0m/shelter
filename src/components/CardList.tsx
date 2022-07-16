import React, { useEffect, useState } from 'react';
import { ICard } from '../types/types'
import MyCardItem from './MyCardItem/MyCardItem';
import MyModalWindow from './UI/MyModalWindow/MyModalWindow';

interface CardListProps {
  cards: ICard[];
  put(el: number): void;
}

const CardList: React.FC<CardListProps> = (props) => {
  const [purchase, setPurchase] = useState<ICard[]>([]);
  const [isFullBasket, setIsFullBasket] = useState<boolean>(false);
  const [showModalWindow, setShowModalWindow] = useState<boolean>(false);

  const addPurchase = (newPurchase: ICard) => {
    if (purchase.includes(newPurchase)) {
      setPurchase([...purchase.filter(card => card.id !== newPurchase.id)]);
    } else {
      if (!isFullBasket) {
        setPurchase([...purchase, newPurchase]);
      } else {
        setShowModalWindow(true);
        document.body.classList.add('body_hidden');
      }
    }
  }

  useEffect(() => {
    props.put(purchase.length);
    purchase.length > 2
      ? setIsFullBasket(true)
      : setIsFullBasket(false)
  }, [purchase]);

  if (props.cards.length === 0) {
    return <p className='cards__note'>Нет товаров соответсвующих вашему запросу..</p>
  }
  return (
    <div className='cards'>
      <MyModalWindow show={showModalWindow} setShow={setShowModalWindow} />
      {props.cards.map((card) =>
        <MyCardItem
          card={card}
          add={addPurchase}
          isFull={isFullBasket}
          key={card.id} />
      )}
    </div>
  );
};
export default CardList;