import React, { useEffect, useState } from 'react';
import { ICard } from '../../types/types';
import MyCardItem from './MyCardItem/MyCardItem';

interface CardListProps {
  cards: ICard[];
  put(el: number): void;
}

const CardList: React.FC<CardListProps> = (props) => {
  const [purchase, setPurchase] = useState<ICard[]>([]);

  const addPurchase = (newPurchase: ICard) => {
    purchase.includes(newPurchase)
      ? setPurchase([...purchase.filter(card => card.id !== newPurchase.id)])
      : setPurchase([...purchase, newPurchase])
  }

  useEffect(() => {
    props.put(purchase.length);
  }, [purchase]);

  return (
    <div className='cards'>
      {props.cards.map((card) =>
        <MyCardItem card={card} add={addPurchase} key={card.id} />
      )}
    </div>
  );
};
export default CardList;