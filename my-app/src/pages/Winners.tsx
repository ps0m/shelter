import { useContext, useEffect, useState } from "react";
import { getCar, getWinners } from "../API/API";
import PageControl from "../components/UI/PageControl/PageControl";
import Table from "../components/UI/Table/Table";
import Title from "../components/UI/Title/Title";
import { WinnersContext } from "../context";
import { ICar, IWinner, IWinnerOfServer, namePage, Order, Sort } from "../type/type";

const Winners = () => {
  const [winners, setWinners] = useState<IWinner[]>([])
  const [amountWinners, setAmountWinners] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sort, setSort] = useState<Sort>(Sort.id);
  const [order, setOrder] = useState<Order>(Order.asc);

  const { nameCurrentPage } = useContext(WinnersContext)

  useEffect(() => {
    writeWinners(currentPage, sort, order)
  }, [nameCurrentPage, currentPage, sort, order]);

  const writeWinners = async (curPage: number, curSort: Sort, curOrder: Order) => {
    const answer = await getWinners(curPage, curSort, curOrder);
    const winnersOfServer: IWinnerOfServer[] = answer[0]
    const newWinners: IWinner[] = []

    setAmountWinners(answer[1]);

    for (const iterator of winnersOfServer) {
      const car: ICar = await getCar(iterator.id)

      newWinners.push({ car: car, wins: iterator.wins, time: iterator.time })
    }

    setWinners([...newWinners]);
  }


  return (
    <div className={
      nameCurrentPage === namePage.winners
        ? "winners"
        : "winners_hide"
    }
    >
      <div className='information'>
        <Title
          amount={amountWinners}
          currentPage={currentPage}
          title={"Winners"} />
        <PageControl
          current={currentPage}
          setCurrent={setCurrentPage}
          amount={amountWinners}
        />
      </div>
      <Table
        sort={sort}
        order={order}
        setSort={setSort}
        setOrder={setOrder}
        winners={winners}
      />
    </div >
  );
};

export default Winners;