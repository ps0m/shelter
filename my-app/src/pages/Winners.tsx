import { useContext, useEffect, useState } from "react";
import { getCar, getWinners } from "../API/API";
import PageControl from "../components/UI/PageControl/PageControl";
import Table from "../components/UI/Table/Table";
import Title from "../components/UI/Title/Title";
import { WinnersContext } from "../context";
import { ICar, IWinner, IWinnerOfServer, Order, Sort } from "../type/type";

const Winners = () => {
  const { winners, setWinners } = useContext(WinnersContext)
  const [amountWinners, setAmountWinners] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sort, setSort] = useState<Sort>(Sort.id);
  const [order, setOrder] = useState<Order>(Order.asc);

  useEffect(() => {
    writeWinners()
  }, []);

  const writeWinners = async () => {
    const answer = await getWinners(currentPage, sort, order);
    const winnersOfServer: IWinnerOfServer[] = answer[0]
    const newWinners: IWinner[] = []

    setAmountWinners(answer[1]);

    for (const iterator of winnersOfServer) {
      const car: ICar = await getCar(iterator.id)

      newWinners.push({ car: car, wins: iterator.wins, time: iterator.time })
    }

    console.log(newWinners);

    setWinners([...newWinners]);
  }

  useEffect(() => {
    writeWinners()
  }, [sort, order])

  return (
    <div>
      <Title
        amount={amountWinners}
        currentPage={currentPage}
        title={"Winners"} />
      <Table
        sort={sort}
        order={order}
        setSort={setSort}
        setOrder={setOrder}
        winners={winners}
      />
      <PageControl
        current={currentPage}
        setCurrent={setCurrentPage}
        amount={amountWinners}
      />
    </div >
  );
};

export default Winners;