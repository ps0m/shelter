import { Dispatch, SetStateAction } from 'react';
import { IWinner, Order, Sort } from '../../../type/type';
import Car from '../Car/Car';
import classes from './Table.module.css';

interface ITableProps {
  winners: IWinner[]
  sort: Sort
  order: Order
  setSort: Dispatch<SetStateAction<Sort>>
  setOrder: Dispatch<SetStateAction<Order>>
}

const Table = ({
  winners, setSort, sort, order, setOrder,
}: ITableProps) => {
  const setSortAndOrder = (thisSort: Sort) => {
    if (sort === thisSort) {
      setOrder(order === Order.asc ? Order.desc : Order.asc);
    } else {
      setSort(thisSort);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th className={classes.table__headers}>Number</th>
          <th className={[classes.table__headers, classes.table__headers_sort].join(' ')} onClick={() => setSortAndOrder(Sort.id)}>ID</th>
          <th className={classes.table__headers}>Car</th>
          <th className={classes.table__headers}>Name</th>
          <th className={[classes.table__headers, classes.table__headers_sort].join(' ')} onClick={() => setSortAndOrder(Sort.wins)}>Wins</th>
          <th className={[classes.table__headers, classes.table__headers_sort].join(' ')} onClick={() => setSortAndOrder(Sort.time)}>Best time (s)</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={winner.car.id}>
            <td className={classes.table__row}>{index + 1}</td>
            <td className={classes.table__row}>{winner.car.id}</td>
            <td className={classes.table__car}><Car color={winner.car.color} /></td>
            <td className={classes.table__row}>{winner.car.name}</td>
            <td className={classes.table__row}>{winner.wins}</td>
            <td className={classes.table__row}>{winner.time}</td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Table;
