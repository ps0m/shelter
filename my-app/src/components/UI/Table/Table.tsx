import { Dispatch, SetStateAction } from "react";
import { IWinner, Order, Sort } from "../../../type/type";
import Car from "../Car/Car";
import "./Table.css";

interface ITableProps {
  winners: IWinner[]
  sort: Sort
  order: Order
  setSort: Dispatch<SetStateAction<Sort>>
  setOrder: Dispatch<SetStateAction<Order>>
}

const Table = ({ winners, setSort, sort, order, setOrder }: ITableProps) => {
  const setSortAndOrder = (thisSort: Sort) => {
    if (sort === thisSort) {
      order === Order.asc
        ? setOrder(Order.desc)
        : setOrder(Order.asc)
    } else {
      setSort(thisSort)
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Car</th>
          <th onClick={() => setSortAndOrder(Sort.id)}>Name</th>
          <th onClick={() => setSortAndOrder(Sort.wins)}>Wins</th>
          <th onClick={() => setSortAndOrder(Sort.time)}>Best time (ms)</th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => {
          return (
            <tr key={winner.car.id}>
              <td>{index + 1}</td>
              <td><Car color={winner.car.color} /></td>
              <td>{winner.car.name}</td>
              <td>{winner.wins}</td>
              <td>{winner.time}</td>
            </tr>
          )
        })}

      </tbody>
    </table>
  );
};

export default Table;