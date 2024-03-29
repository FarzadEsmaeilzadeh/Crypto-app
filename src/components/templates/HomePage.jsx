import { useEffect, useState } from "react";

import { getCoinList } from "../../services/cryptoApi.js";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination.jsx";
import Search from "../modules/Search.jsx";
import Chart from "../modules/Chart.jsx";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(getCoinList(page, currency));
        const data = await response.json();
        setCoins(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
