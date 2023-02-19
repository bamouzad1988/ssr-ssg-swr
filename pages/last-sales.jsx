import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalespage() {
  const [sales, setSales] = useState();
  // this page is for client side fetch
  const fetcher = (url) =>
    fetch(url).then((res) =>
      res.json().then((data1) => {
        const transformedData = [];
        for (const userId in data1) {
          transformedData.push({
            id: userId,
            desc: data1[+userId].title,
            status: data1[+userId].completed,
          });
        }
        setSales(transformedData);
      })
    );

  const { error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );

  if (error) {
    return <p>faled to load!</p>;
  }

  if (isLoading || !sales) {
    return <p>loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.id} - #{sale.desc}
          </li>
        );
      })}
    </ul>
  );
}

export default LastSalespage;
