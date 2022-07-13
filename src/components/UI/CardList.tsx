import React from 'react';
import { ICard } from '../../types/types';
import MyCardItem from './MyCardItem/MyCardItem';

interface CardListProps {
  cards: ICard[];
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className='cards'>
      {cards.map((card,) =>
        <MyCardItem {...card} key={card.id} />
      )}
    </div>
  );
};
export default CardList;